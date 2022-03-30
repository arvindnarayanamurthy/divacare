export const PAGE_LIMIT = 3;

export const MAP_VALUES = {
    LATITIUDE: 12.96651,
    LONGITUDE: 77.61431
};

export const USER_TYPES = {
    GUEST: "GUEST",
    REGISTERED: "REGISTERED"
};

export const SERVICE_SELECTION = "SERVICE_SELECTION";
export const SLOT_SELECTION = "SLOT_SELECTION";
export const USER_INFORMATION = "USER_INFORMATION";
export const BOOKING_CONFIRMATION = "BOOKING_CONFIRMATION";

export const API_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

export const appointmentSteps = {
    SERVICE_SELECTION: {
        id: 1,
        name: "Service Selection",
        type: SERVICE_SELECTION
    },
    SLOT_SELECTION: {
        id: 2,
        name: "Choose a Slot",
        type: SLOT_SELECTION
    },
    USER_INFORMATION: {
        id: 3,
        name: "User Information",
        type: USER_INFORMATION
    },
    BOOKING_CONFIRMATION: {
        id: 4,
        name: "Confirmation",
        type: BOOKING_CONFIRMATION
    }
};
export const appointmentStepsArray = Object.keys(appointmentSteps);

export const features = [
    "PreConception counselling",
    "Antenatal care",
    "Postnatal care",
    "Contraception",
    "Menstrual problems/PCOS",
    "Perimenopausal health issues",
    "Nutritional diet advice",
    "Treatment of recurrent miscarriage",
    "Infertility",
    "Gynaecological problems (fibroid uterus.endometriosis,uterine anomalies)"
];

export const services = [
    {
        serviceId: "f58ab143-ff29-4103-a08f-5c08de479b36",
        name: "Pregnancy Consultation",
        time: "30 min",
        price: "Rs 500",
        img: "/assets/images/pregnancy-consultation.jpg"
    },
    {
        serviceId: "20075b1b-c2f3-4ceb-93dc-0d26ebc7e85b",
        name: "Fertility Consultation",
        time: "30 min",
        price: "Rs 500",
        img: "/assets/images/fertility-consultation.jpg"
    },
    {
        serviceId: "1d5331b3-e0ca-4611-bf5f-073feb77dbce",
        name: "Gynaec Consultation",
        time: "30 min",
        price: "Rs 500",
        img: "/assets/images/common-consultation.jpg"
    }
];

export const slotsData = [
    { text: "8:00 AM", hours: 8, minutes: 0 },
    { text: "8:30 AM", hours: 8, minutes: 30 },
    { text: "9:00 AM", hours: 9, minutes: 0 },
    { text: "9:30 AM", hours: 9, minutes: 30 },
    { text: "10:00 AM", hours: 10, minutes: 0 },
    { text: "10:30 AM", hours: 10, minutes: 30 },
    { text: "4:00 PM", hours: 16, minutes: 0 },
    { text: "4:30 PM", hours: 16, minutes: 30 },
    { text: "5:00 PM", hours: 17, minutes: 0 },
    { text: "5:30 PM", hours: 17, minutes: 30 },
    { text: "6:00 PM", hours: 18, minutes: 0 },
    { text: "6:30 PM", hours: 18, minutes: 30 },
    { text: "7:00 PM", hours: 19, minutes: 0 },
    { text: "7:30 PM", hours: 19, minutes: 30 },
    { text: "8:00 PM", hours: 20, minutes: 0 },
    { text: "8:30 PM", hours: 20, minutes: 30 }
];

export const appointmentLocations = {
    IN_PERSON: "In Person",
    ONLINE: "Online Consultation"
};


export const resetPasswordSteps = {
    EMAIL_CONFIRMATION: "EMAIL_CONFIRMATION",
    PASSWORD_CONFIRMATION: "PASSWORD_CONFIRMATION",
    CONFIRMATION_SUCCESS: "CONFIRMATION_SUCCESS"
};

export const envConsts = {
    development: {
        DOC_ID: "ganesh.umesh007@gmail.com"
    },
    production: {
        DOC_ID: "ganesh.umesh007@gmail.com" //"92b97397-3eac-42a7-9fea-aa0ccb21cb3c"
    }
};
