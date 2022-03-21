import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { RiLogoutBoxRLine, RiUser3Fill } from "react-icons/ri";
import { useAppStateContext } from "../../context/AppStateProvider";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About Us", href: "/#about" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
];

const NavLink = styled.div`
    position: relative;
    &.active::after {
        position: absolute;
        display: block;
        top: 110%;
        left: 50%;
        content: "";
        transform: translateX(-50%);
        height: 0.5rem;
        width: 0.5rem;
        background: ${props => props.theme.colors.primary1};
        border-radius: 50%;
    }
`;

const ProfileMenu = ({ active, user, handleLogout }) => {
    const { firstName, lastName } = user;
    const solutions = [
        {
            name: "Your Profile",
            href: "/profile",
            icon: RiUser3Fill,
        }
    ];
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button className={
                        classNames(
                            "inline-flex items-center px-3 py-2 text-primary1 font-semibold shadow-cardshadow hover:shadow-lg hover:shadow-buttonshadow1 rounded-md",
                            (open || active) && "shadow-buttonshadow1 ring-1 ring-primary1"
                        )
                    }>
                        <div className="bg-background12 px-2 py-1 rounded-md mr-2 uppercase">{firstName[0]}{lastName ? lastName[0] : ""}</div>
                        <span className="capitalize">{firstName}{lastName ? ` ${lastName}` : ""}</span>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 mt-3 w-60 max-w-md right-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative flex flex-col bg-white">
                                    {solutions.map((item) => (
                                        <Popover.Button key={item.name}>
                                            <Link href={item.href} passHref>
                                                <div className="flex items-center px-5 py-5 hover:bg-background4 transition ease-in-out duration-150">
                                                    <item.icon className="flex-shrink-0 text-primary1" aria-hidden="true" />
                                                    <div className="ml-2">
                                                        <p className="text-base font-medium text-text2">{item.name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Popover.Button>
                                    ))}
                                </div>
                                <div className="relative" onClick={handleLogout}>
                                    <Popover.Button className="px-5 py-5 bg-gray-50 hover:bg-background4 w-full">
                                        <div className="flex items-center text-text2">
                                            <RiLogoutBoxRLine className="mr-2 text-primary1" />Log Out
                                        </div>
                                    </Popover.Button>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default function Header() {
    const router = useRouter();
    const { appState: { user = {} }, doLogout } = useAppStateContext();
    const [currentPath, setCurrentPath] = useState("/");
    const { isLoggedIn } = user;
    const handleLogout = () => {
        router.replace("/");
        doLogout();
    };
    useEffect(() => {
        setCurrentPath(router.asPath);
    }, [router.asPath]);
    return (
        <header className="fixed top-0 w-full z-30">
            <div className="relative py-2 sm:py-4 md:py-6 bg-opacity-1 bg-background1">
                <Popover>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <nav className="relative flex items-center justify-between h-12 md:justify-center" aria-label="Global">
                            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <Link href="/" passHref>
                                        <div className="cursor-pointer">
                                            <span className="sr-only">Workflow</span>
                                            <img
                                                className="h-8 w-auto sm:h-10"
                                                src="/assets/images/diva-care.png"
                                                alt=""
                                            />
                                        </div>
                                    </Link>
                                    <div className="-mr-2 flex items-center md:hidden">
                                        <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-text2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary1">
                                            <span className="sr-only">Open main menu</span>
                                            <MdOutlineMenu className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:flex lg:justify-between md:flex md:justify-between">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        className={
                                            classNames(
                                                "flex flex-col justify-end items-center font-medium hover:text-primary1 lg:mx-4 md:mx-2",
                                                {
                                                    "text-primary1 active": currentPath === item.href,
                                                    "text-text2": currentPath !== item.href
                                                }
                                            )
                                        }
                                    >
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    </NavLink>
                                ))}
                            </div>
                            <div className="hidden md:space-x-10 md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                                {
                                    isLoggedIn ? (
                                        <ProfileMenu user={user} handleLogout={handleLogout} active={currentPath === "/profile"} />
                                    ) : (
                                        currentPath !== "/auth" &&
                                        <Link href="/auth" passHref>
                                            <button className="inline-flex items-center px-8 py-2 border border-transparent text-white font-medium rounded-full bg-primary1 hover:bg-fuchsia-900 shadow-buttonshadow hover:shadow-lg hover:shadow-primary1">
                                                Log In
                                            </button>
                                        </Link>
                                    )
                                }
                            </div>
                        </nav>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="px-5 pt-4 flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-8 w-auto"
                                            src="/assets/images/diva-care.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-text2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary1">
                                            <span className="sr-only">Close menu</span>
                                            <MdClose className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="px-2 pt-2 pb-3">
                                    {navigation.map((item) => (
                                        <div
                                            key={item.name}
                                            className={
                                                classNames(
                                                    "block px-3 py-2 rounded-md text-base font-medium  hover:text-primary1",
                                                    currentPath === item.href ? "text-primary1" : "text-gray-700 hover:bg-gray-50"
                                                )
                                            }
                                        >
                                            <Popover.Button>
                                                <Link href={item.href}>
                                                    {item.name}
                                                </Link>
                                            </Popover.Button>
                                        </div>
                                    ))}
                                </div>
                                {
                                    isLoggedIn ? (
                                        <>
                                            {
                                                currentPath !== "/profile" && (
                                                    <div className="block w-full px-5 py-3 text-center font-medium text-primary1 bg-gray-50 hover:bg-gray-100">
                                                        <Popover.Button>
                                                            <Link href="/profile" passHref>
                                                                <div className="flex items-center">
                                                                    <RiUser3Fill className="mr-2" />Your Profile
                                                                </div>
                                                            </Link>
                                                        </Popover.Button>
                                                    </div>
                                                )
                                            }
                                            <div className="block w-full px-5 py-3 text-center font-medium text-primary1 bg-gray-50 hover:bg-gray-100" onClick={handleLogout}>
                                                <Popover.Button>
                                                    <div className="flex items-center" >
                                                        <RiLogoutBoxRLine className="mr-2" />Log Out
                                                    </div>
                                                </Popover.Button>
                                            </div>
                                        </>

                                    ) : (
                                        currentPath !== "/auth" && (
                                            <div className="block w-full px-5 py-3 text-center font-medium text-primary1 bg-gray-50 hover:bg-gray-100">
                                                <Popover.Button>
                                                    <Link href="/auth">
                                                        Log In
                                                    </Link>
                                                </Popover.Button>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </header >
    );
}
