import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import AppointmentItem from "./AppointmentItem";

const Modal = ({ isOpen, handleClose, handleCancel, appointment }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto" onClose={handleClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 py-10 sm:my-8 overflow-hidden shadow-xl transform transition-all sm:align-middle xl:max-w-7xl lg:max-w-4xl max-w-full w-full">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-full text-gray-400 hover:text-white p-1 hover:bg-primary1 focus:outline-none focus:ring-2 focus:ring-primary1"
                                    onClick={handleClose}
                                >
                                    <span className="sr-only">Close</span>
                                    <MdClose className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <div className="mt-3 sm:mt-0">
                                    <Dialog.Title as="h1" className="text-2xl text-center leading-8 font-bold text-text2">
                                        Cancel Appointment?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-md font-semibold text-center text-text2">
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                    <hr className="mt-8" />
                                </div>
                            </div>
                            <div className="mx-10 my-10">
                                <AppointmentItem {...appointment} />
                            </div>
                            <div className="mt-5 sm:mt-4 space-x-4 flex justify-center">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-10 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                    onClick={handleCancel}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-10 py-3 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary1 sm:w-auto sm:text-sm"
                                    onClick={handleClose}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
