import Cookies from "js-cookie";
import DocApi from "../utils/api";
import { useRouter } from "next/router";
import { sub, add, format } from "date-fns";
import { formatDateForAPI } from "../utils/commonUtils";
import { createContext, useContext, useReducer } from "react";
import { appointmentSteps, appointmentLocations, API_DATE_FORMAT } from "../constants";
import { useAppStateContext } from "./AppStateProvider";
const { ONLINE } = appointmentLocations;
const initState = {
    appointmentStep: appointmentSteps.SERVICE_SELECTION,
    data: {
        date: new Date().toISOString(),
        location: appointmentLocations.IN_PERSON
    },
    services: []
};
const appointmentReducer = (state = initState, action) => {
    switch (action.type) {
    case "PROCEED_TO": return {
        ...state,
        appointmentStep: appointmentSteps[action.payload],
    };
    case "RESET_DATA": return {
        ...state,
        data: initState.data
    };
    case "SET_DATA": return {
        ...state,
        data: {
            ...state.data,
            ...action.payload
        }
    };
    case "SET_SERVICES": return {
        ...state,
        services: action.payload
    };
    default: return state;
    }
};
const AppoinmentContext = createContext();
export const useAppointmentContext = () => useContext(AppoinmentContext);
const AppointmentProvider = ({ children }) => {
    const router = useRouter();
    const { appState, setLoader } = useAppStateContext();
    const { envConsts } = appState;
    const [appointment, dispatch] = useReducer(appointmentReducer, initState);

    const fetchServices = async () => {
        const fetchServicesPayload = {
            resource: "serviceapi",
            body: JSON.stringify({
                taskName: "GET_ALL_SERVICES"
            })
        };
        try {
            const servicesResponse = await DocApi({
                method: "POST",
                url: "/docschedule",
                data: fetchServicesPayload
            });
            const { data = {} } = servicesResponse;
            if (data && data.statusCode === 200) {
                const servicesResponseBody = JSON.parse(data.body);
                if (Array.isArray(servicesResponseBody)) {
                    dispatch({
                        type: "SET_SERVICES",
                        payload: servicesResponseBody
                    });
                    return servicesResponseBody;
                }
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    const handleCookieRedirection = () => {
        if (!(Cookies.get("accessToken") && Cookies.get("idToken"))) {
            setLoader(true);
            setTimeout(() => {
                setLoader(false);
                router.replace("/auth");
            }, 3000);
            return false;
        }
    };

    const contextValue = {
        appointment,
        resetData: () => dispatch({ type: "RESET_DATA" }),
        setData: payload => dispatch({ type: "SET_DATA", payload }),
        proceedTo: payload => dispatch({ type: "PROCEED_TO", payload }),
        fetchAppointments: async () => {
            handleCookieRedirection();
            try {
                const endDate = formatDateForAPI(add(new Date(), { days: 30 }));
                const startDate = formatDateForAPI(sub(new Date(), { days: 30 }));
                const appointmentsPayload = {
                    resource: "appointmentapi",
                    body: JSON.stringify({
                        taskName: "UPCOMING_APPOINTMENTS",
                        accesstoken: Cookies.get("accessToken"),
                        startDate,
                        endDate,
                        docId: envConsts.DOC_ID
                    })
                };
                const appointmentsResponse = await DocApi({
                    method: "POST",
                    url: "/doctor",
                    headers: {
                        Authorization: Cookies.get("idToken")
                    },
                    data: appointmentsPayload
                });
                const { data = {} } = appointmentsResponse;
                if (data && data.statusCode === 200) {
                    const appointmentsResponseBody = JSON.parse(data.body);
                    return Array.isArray(appointmentsResponseBody) ? appointmentsResponseBody : [];
                }
                return false;
            } catch (err) {
                return false;
            }
        },
        addAppointment: async () => {
            handleCookieRedirection();
            const appointmentData = appointment.data;
            const { date, slot, location, type } = appointmentData;
            const { hours, minutes } = slot;
            try {
                const services = await fetchServices();
                if (services && services.length) {
                    const service = services.find(service => service.serviceName === type);
                    const dateObj = new Date(date).setHours(0, 0, 0, 0);
                    const appointmentDate = formatDateForAPI(dateObj);
                    const startTime = formatDateForAPI(add(dateObj, {
                        hours,
                        minutes
                    }));
                    const endDateValues = (hr, min) => {
                        let hourValue = hr;
                        let minValue = min;
                        let dayValue = 0;
                        if (min === 30) {
                            if (hr === 23) {
                                hourValue = 0;
                                dayValue = 1;
                            } else {
                                hourValue = hr + 1;
                            }
                        } else {
                            minValue = 30;
                        }
                        return {
                            days: dayValue,
                            hours: hourValue,
                            minutes: minValue
                        };
                    };
                    const endTime = formatDateForAPI(add(dateObj, endDateValues(hours, minutes)));
                    const createAppointmentPayload = {
                        taskName: "CREATE_APPOINTMENT",
                        accesstoken: Cookies.get("accessToken"),
                        date: appointmentDate,
                        startTime,
                        endTime,
                        docId: envConsts.DOC_ID,
                        serviceId: service.id,
                        online: String(location === ONLINE)
                    };
                    const appointmentDataPayload = {
                        resource: "appointmentapi",
                        body: JSON.stringify(createAppointmentPayload)
                    };
                    const createAppointmentResponse = await DocApi({
                        method: "POST",
                        url: "/doctor",
                        headers: {
                            Authorization: Cookies.get("idToken")
                        },
                        data: appointmentDataPayload
                    });
                    const { data = {} } = createAppointmentResponse;
                    return data && data.statusCode === 200;
                } else {
                    return false;
                }
            } catch (err) {
                return false;
            }
        },
        deleteAppointment: async (payload) => {
            handleCookieRedirection();
            try {
                const deleteAppointmentPayload = {
                    resource: "appointmentapi",
                    body: JSON.stringify({
                        taskName: "CANCEL_APPOINTMENT",
                        accesstoken: Cookies.get("accessToken"),
                        appointmentId: payload.id
                    })
                };
                const deleteAppointmentResponse = await DocApi({
                    method: "POST",
                    url: "/doctor",
                    headers: {
                        Authorization: Cookies.get("idToken")
                    },
                    data: deleteAppointmentPayload
                });
                const { data = {} } = deleteAppointmentResponse;
                return data && data.statusCode === 200;
            } catch (err) {
                return false;
            }
        },
        fetchSlotsData: async (payload) => {
            try {
                const dateObj = new Date(payload.date).setHours(0, 0, 0, 0);
                const slotDate = formatDateForAPI(dateObj);
                const fetchSlotsDataPayload = {
                    resource: "appointmentapi",
                    body: JSON.stringify({
                        taskName: "GET_AVAILABLE_TIMESLOTS",
                        doctorID: envConsts.DOC_ID,
                        date: slotDate
                    })
                };
                const slotsDataResponse = await DocApi({
                    method: "POST",
                    url: "/docschedule",
                    data: fetchSlotsDataPayload
                });
                const { data = {} } = slotsDataResponse;
                if (data && data.statusCode === 200) {
                    const slotsDataResponseBody = JSON.parse(data.body);
                    return Array.isArray(slotsDataResponseBody) ? slotsDataResponseBody : [];
                }
                return false;
            } catch(err) {
                return false;
            }
        },
        fetchServices
    };
    return (
        <AppoinmentContext.Provider value={contextValue}>
            {children}
        </AppoinmentContext.Provider>
    );
};

export default AppointmentProvider;
