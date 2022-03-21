import Head from "next/head";
import { useState } from "react";
import classNames from "classnames";
import Account from "../components/Account";
import Appointments from "../components/Appointments";
import { parseCookies } from "../utils/commonUtils";

const tabs = [
    { name: "Appointments" },
    { name: "Account" },
];
function Profile() {
    const [currentTab, setCurrentTab] = useState(0);
    return (
        <>
            <Head>
                <title>Diva Care | Your Profile</title>
                <script type="application/ld+json">
                    {/** TODO: Page Specific SEO */}
                </script>
            </Head>
            <section id="appointments" className="relative overflow-hidden">
                <div className="relative py-6 md:py-10 px-4 sm:px-6 sm:pt-8 lg:pb-16 lg:px-8">
                    <div className="relative max-w-7xl mx-auto">
                        <div className="px-4 sm:px-6 md:px-0">
                            <h1 className="text-3xl text-center font-extrabold text-text2">Your Profile</h1>
                        </div>
                        <div className="border-b border-gray-200">
                            <label htmlFor="selected-tab" className="sr-only">
                            Select a tab
                            </label>
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map((tab, index) => (
                                    <div
                                        key={tab.name}
                                        onClick={() => setCurrentTab(index)}
                                        className={classNames(
                                            currentTab === index
                                                ? "border-primary1 text-primary1"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                            "whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm cursor-pointer"
                                        )}
                                        aria-current={currentTab === index ? "page" : undefined}
                                    >
                                        {tab.name}
                                    </div>
                                ))}
                            </nav>
                        </div>
                        {{
                            "Appointments": <Appointments />,
                            "Account": <Account />
                        }[tabs[currentTab].name]}
                    </div>
                </div>
            </section>
        </>
    );
}

Profile.getInitialProps = async ({ req }) => {
    const cookies = parseCookies(req);
    if (cookies.user) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false
            }
        };
    }
    return { props: {} };
};

export default Profile;
