import Head from "next/head";
import AppointmentsContainer from "../../components/Doctor/appointments";
import AppointmentProvider from "../../context/AppointmentProvider";

export default function Appointments() {
    return (
        <>
            <Head>
                <title>Diva Care | Doctor | Appointments</title>
                <script type="application/ld+json">
                </script>
            </Head>
            <AppointmentProvider>
                <AppointmentsContainer />
            </AppointmentProvider>
        </>
    );
}
