import { format } from "date-fns";
import { useRouter } from "next/router";
import { HiOutlineClock, HiArrowNarrowLeft, HiOutlineCurrencyRupee } from "react-icons/hi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { appointmentStepsArray, appointmentLocations } from "../../constants";
const { IN_PERSON } = appointmentLocations;

const Confirmation = ({ proceedTo, appointmentData, appointmentStep }) => {
    const { type, price, time, slot, location, date, booked } = appointmentData;
    const router = useRouter();
    return (
        <>
            <div className="flex flex-row space-x-4 my-8 justify-center">
                <div className="basis-1/2 border shadow-cardshadow1 border-background4 rounded-md">
                    <div className="p-6 bg-background3 rounded-md flex flex-col items-center">
                        {
                            booked ? (
                                <>
                                    <img src="/assets/images/confirm-booking.png" className="h-16 w-16" />
                                    <div className="mt-4 text-lg text-text2 font-bold">Appointment with Dr Anita Balakrishna Confirmed!</div>
                                    <div className="mt-2 text-text2">Please check your email for your appointment details</div>
                                </>
                            ) : (
                                <>
                                    <RiAlarmWarningFill className="h-16 w-16 text-red-500" />
                                    <div className="mt-4 text-lg text-text2 font-bold">Appointment Booking Failed!</div>
                                </>
                            )
                        }
                    </div>
                    {
                        booked && (
                            <>
                                <div className="border-t border-background4" />
                                <div className="p-6 bg-white rounded-md">
                                    <div className="mt-4">
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
                                        {location === IN_PERSON && (
                                            <div className="text-base text-text2">
                                                Gynecology/Obstetrics Clinic<br />
                                                #B-001, 10/1, Ground floor, Victoria lawns,<br />
                                                Victoria Road, Victoria Layout, Bangalore
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-8">
                                        <div className="text-lg text-text2 font-semibold">
                                            Date
                                        </div>
                                        <div className="text-base text-text2 font-medium mt-2">
                                            {format(new Date(date), "do MMMM yyyy")}{`, ${slot?.text}`}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="grid grid-flow-row grid-cols-2 my-8">
                {
                    booked ? (
                        <>
                            <div />
                            <button
                                onClick={() => router.replace("/profile")}
                                className="rounded-full font-bold py-4 px-10 flex items-center justify-self-end bg-primary1 text-white shadow-buttonshadow hover:bg-background2"
                            >
                                Go to appointments
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => proceedTo(appointmentStepsArray[Number(appointmentStep.id - 2)])}
                                className="rounded-full font-bold py-4 px-10 flex items-center justify-self-start bg-white text-primary1 border border-primary1 shadow-buttonshadow2 hover:bg-background7 hover:shadow-cardshadow"
                            >
                                <HiArrowNarrowLeft />&nbsp;&nbsp;Back
                            </button>
                            <div />
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Confirmation;
