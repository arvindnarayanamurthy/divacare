
import { HiOutlineCurrencyRupee, HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import classNames from "classnames";

const AppointmentItem = ({
    id, img, name, status, date, time, location, price,
    handleCancel
}) => {
    return (
        <div className="flex border rounded-md items-start sm:items-center shadow-cardshadow1 mt-4 p-1 md:p-2" data-automation-id={id} >
            <div className="m-1 sm:m-2 md:m-4 items-start">
                <img src={img} className="w-10 h-10 sm:h-12 sm: w-12 md:h-16 md:w-16 rounded-full" />
            </div>
            <div className="mx-2 flex flex-col md:flex-row grow">
                <div className="flex flex-col grow">
                    <div className="flex py-1 flex-wrap items-center">
                        <div className="text-md font-semibold text-text2 mr-2">
                            {name}
                        </div>
                        <div
                            className={
                                classNames(
                                    "text-xs font-semibold rounded-md px-2 uppercase",
                                    status === "Upcoming" && "text-blue-800 bg-blue-200",
                                    status === "Cancelled" && "text-red-600 bg-red-100",
                                    status === "Completed" && "text-green-800 bg-green-100"
                                )
                            }
                        >
                            {status}
                        </div>
                    </div>
                    <div className="flex py-1 text-sm font-medium text-text2">
                        Dr Anita Balakrishna
                    </div>
                    <div className="flex py-1 flex-wrap">
                        <div className="basis-full sm:basis-1/2 md:basis-1/4 py-1 flex items-center text-sm">
                            <IoMdCalendar className="text-background6 h-4 w-4" />
                            <div className="ml-1 text-text1 font-medium">{date}</div>
                        </div>
                        <div className="basis-full sm:basis-1/2 md:basis-1/3 py-1 flex items-center text-sm">
                            <HiOutlineClock className="text-background6 h-4 w-4" />
                            <div className="ml-1 text-text1 font-medium">{time}</div>
                        </div>
                        <div className="basis-full sm:basis-1/2 md:basis-1/4 py-1 flex items-center text-sm">
                            <HiOutlineLocationMarker className="text-background6 h-4 w-4" />
                            <div className="ml-1 text-text1 font-medium">{location}</div>
                        </div>
                        <div className="basis-full sm:basis-1/2 md:basis-1/6 py-1 flex items-center text-sm">
                            <HiOutlineCurrencyRupee className="text-background6 h-4 w-4" />
                            <div className="ml-1 text-text1 font-medium">{price}</div>
                        </div>
                    </div>
                </div>
                {handleCancel && (
                    <div className="shrink min-w-[60px] mt-2 sm:mt-0">
                        {status === "Upcoming" && (
                            <button className="text-red-600 cursor-pointer" onClick={() => handleCancel(id)}>
                                Cancel
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentItem;
