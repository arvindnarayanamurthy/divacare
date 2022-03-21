import { useEffect, useState } from "react";
import { resetPasswordSteps } from "../../constants";
import { useAppStateContext } from "../../context/AppStateProvider";
import AlertBox from "../AlertBox";

const ResetPassword = ({ cancel, email = "" }) => {
    const {
        EMAIL_CONFIRMATION,
        PASSWORD_CONFIRMATION,
        CONFIRMATION_SUCCESS
    } = resetPasswordSteps;
    const [alert, setAlert] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [emailInput, setEmailInput] = useState(email);
    const [verificationCode, setVerificationCode] = useState("");
    const { forgotPassword, confirmForgotPassword } = useAppStateContext();
    const [resetStep, setResetStep] = useState(email ? PASSWORD_CONFIRMATION : EMAIL_CONFIRMATION);
    const handleForgotPassword = async () => {
        const forgotPasswordResponse = await forgotPassword({
            email: emailInput
        });
        if (forgotPasswordResponse) {
            setResetStep(PASSWORD_CONFIRMATION);
        } else {
            setAlert(false);
        }
    };
    const handleConfirmPassword = async () => {
        const confirmForgotPasswordResponse = await confirmForgotPassword({
            email: emailInput,
            password: newPassword,
            verificationCode
        });
        if (confirmForgotPasswordResponse) {
            setResetStep(CONFIRMATION_SUCCESS);
        } else {
            setAlert(false);
        }
    };
    useEffect(() => {
        if (email) {
            handleForgotPassword();
        }
    }, []);
    return (
        <div className="flex flex-row space-x-4 md:justify-center">
            <div className="bg-white w-full border shadow-cardshadow1 border-background4 rounded-md my-8 px-12 py-10 md:px-20 md:py-16 md:basis-1/2 sm:px-8">
                <AlertBox
                    open={alert}
                    success={alert}
                    title="Forgot Password Unsuccessful"
                    message={() => {
                        switch (true) {
                        case !alert && EMAIL_CONFIRMATION === resetStep:
                            return "Email might not be registered. Try again in some time";
                        case !alert && PASSWORD_CONFIRMATION === resetStep:
                            return "Verification Code might not be matching. Try again in some time";
                        default: return "";
                        }
                    }}
                    handleAlertOpen={() => setAlert(false)}
                />
                {{
                    [EMAIL_CONFIRMATION]: (
                        <>
                            <h3 className="text-xl text-text2 font-bold text-center pb-4">Forgot Password</h3>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">
                                Enter Your Registered Email
                                <span className="text-red-500">&nbsp;*</span>
                            </label>
                            <div className="my-4 relative">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={emailInput}
                                    onChange={(evt) => {
                                        setEmailInput(evt.target.value);
                                    }}
                                    placeholder={"xyz@xyz.com"}
                                    className={"shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border border-gray-300 rounded-md"}
                                />
                            </div>
                            <div className="pt-4 flex space-x-4 justify-center">
                                <button
                                    onClick={cancel}
                                    className="rounded-full font-medium py-2 px-8 bg-white text-primary1 border border-primary1 hover:shadow-buttonshadow hover:bg-background7"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!emailInput}
                                    onClick={handleForgotPassword}
                                    className="rounded-full font-medium py-2 px-8 bg-primary1 text-white shadow-buttonshadow hover:bg-background2 disabled:opacity-50"
                                >
                                    Confirm
                                </button>
                            </div>
                        </>
                    ),
                    [PASSWORD_CONFIRMATION]: (
                        <>
                            <h3 className="text-xl text-text2 font-bold text-center my-4">Forgot Password</h3>
                            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mt-2">
                                Verification Code
                                <span className="text-red-500">&nbsp;*</span>
                            </label>
                            <div className="my-4 relative">
                                <input
                                    type="number"
                                    name="verification-code"
                                    id="verification-code"
                                    value={verificationCode}
                                    onChange={(evt) => {
                                        setVerificationCode(evt.target.value);
                                    }}
                                    onKeyDown={(evt) => {
                                        if (evt.keyCode === 13) {
                                            handleSubmit();
                                        }
                                    }}
                                    placeholder={""}
                                    className={"shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border border-gray-300 rounded-md"}
                                />
                            </div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-2">
                                New Password
                                <span className="text-red-500">&nbsp;*</span>
                            </label>
                            <div className="my-4 relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    value={newPassword}
                                    onChange={(evt) => {
                                        setNewPassword(evt.target.value);
                                    }}
                                    placeholder={""}
                                    className={"shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border border-gray-300 rounded-md"}
                                />
                            </div>
                            <div className="pt-4 flex space-x-4 justify-center">
                                <button
                                    onClick={cancel}
                                    className="rounded-full font-medium py-2 px-8 bg-white text-primary1 border border-primary1 hover:shadow-buttonshadow hover:bg-background7"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmPassword}
                                    disabled={ !newPassword && !verificationCode }
                                    className="rounded-full font-medium py-2 px-8 bg-primary1 text-white shadow-buttonshadow hover:bg-background2 disabled:opacity-50"
                                >
                                    Confirm
                                </button>
                            </div>
                        </>
                    ),
                    [CONFIRMATION_SUCCESS]: (
                        <>
                            <h3 className="text-xl text-text2 font-bold text-center my-4">Reset password successful</h3>
                            <div className="my-4 flex justify-center">
                                <button
                                    onClick={cancel}
                                    className="rounded-full font-medium py-2 px-8 bg-white text-primary1 border border-primary1 hover:shadow-buttonshadow hover:bg-background7"
                                >
                                    Go Back
                                </button>
                            </div>
                        </>
                    )
                }[resetStep]}
            </div>
        </div>
    );
};

export default ResetPassword;
