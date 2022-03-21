import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import classNames from "classnames";

const AlertBox = ({
    open = false,
    success = false,
    title = "",
    message = "",
    showDismiss = true,
    timeout = 5000,
    handleAlertOpen
}) => {
    useEffect(() => {
        let timer;
        if (open && timeout) {
            setTimeout(() => {
                open && handleAlertOpen && handleAlertOpen();
            }, timeout);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [open, timeout, handleAlertOpen]);
    return open ? (
        <div
            className={classNames(
                "border px-4 py-3 rounded relative",
                success ? "bg-green-100 border-green-700 text-green-700" : "bg-red-100 border-red-400 text-red-700"
            )}
            role="alert"
        >
            <strong className="font-bold">{title}</strong>
            <span className="block">{message}</span>
            {
                showDismiss && (
                    <button className="absolute top-0 right-0 mt-3 mr-3" onClick={handleAlertOpen}>
                        <MdClose className="h-6 w-6" />
                    </button>
                )
            }
        </div>
    ) : false;
};

export default AlertBox;
