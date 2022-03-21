import Calendar from "../Calendar";
import classNames from "classnames";
import { add, toDate, isAfter } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { FiChevronRight, FiChevronLeft, FiSun, FiMoon } from "react-icons/fi";
import { appointmentStepsArray, appointmentLocations, slotsData } from "../../constants";

const SelectSlot = ({
    appointmentData,
    fetchSlotsData,
    handleSlotData,
    appointmentStep,
    proceedTo
}) => {
    const {
        location,
        date = new Date().toISOString(),
        slot
    } = appointmentData;
    const [loader, setLoader] = useState(false);
    const [filteredSlotsData, setFilteredSlotsData] = useState({
        Morning: [],
        Evening: []
    });
    const handleFilterSlotsData = useCallback(async (currentDate) => {
        setLoader(true);
        const remainingSlots = await fetchSlotsData({ date: currentDate });
        const filteredData = slotsData
            .reduce((result, slot) => {
                if (remainingSlots && remainingSlots.length) {
                    const { hours, minutes } = slot;
                    const timeOfDay = new Date(currentDate);
                    timeOfDay.setHours(hours, minutes, 0);
                    const isNotBooked = remainingSlots.find((timeSlot) => {
                        const { startTime, endTime } = timeSlot;
                        const formattedStartTime = new Date(startTime.replace("[Asia/Calcutta]", ""));
                        const formattedEndTime = new Date(endTime.replace("[Asia/Calcutta]", ""));
                        const slotTime = timeOfDay;
                        return slotTime >= formattedStartTime && slotTime <= formattedEndTime;
                    });
                    if (isNotBooked) {
                        const noon = new Date(currentDate);
                        noon.setHours(12, 0, 0);
                        const isSlotTimeAfterCurrentTime = isAfter(new Date(currentDate), timeOfDay);
                        const isSlotTimeAfterNoonTime = isAfter(timeOfDay, noon);
                        if (!isSlotTimeAfterCurrentTime) {
                            result[
                                isSlotTimeAfterNoonTime ? "Evening" : "Morning"
                            ].push(slot);
                        }
                    }
                }
                return result;
            }, {
                Morning: [],
                Evening: []
            });
        setFilteredSlotsData(filteredData);
        setLoader(false);
        let slotTime = false;
        if (filteredData["Morning"].length > 1) {
            slotTime = filteredData["Morning"][0];
        } else if (filteredData["Evening"].length > 1) {
            slotTime = filteredData["Evening"][0];
        }
        handleSlotData({
            slot: slotTime
        });
    }, []);
    useEffect(() => {
        handleFilterSlotsData(date);
    }, [date]);
    return (
        <>
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-8 md:space-y-0 my-8">
                <div className="basis-2/5 border shadow-cardshadow1 border-background4 rounded-md self-start">
                    <div className="text-lg text-text2 font-bold p-8">
                        Select a date
                    </div>
                    <div className="border-t border-background4" />
                    <div className="bg-white p-6 rounded-md">
                        <Calendar
                            calendarType="US"
                            onChange={(value) => {
                                handleSlotData({
                                    date: value.toISOString()
                                });
                            }}
                            value={new Date(date)}
                            minDate={new Date()}
                            maxDate={toDate(add(new Date(), { days: 60 }))}
                            prev2Label={false}
                            next2Label={false}
                            prevLabel={<FiChevronLeft />}
                            nextLabel={<FiChevronRight />}
                        />
                    </div>
                </div>
                <div className="basis-3/5 bg-white border shadow-cardshadow1 border-background4 rounded-md p-6">
                    <div className="text-lg text-text2 font-bold">Type of Appointment</div>
                    <div className="flex mt-4 justify-start space-x-2">
                        {
                            Object.keys(appointmentLocations).map((appointmentLocation) => (
                                <button
                                    key={appointmentLocations[appointmentLocation]}
                                    onClick={() => handleSlotData({
                                        location: appointmentLocations[appointmentLocation]
                                    })}
                                    className={
                                        classNames(
                                            "basis-1/2 rounded-md border border-background8 text-text1 flex items-center justify-start p-2 hover:border-primary1",
                                            location === appointmentLocations[appointmentLocation] ? "bg-background12" : ""
                                        )
                                    }>
                                    {location === appointmentLocations[appointmentLocation]
                                        ? <BiRadioCircleMarked className="text-primary1 mr-2" />
                                        : <BiRadioCircle className="mr-2" />}
                                    {appointmentLocations[appointmentLocation]}
                                </button>
                            ))
                        }
                    </div>
                    <div className="text-md text-text2 font-bold mt-8">Choose a Slot</div>
                    {
                        loader ?  (
                            <div className="flex items-center justify-center items-center w-full h-56">
                                <div className="w-20 h-20 border-l-4 border-primary1 rounded-full animate-spin my-16" />
                            </div>
                        ) : Object.keys(filteredSlotsData).map((timeOfDay) => (
                            <div key={timeOfDay} className="mt-4">
                                <div className="flex items-center space-x-2 text-md text-text2 font-semibold">
                                    {timeOfDay === "Morning" ? <FiSun className="text-background6" /> : <FiMoon className="text-background6" />}<div>{timeOfDay}</div>
                                </div>
                                <div className="border border-background8 my-4" />
                                <div className="flex flex-wrap justify-start mb-10">
                                    {filteredSlotsData[timeOfDay] && filteredSlotsData[timeOfDay].length > 0 ? filteredSlotsData[timeOfDay].map((slotTime) => (
                                        <button
                                            onClick={() => handleSlotData({ slot: slotTime })}
                                            key={slotTime.text}
                                            className={classNames(
                                                "border border-background8 rounded-md text-text2 py-2 px-4 m-2 hover:border-primary1",
                                                slot?.text === slotTime.text ? "bg-background12" : "")}>
                                            {slotTime.text}
                                        </button>
                                    )) : "No Slots Available"}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="grid grid-flow-row grid-cols-2 my-8">
                <button
                    onClick={() => proceedTo(appointmentStepsArray[Number(appointmentStep.id - 2)])}
                    className="rounded-full font-bold py-4 px-10 flex items-center justify-self-start bg-white text-primary1 border border-primary1 shadow-buttonshadow2 hover:bg-background7 hover:shadow-cardshadow"
                >
                    <HiArrowNarrowLeft />&nbsp;&nbsp;Back
                </button>
                <button
                    disabled={ !date || !location || !slot }
                    onClick={() => proceedTo(appointmentStepsArray[Number(appointmentStep.id)])}
                    className="rounded-full font-bold py-4 px-10 flex items-center justify-self-end bg-primary1 text-white shadow-buttonshadow hover:bg-background2 hover:shadow-lg hover:shadow-primary1 disabled:opacity-50"
                >
                    Next&nbsp;&nbsp;<HiArrowNarrowRight />
                </button>
            </div>
        </>
    );
};

export default SelectSlot;
