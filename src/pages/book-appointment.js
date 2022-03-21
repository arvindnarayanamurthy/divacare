import Head from "next/head";
import Appointment from "../components/Appointment";
import AppointmentProvider from "../context/AppointmentProvider";

function BookAppointment() {
    return (
        <>
            <Head>
                <title>Diva Care | Book Appointment</title>
                <script type="application/ld+json">
                    {/** TODO: Page Specific SEO */}
                </script>
            </Head>
            <AppointmentProvider>
                <Appointment />
            </AppointmentProvider>
        </>
    );
}

export default BookAppointment;
