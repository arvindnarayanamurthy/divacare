import { useRouter } from "next/router";
import DoctorLayout from "./DoctorLayout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppStateContext } from "../context/AppStateProvider";
import { useRef } from "react";

const Layout = (props) => {
    const { children } = props;
    const router = useRouter();
    const headerRef = useRef();
    const { appState } = useAppStateContext();
    const { isLoading } = appState;
    return (
        <>
            {
                router.route.includes("/doctor") ? (
                    <DoctorLayout>
                        <main className="bg-background3 min-h-screen">
                            {children}
                        </main>
                    </DoctorLayout>
                ) : (
                    <>
                        <Header />
                        <main className="bg-background3 min-h-screen mt-16 sm:mt-20 md:mt-24">
                            {children}
                        </main>
                        <Footer />
                    </>
                )
            }
            {
                isLoading && (
                    <div className="flex items-center justify-center w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-40">
                        <div className="w-40 h-40 border-l-4 border-primary1 rounded-full animate-spin" />
                    </div>
                )
            }
        </>
    );
};

export default Layout;
