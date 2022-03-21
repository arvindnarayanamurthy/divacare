import { HiOutlineClock, HiOutlineCurrencyRupee, HiOutlinePencil, HiArrowNarrowLeft } from "react-icons/hi";
import { appointmentStepsArray, appointmentLocations } from "../../constants";
import { format } from "date-fns";
import Auth from "../Auth";

const { IN_PERSON } = appointmentLocations;

const UserInformation = ({ handleAppointment, addAppointment, appointmentStep, appointmentData, proceedTo, user, setLoader }) => {
    const { type, time, slot, price, location, date } = appointmentData;
    const { isLoggedIn, firstName, lastName, email, phone } = user;

    const handleAppointmentBooking = async () => {
        setLoader(true);
        const booked = await addAppointment();
        handleAppointment({
            booked
        });
        setLoader(false);
        proceedTo(appointmentStepsArray[appointmentStep.id]);
    };

    return (
        <>
            {
                isLoggedIn ? (
                    <div className="flex flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0 my-8">
                        <div className="basis-1/2 bg-white border shadow-cardshadow1 border-background4 rounded-md p-6">
                            <div className="text-lg text-text2 font-bold">Fill up patient information</div>
                            <label htmlFor="name" className="block text-sm mt-6 font-medium text-gray-700">
                                NAME
                                <span className="text-red-500">&nbsp;*</span>
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={`${firstName} ${lastName ? lastName : ""}`}
                                />
                            </div>
                            <label htmlFor="phone-number" className="block text-sm mt-6 font-medium text-gray-700">
                                PHONE NUMBER
                                <span className="text-red-500">&nbsp;*</span>
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="phone-number"
                                    id="phone-number"
                                    className="shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={phone}
                                />
                            </div>
                            <label htmlFor="email" className="block text-sm mt-6 font-medium text-gray-700">
                                EMAIL ID
                                <span className="text-red-500">&nbsp;*</span>
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="shadow-sm focus:ring-primary1 focus:border-primary1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    defaultValue={email}
                                />
                            </div>
                        </div>
                        <div className="basis-1/2 bg-white border shadow-cardshadow1 border-background4 rounded-md p-6">
                            <div className="flex flex-row items-center">
                                <img src="/assets/images/doctor-anita-large.jpg" className="h-10 w-10 rounded-full" />
                                <div className="ml-4 text-lg text-text2 font-bold">Appointment with Dr Anita Balakrishna</div>
                            </div>
                            <div className="mt-8">
                                <div className="text-lg text-text2 font-semibold">
                                    {type}
                                </div>
                                <div className="flex mt-2">
                                    <div className="flex items-center text-sm text-text2">
                                        <HiOutlineClock className="text-background6" />
                                        <div className="ml-1">{time}</div>
                                    </div>
                                    <div className="ml-8 flex items-center text-sm text-text2">
                                        <HiOutlineCurrencyRupee className="text-background6" />
                                        <div className="ml-1">{price}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="text-lg text-text2 font-semibold">
                                    Address
                                </div>
                                <div className="text-base text-text2 font-medium mt-2">
                                    {location}
                                </div>
                                {
                                    location === IN_PERSON && (
                                        <div className="text-base text-text2">
                                            Gynecology/Obstetrics Clinic<br />
                                            #B-001, 10/1, Ground floor, Victoria lawns,<br />
                                            Victoria Road, Victoria Layout, Bangalore
                                        </div>
                                    )
                                }
                            </div>
                            <div className="mt-8">
                                <div className="text-lg text-text2 font-semibold">
                                    Date
                                </div>
                                <div className="text-base text-text2 font-medium mt-2">
                                    {format(new Date(date), "do MMMM yyyy")}{`, ${slot?.text}`}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => proceedTo(appointmentStepsArray[0])}
                                    className="rounded-full text-primary1 font-bold bg-background7 border border-transparent hover:border-primary1 py-3 px-4 flex items-center"
                                >
                                    <HiOutlinePencil />&nbsp;Edit Details
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Auth />
                )
            }
            <div className="grid grid-flow-row grid-cols-2 my-8">
                <button
                    onClick={() => proceedTo(appointmentStepsArray[Number(appointmentStep.id - 2)])}
                    className="rounded-full font-bold py-4 px-10 flex items-center justify-self-start bg-white text-primary1 border border-primary1 shadow-buttonshadow2 hover:bg-background7 hover:shadow-cardshadow"
                >
                    <HiArrowNarrowLeft />&nbsp;&nbsp;Back
                </button>
                {
                    isLoggedIn && (
                        <button
                            onClick={handleAppointmentBooking}
                            className="rounded-full font-bold py-4 px-12 justify-self-end bg-primary1 text-white shadow-buttonshadow hover:bg-background2 hover:shadow-lg hover:shadow-primary1"
                        >
                            Confirm
                        </button>
                    )
                }
            </div>
        </>
    );
};

export default UserInformation;
