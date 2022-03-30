/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useAppStateContext } from "../context/AppStateProvider";
import {
    MdMenu,
    MdClose,
    MdLogout,
    MdPersonOutline,
    MdOutlineCalendarToday,
    MdOutlinePeopleAlt,
    MdAccessTime
} from "react-icons/md";

const navigation = {
    "Appointments": { name: "Appointments", element: { type: Link, props: { href: "/doctor/appointments", passHref: true }}, icon: MdOutlineCalendarToday },
    "Patients": { name: "Patients", element: { type: Link, props: { href: "/doctor/patients", passHref: true } }, icon: MdOutlinePeopleAlt },
    "Schedule": { name: "Schedule", element: { type: Fragment, props: {} }, icon: MdAccessTime },
    "Business Hours": { name: "Business Hours", element: { type: Link, props: { href: "/doctor/business-hours", passHref: true }}, icon: false },
    "Holiday": { name: "Holiday / Time Off", element: { type: Link, props: { href: "/doctor/holiday", passHref: true }}, icon: false },
    "Your Profile": { name: "Your Profile", element: { type: Link, props: { href: "/doctor", passHref: true }}, icon: MdPersonOutline }
};

export default function DoctorLayout(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { appState: { user = {} }, doLogout } = useAppStateContext();
    const router = useRouter();
    const { children } = props;
    const handleLogout = () => {
        router.replace("/");
        doLogout();
    };
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-20 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <MdClose className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4 py-5">
                                    <Link href="/" passHref>
                                        <div className="cursor-pointer">
                                            <img
                                                className="h-8 w-auto sm:h-10"
                                                src="/assets/images/diva-care.png"
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <nav className="pt-4 space-y-4 border-t border-gray-200">
                                    {Object.values(navigation).map((item) => (
                                        <Fragment key={item.name}>
                                            <item.element.type {...item.element.props}>
                                                <div className={classNames(
                                                    item.element.props?.href === router.asPath && "border-l-4 border-primary1 bg-background1 text-primary1" || "border-l-4 border-transparent text-text3",
                                                    !!item.element.props?.href && "hover:bg-background10 hover:text-primary1" || "",
                                                    "group flex items-center px-2 py-2 text-base font-medium cursor-pointer"
                                                )}>
                                                    {
                                                        item.icon && <item.icon
                                                            className={classNames(
                                                                item.element.props?.href === router.asPath && "text-primary1" || "text-text3",
                                                                !!item.element.props?.href && "group-hover:text-primary1" || "",
                                                                "mr-4 flex-shrink-0 h-6 w-6"
                                                            )}
                                                            aria-hidden="true"
                                                        /> || <div className="mr-4 flex-shrink-0 h-6 w-6"></div>
                                                    }
                                                    {item.name}
                                                </div>
                                            </item.element.type>
                                        </Fragment>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex border-t border-gray-200 p-2">
                                <div className="flex-shrink-0 group block" onClick={handleLogout}>
                                    <div className="flex items-center group-hover:bg-background10 rounded-md p-2">
                                        <div>
                                            <MdLogout className="inline-block h-10 w-10 text-text3 group-hover:text-primary1" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-text3 group-hover:text-primary1">Sign Out</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                </Dialog>
            </Transition.Root>
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 py-5">
                            <Link href="/" passHref>
                                <div className="cursor-pointer">
                                    <img
                                        className="h-8 w-auto sm:h-10"
                                        src="/assets/images/diva-care.png"
                                        alt=""
                                    />
                                </div>
                            </Link>
                        </div>
                        <nav className="pt-4 flex-1 bg-white border-t border-gray-200 space-y-4">
                            {Object.values(navigation).map((item) => (
                                <Fragment key={item.name}>
                                    <item.element.type {...item.element.props}>
                                        <div className={classNames(
                                            item.element.props?.href === router.asPath && "border-l-4 border-primary1 bg-background1 text-primary1" || "border-l-4 border-transparent text-text3",
                                            !!item.element.props?.href && "hover:bg-background10 hover:text-primary1" || "",
                                            "group flex items-center px-2 py-2 text-sm font-medium cursor-pointer"
                                        )}>
                                            {
                                                item.icon && (
                                                    <item.icon
                                                        className={classNames(
                                                            item.element.props?.href === router.asPath && "text-primary1" || "text-text3 ",
                                                            !!item.element.props?.href && "group-hover:text-primary1" || "",
                                                            "mr-3 flex-shrink-0 h-6 w-6"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ) || <div className="mr-4 flex-shrink-0 h-6 w-6"></div>
                                            }
                                            {item.name}
                                        </div>
                                    </item.element.type>
                                </Fragment>

                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-2">
                        <div className="flex-shrink-0 w-full group block" onClick={handleLogout}>
                            <div className="flex items-center group-hover:bg-background10 rounded-md p-2">
                                <div>
                                    <MdLogout className="inline-block h-9 w-9 text-text3 group-hover:text-primary1" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-text3 group-hover:text-primary1">Sign Out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-primary1 hover:text-primary1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MdMenu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                {children}
            </div>
        </>
    );
}
