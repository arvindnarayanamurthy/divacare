import React, { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import classNames from "classnames";
import { useAppointmentContext } from "../../context/AppointmentProvider";
import { formatDateForAPI } from "../../utils/commonUtils";

const AppointmentsContainer = () => {
    const { fetchAppointments } = useAppointmentContext();
    const [appointments, setAppointments] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleFetchAppointments = async () => {
        setFetchError(false);
        setLoader(true);
        const appointmentsResponse = await fetchAppointments({
            startDate: formatDateForAPI(new Date()),
            endDate: formatDateForAPI(new Date())
        });
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

    useEffect(() => {
        handleFetchAppointments();
    }, []);

    return (
        <div className="flex-1">
            <div className="py-2 lg:py-6 sm:py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-text3">Appointments</h1>
                    <div className="my-8 text-text3">
                        <h2 className="font-semibold">
                            Choose Date
                        </h2>
                        <div className="py-4">
                            <DatePicker />
                        </div>
                        <div className="py-4">
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider"
                                                        >
                                                            Patient
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider"
                                                        >
                                                            Service
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider"
                                                        >
                                                            Location
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider"
                                                        >
                                                            Cost
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider"
                                                        >
                                                            Status
                                                        </th>
                                                        <th scope="col" className="relative px-6 py-4">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {
                                                        loader && (
                                                            <div className="flex items-center justify-center items-center w-full h-56">
                                                                <div className="w-20 h-20 border-l-4 border-primary1 rounded-full animate-spin my-16" />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        !loader && (
                                                            fetchError ? (
                                                                <tr>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <div>
                                                                                <div className="text-sm text-gray-500">Failed to load Appointments</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                !!appointments.length ? appointments.map((person) => (
                                                                    <tr key={person.email}>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div>
                                                                                    <div className="text-sm font-medium text-text3">{person.patient}</div>
                                                                                    <div className="text-sm text-gray-500">{person.email}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-text3">{person.service}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-text3">{person.location}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm text-text3">{person.cost}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <span className={classNames({
                                                                                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full": true,
                                                                                "bg-green-100 text-green-800": person.status === "COMPLETED",
                                                                                "bg-red-100 text-red-600": person.status === "CANCELLED",
                                                                                "bg-blue-100 text-blue-600": person.status === "SCHEDULED"
                                                                            })}>
                                                                                {person.status}
                                                                            </span>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                                Edit
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                )) : (
                                                                    <tr>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div>
                                                                                    <div className="text-sm text-gray-500">No Appointments Found</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsContainer;
