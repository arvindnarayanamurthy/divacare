import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";

const LandingWithBackground = styled.div`
    #landing:after {
        content: " ";
        position: absolute;
        top: 0;
        z-index: -2;
        height: 100%;
        width: 100%;
        background: url("/assets/images/clip.png");
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
    }
`;

const Doctor = styled.div`
    &:after {
        content: " ";
        position: absolute;
        z-index: -1;
        background: url("/assets/images/landing-section-doctor.png");
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
        right: 2%;
        top: 0;
        height: 100%;
        width: 100%;
    }
`;

export default function Landing() {
    useEffect(() => {
        console.log("====>", new Date().getTimezoneOffset());
    }, []);
    return (
        <LandingWithBackground>
            <div id="landing" className="relative bg-background1 bg-opacity-1 z-0">
                <div className="hidden lg:block">
                    <Doctor />
                </div>
                <div className="py-16 mx-auto max-w-7xl px-4">
                    <h1 className="text-buttonshadow tracking-tight font-extrabold md:max-w-3xl text-gray-900 text-5xl md:text-buttonshadow leading-extra-loose">
                        Diva Care brings your family’s health care closer to you!
                    </h1>
                    <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Keeping your wellness in mind, we deliver complete range of women’s health care from prepubertal to postmenopausal health issues.
                    </p>
                    <div className="mt-16 w-max sm:flex md:mt-8">
                        <Link href="/book-appointment" passHref>
                            <button className="cursor-pointer w-full items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary1 hover:bg-fuchsia-900 md:py-4 md:text-lg md:px-10 shadow-buttonshadow hover:shadow-lg hover:shadow-primary1">
                                Book an appointment
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </LandingWithBackground>
    );
}
