import { useEffect, useState, Fragment } from "react";
import { format, isAfter } from "date-fns";
import { useRouter } from "next/router";
import AlertBox from "../AlertBox";
import Pagination from "../Pagination";
import CancelModal from "./CancelAppointment";
import AppointmentItem from "./AppointmentItem";
import { appointmentLocations, PAGE_LIMIT, services } from "../../constants";
import AppointmentProvider, { useAppointmentContext } from "../../context/AppointmentProvider";

const { IN_PERSON, ONLINE } = appointmentLocations;

const AppointmentsList = () => {
    const { fetchAppointments, deleteAppointment } = useAppointmentContext();
    const [selectedAppointment, setSelectedAppointment] = useState({});
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const handlePagination = (page) => {
        setCurrentPage(page);
    };
    const handleFetchAppointments = async () => {
        setFetchError(false);
        setLoader(true);
        const appointmentsResponse = await fetchAppointments();
        setLoader(false);
        if (appointmentsResponse) {
            const sortedAppointments = {
                valid: [],
                cancelled: []
            };
            appointmentsResponse
                .map(appointment => {
                    const { online, date, endTime, startTime, cancelled, serviceId } = appointment;
                    const appointmentService = services.find(service => service.serviceId === serviceId) || {};
                    const appointmentDate = format(new Date(date), "dd/MM/yyyy");
                    const apointmentStartTime = format(new Date(startTime), "hh:mm aa");
                    const appointmentEndTime = format(new Date(endTime), "hh:mm aa");
                    const decoratedAppointment = {
                        ...appointment,
                        ...appointmentService,
                        actualDate: appointment.date,
                        location: String(online) === "true" ? ONLINE : IN_PERSON,
                        time: `${apointmentStartTime} - ${appointmentEndTime}`,
                        date: appointmentDate,
                        status: (() => {
                            if (cancelled) {
                                return "Cancelled";
                            } else if (isAfter(new Date(startTime), new Date())) {
                                return "Upcoming";
                            }
                            return "Completed";
                        })()
                    };
                    sortedAppointments[cancelled ? "cancelled" : "valid"].push(decoratedAppointment);
                });
            const decoratedAppointments = sortedAppointments.valid.concat(sortedAppointments.cancelled);
            setAppointments(decoratedAppointments);
        } else {
            setFetchError(true);
        }
    };
    const handleAppointmentCancel = async (id) => {
        const appointmentItem = appointments.find(item => item.id === id);
        setSelectedAppointment(appointmentItem);
        setCancelModalOpen(true);
    };
    const handleCancelConfirm = async () => {
        setCancelModalOpen(false);
        setLoader(true);
        const deleteStatus = await deleteAppointment(selectedAppointment);
        setShowAlert({
            success: deleteStatus
        });
        handleFetchAppointments();
        setLoader(false);
    };
    useEffect(() => {
        handleFetchAppointments();
    }, []);
    return (
        <>
            {
                loader && (
                    <div className="flex items-center justify-center items-center w-full h-56">
                        <div className="w-20 h-20 border-l-4 border-primary1 rounded-full animate-spin my-16" />
                    </div>
                )
            }
            {
                !loader && !!appointments.length && (
                    <>
                        {
                            showAlert && <AlertBox
                                open={showAlert}
                                success={showAlert.success}
                                title={`Appointment Cancel ${showAlert.success ? "Success" : "Failed"}`}
                                message={!showAlert.success ? "Try to cancel after a short while" : ""}
                                handleAlertOpen={() => setShowAlert(false)}
                            />
                        }
                        {appointments.slice(PAGE_LIMIT * currentPage, (currentPage * PAGE_LIMIT) + PAGE_LIMIT).map((appointment, index) => (
                            <Fragment key={`${appointment.id}-${index}`}>
                                <AppointmentItem
                                    {...appointment}
                                    handleCancel={handleAppointmentCancel}
                                />
                            </Fragment>
                        ))}
                        <Pagination
                            itemsCount={appointments.length}
                            onChange={handlePagination}
                            currentPage={currentPage}
                            pageLimit={PAGE_LIMIT}
                        />
                    </>
                )
            }
            {
                !loader && !appointments.length && (
                    <div className="flex flex-col items-center justify-center items-center w-full h-56">
                        {
                            fetchError ? (
                                <>
                                    <div> Failed to load appointments </div>
                                </>
                            ) : (
                                <>
                                    <div className="m-4"> You&apos;re yet to book an appointment! </div>
                                    <button
                                        onClick={() => router.push("/book-appointment")}
                                        className="rounded-full font-bold py-4 px-10 flex items-center justify-self-start bg-white text-primary1 border border-primary1 shadow-buttonshadow2 hover:bg-background7 hover:shadow-cardshadow"
                                    >
                                        Book an appointment
                                    </button>
                                    <div />
                                </>
                            )
                        }
                    </div>
                )
            }
            <CancelModal
                isOpen={cancelModalOpen}
                handleCancel={handleCancelConfirm}
                appointment={selectedAppointment}
                handleClose={() => { setCancelModalOpen(false); }}
            />
        </>
    );
};

function Appointments() {
    return (
        <AppointmentProvider>
            <div className="relative max-w-4xl mx-auto my-4">
                <h1 className="text-2xl font-bold text-text2">Your Appointments</h1>
                <h3 className="text-lg leading-6 font-medium text-text2 py-4 max-w-max">
                    View your appointment history and make changes.
                </h3>
                <AppointmentsList />
            </div>
        </AppointmentProvider>
    );
}

export default Appointments;
