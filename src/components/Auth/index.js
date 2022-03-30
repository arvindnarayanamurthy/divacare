import { Fragment, useReducer, useMemo, useCallback, useEffect, useState } from "react";
import { useAppStateContext } from "../../context/AppStateProvider";
import { useRouter } from "next/router";
import classNames from "classnames";
import ResetPassword from "./ResetPassword";

const initialState = {};
const inputFields = [
    {
        id: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "",
        formType: "register",
        validation: (val) => {
            if (val !== "" && !val.match(/^[A-Z][a-zA-Z,.'-]+$/u)) {
                if (val.length === 1 && val.match(/^[a-z]+$/u)) {
                    return "First Name should begin with Capital Letter";
                }
                return "Please enter a valid first name";
            };
            return "";
        }
    },
    {
        id: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "",
        formType: "register",
        validation: (val) => {
            if (val !== "" && !val.match(/^[A-Z][a-zA-Z,.'-]+$/u)) {
                if (val.length === 1 && val.match(/^[a-z]+$/u)) {
                    return "Last Name should begin with Capital Letter";
                }
                return "Please enter a valid last name";
            };
            return "";
        }
    },
    {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "you@example.com",
        validation: (val, { error = false }) => {
            if (val !== "" && !val.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/)) {
                if (error) {
                    return "Email doesn't match our records";
                }
                return "Please enter a valid email eg: you@example.com";
            }
            return "";
        }
    },
    {
        id: "password",
        type: "password",
        label: "Password",
        placeholder: "",
        validation: (val, { register = false, error = false }) => {
            if (val !== "" && !val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                if (register) {
                    return "Password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
                } else if (error) {
                    return "Password doesn't match our records";
                } else {
                    return "Please enter a valid password";
                }
            }
            return "";
        }
    },
    {
        id: "phone",
        type: "number",
        label: "Phone Number",
        placeholder: "",
        formType: "register",
        validation: (val) => {
            if (val !== "" && !val.match(/^[6-9]\d{9}$/gi)) {
                return "Please enter a valid phone number";
            }
            return "";
        }
    }
];

inputFields.forEach(input => initialState[input.id] = {
    value: "",
    error: ""
});

const authFormReducer = (state = initState, action) => {
    switch (action.type) {
    case "INPUT": return {
        ...state,
        [action.payload.id]: {
            ...state[action.payload.id],
            value: action.payload.value,
            error: action.payload.error
        }
    };
    case "ERROR": return {
        ...state,
        [action.payload.id]: {
            ...state[action.payload.id],
            error: action.payload.error
        }
    };
    case "RESET_ERROR":
        const newState = {};
        inputFields.forEach(input => {
            newState[input.id] = {
                value: state[input.id].value,
                error: ""
            };
        });
        return newState;
    default: return state;
    }
};

const Auth = ({ isLoginPage = false }) => {
    const [authForm, dispatch] = useReducer(authFormReducer, initialState);
    const { appState, reset, doLogin, doRegister } = useAppStateContext();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [type, setType] = useState("login");
    const router = useRouter();
    const inputElements = useMemo(() => (inputFields.filter(
        ele => ele.formType ? ele.formType === type : true
    )), [type]);
    const formTypeClass = useCallback((buttonType) => classNames({
        "grow text-center p-2 rounded-md font-medium border border-transparent": true,
        "hover:border-primary1 hover:bg-background7 cursor-pointer": type !== buttonType,
        "bg-white": type === buttonType
    }), [type]);

    // Effects
    useEffect(() => {
        reset();
        return () => {
            reset();
        };
    }, []);

    useEffect(() => {
        let isDisabled = false;
        isDisabled = inputElements
            .find((input) => !authForm[input.id].value.length || authForm[input.id].error.length);
        if (disabled !== isDisabled) {
            setDisabled(isDisabled);
        }
    }, [authForm]);

    // Handlers
    const handleClick = (btn) => {
        if (type !== btn) {
            setType(type === "login" ? "register" : "login");
            dispatch({
                type: "RESET_ERROR"
            });
        }
    };

    const handleInput = (evt, ele) => {
        const value = evt?.target?.value;
        reset();
        dispatch({
            type: "INPUT",
            payload: {
                id: ele.id,
                value,
                error: ""
            }
        });
    };

    const handleSubmit = async () => {
        let errorTrigger = false;
        inputElements.forEach(input => {
            const error = input.validation(
                authForm[input.id].value,
                { register: type === "register" }
            );
            if (error) {
                errorTrigger = true;
                dispatch({
                    type: "ERROR",
                    payload: {
                        id: input.id,
                        error
                    }
                });
            }
        });
        if (errorTrigger) return;
        const payload = {};
        Object.keys(authForm).forEach((key) => {
            if (key === "phone") {
                payload.phone = `+91${authForm[key].value}`;
            } else {
                payload[key] = authForm[key].value;
            }
        });
        if (type === "register") {
            doRegister(payload, () => {
                handleClick("login");
            });
        } else {
            doLogin(payload, (isDoctor) => {
                isLoginPage && router.replace(isDoctor ? "/doctor/appointments" : "/");
            });
        }
    };

    if (showForgotPassword) {
        return (
            <ResetPassword
                cancel={() => setShowForgotPassword(false)}
            />
        );
    }
    return (
        <div className="flex flex-row space-x-4 md:justify-center">
            <div className="bg-white w-full border shadow-cardshadow1 border-background4 rounded-md my-8 px-12 py-10 md:px-20 md:py-16 md:basis-1/2 sm:px-8">
                <div className="bg-background8 flex flex-row justify-between space-x-2 rounded p-1 mb-6">
                    <div
                        onClick={() => handleClick("login")}
                        className={formTypeClass("login")}
                    >
                        Log In
                    </div>
                    <div
                        onClick={() => handleClick("register")}
                        className={formTypeClass("register")}
                    >
                        Register
                    </div>
                </div>
                {inputElements.map((ele) => (
                    <Fragment key={ele.id}>
                        <label htmlFor={ele.id} className="block text-sm font-medium text-gray-700 mt-2">
                            {ele.label}
                            <span className="text-red-500">&nbsp;*</span>
                        </label>
                        <div className="mt-1 relative">
                            {ele.id === "phone" && (
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">+91</span>
                                </div>
                            )}
                            <input
                                type={ele.type}
                                name={ele.id}
                                id={ele.id}
                                value={authForm[ele.id].value}
                                onChange={(e) => handleInput(e, ele)}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13 && type === "login" && ele.type === "password") {
                                        handleSubmit();
                                    }
                                }}
                                placeholder={ele.placeholder}
                                className={classNames(
                                    "shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border border-gray-300 rounded-md",
                                    ele.id === "phone" && "pl-10"
                                )}
                            />
                        </div>
                        <div className="text-sm text-red-500">
                            {authForm[ele.id].error ? authForm[ele.id].error : <span>&nbsp;</span>}
                        </div>
                    </Fragment>
                ))}
                {type === "login" && (
                    <button
                        onClick={() => setShowForgotPassword(true)}
                        className="underline text-primary1"
                    >
                            Forgot Password?
                    </button>
                )}
                <div className="my-4 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={disabled}
                        className="rounded-full text-white font-bold bg-primary1 border border-transparent shadow-buttonshadow hover:border-primary1 py-3 px-10 flex items-center disabled:opacity-50"
                    >
                        {type === "register" ? "Register" : "Log In"}
                    </button>
                </div>
                {appState.error && (
                    <div className="text-sm text-red-500">
                        {type === "register" ? "Registration Failed!" : "Login Failed!"}
                    </div>
                )}
                {appState.register && (
                    <div className="my-2 text-sm text-green-500">
                        {appState.register}.<br />You can login after confirming the mail.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;
