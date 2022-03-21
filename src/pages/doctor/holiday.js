import Head from "next/head";

export default function Holiday() {
    return (
        <>
            <Head>
                <title>Diva Care |  Doctor | Holiday</title>
                <script type="application/ld+json">
                    {/** TODO: Page Specific SEO */}
                </script>
            </Head>
            <div className="flex-1 bg-background11 border-b border-gray-200">
                <div className="py-2 lg:py-6 sm:py-4">
                    <div className="max-w-7xl px-4 sm:px-6 md:px-8">
                        <h1 className="text-2xl font-semibold text-text3">Holiday & Time offs</h1>
                    </div>
                    <div className="max-w-7xl my-5 px-4 sm:px-6 md:px-8 text-text3">
                        <p className="mb-5">
                            Set dates for holidays and other time off periods when your clinic will be shut.
                        </p>
                        <p>During these dates, your patients will not be able to book a slot.</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 max-w-3xl">
                <div className="py-2 lg:py-6 sm:py-4">
                    <div className="max-w-2xl px-4 sm:px-6 md:px-8">
                        <div className="py-4 block text-sm font-semibold text-text3 w-full">
                            Choose Dates
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
