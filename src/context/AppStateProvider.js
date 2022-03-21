import DocApi from "../utils/api";
import { envConsts } from "../constants";
import { createContext, useContext, useReducer } from "react";
import { filterObject, safeJsonParse, setCookie } from "../utils/commonUtils";

const initState = {
    user: {
        isLoggedIn: false
    },
    register: "",
    error: "",
    envConsts: envConsts.development,
    isLoading: false
};

const appStateReducer = (state = initState, action) => {
    switch (action.type) {
    // User
    case "LOGIN":
    case "LOGOUT": return {
        ...state,
        user: {
            ...state.user,
            ...action.payload
        }
    };
    case "REGISTER": return {
        ...state,
        register: action.payload
    };
    case "LOGIN_ERROR":
    case "REGISTER_ERROR": return {
        ...state,
        error: action.type
    };
    case "RESET": return {
        ...state,
        error: "",
        register: ""
    };
        // App State
    case "LOADING": return {
        ...state,
        isLoading: action.payload
    };
    default: return state;
    }
};
const AppStateContext = createContext();
export const useAppStateContext = () => useContext(AppStateContext);
const AppStateProvider = ({ children, appCookies, env }) => {
    const cookies = filterObject(appCookies, ["userData"]);
    const [err, userData] = safeJsonParse(cookies.userData);
    const initAppState = Object.assign({}, initState);
    if (env && envConsts[env]) {
        initAppState.envConsts = envConsts[env];
    }
    if (!err && userData.isLoggedIn) {
        initAppState.user = userData;
    }
    const [appState, dispatch] = useReducer(appStateReducer, initAppState);

    const setLoader = payload => dispatch({
        type: "LOADING",
        payload
    });

    const contextValue = {
        appState,
        doLogin: async (payload, successCallback) => {
            const filteredPayload = filterObject(payload, [
                "email",
                "password"
            ]);
            const loginBody = {
                taskName: "login",
                ...filteredPayload
            };
            setLoader(true);
            try {
                const loginResponse = await DocApi({
                    method: "POST",
                    url: "/auth",
                    data: {
                        "resource": "authenticationapi",
                        "body": JSON.stringify(loginBody)
                    }
                });
                const { data = {} } = loginResponse;
                if (data && data.statusCode === 200 && data.body) {
                    const loginResponseBody = JSON.parse(data.body);
                    const {
                        idToken,
                        accessToken,
                        refreshToken
                    } = loginResponseBody;

                    const validateUserBody = {
                        taskName: "validateuser",
                        accesstoken: accessToken,
                        isDoctor: "false"
                    };
                    const validateUserResponse = await DocApi({
                        method: "POST",
                        url: "/auth",
                        headers: {
                            Authorization: idToken
                        },
                        data: {
                            "resource": "authenticationapi",
                            "body": JSON.stringify(validateUserBody)
                        }
                    });
                    const { data: validateData = {} } = validateUserResponse;
                    if (validateData && validateData.statusCode === 200 && validateData.body) {
                        const validateResponseBody = JSON.parse(validateData.body);
                        const firstName = validateResponseBody.firstName;
                        const spaceIndex = firstName.indexOf(" ");
                        const dataObj = {
                            isLoggedIn: true,
                            ...validateResponseBody,
                            firstName: spaceIndex > 0 ? firstName.substr(0, spaceIndex) : firstName,
                            lastName: spaceIndex > 0 ? firstName.substr(spaceIndex + 1) : "",
                            password: filteredPayload.password
                        };
                        dispatch({
                            type: "LOGIN",
                            payload: dataObj
                        });
                        setCookie("accessToken", accessToken);
                        setCookie("refreshToken", refreshToken);
                        setCookie("idToken", idToken);
                        setCookie("userData", JSON.stringify(dataObj));
                        successCallback && successCallback();
                    } else {
                        throw new Error("Login");
                    }
                } else {
                    throw new Error("Login");
                }
            } catch (err) {
                dispatch({
                    type: "LOGIN_ERROR"
                });
            } finally {
                setLoader(false);
            }
        },
        doLogout: () => {
            setCookie("accessToken", "");
            setCookie("refreshToken", "");
            setCookie("idToken", "");
            setCookie("userData", "");
            dispatch({
                type: "LOGOUT",
                payload: {
                    isLoggedIn: false
                }
            });
        },
        doRegister: async (payload, successCallback) => {
            const filteredPayload = filterObject(payload, [
                "email",
                "phone",
                "password"
            ]);
            const registerBody = {
                taskName: "signup",
                fullname: `${payload.firstName} ${payload.lastName}`,
                ...filteredPayload
            };
            setLoader(true);
            try {
                const registerResponse = await DocApi({
                    method: "POST",
                    url: "/auth",
                    data: {
                        "resource": "authenticationapi",
                        "body": JSON.stringify(registerBody)
                    }
                });
                const { data = {} } = registerResponse;
                if (data && data.statusCode === 200) {
                    dispatch({
                        type: "REGISTER",
                        payload: data.body
                    });
                    successCallback && successCallback();
                } else {
                    dispatch({
                        type: "REGISTER_ERROR"
                    });
                }
            } catch (err) {
                dispatch({
                    type: "REGISTER_ERROR"
                });
            } finally {
                setLoader(false);
            }
        },
        forgotPassword: async (payload) => {
            const forgotPasswordPayload = {
                taskName: "forgotpassword",
                email: payload.email
            };
            const forgotPasswordBody = {
                "resource": "authenticationapi",
                "body": JSON.stringify(forgotPasswordPayload)
            };
            setLoader(true);
            try {
                const forgotPasswordApiResponse = await DocApi({
                    method: "POST",
                    url: "/auth",
                    data: forgotPasswordBody
                });
                const { data: forgotPasswordData = {} } = forgotPasswordApiResponse;
                setLoader(false);
                return (
                    forgotPasswordData
                    && forgotPasswordData.statusCode === 200
                    && forgotPasswordData.body
                );
            } catch (err) {
                setLoader(false);
                return false;
            }
        },
        confirmForgotPassword: async (payload) => {
            const confirmForgotPasswordPayload = {
                taskName: "confirmforgotpassword",
                email: payload.email,
                password: payload.password,
                verificationCode: payload.verificationCode
            };
            const confirmForgotPasswordBody = {
                resource: "authenticationapi",
                body: JSON.stringify(confirmForgotPasswordPayload)
            };
            setLoader(true);
            try {
                const confirmForgotPasswordApiResponse = await DocApi({
                    method: "POST",
                    url: "/auth",
                    data: confirmForgotPasswordBody
                });
                const { data: confirmForgotPasswordData = {} } = confirmForgotPasswordApiResponse;
                setLoader(false);
                return (
                    confirmForgotPasswordData
                    && confirmForgotPasswordData.statusCode === 200
                    && confirmForgotPasswordData.body
                );
            } catch (err) {
                setLoader(false);
                return false;
            }
        },
        reset: () => dispatch({
            type: "RESET"
        }),
        setLoader
    };
    return (
        <AppStateContext.Provider value={contextValue}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateProvider;
