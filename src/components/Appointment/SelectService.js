import classNames from "classnames";
import { useEffect } from "react";
import { HiOutlineCurrencyRupee, HiOutlineClock, HiOutlineChevronRight, HiArrowNarrowRight } from "react-icons/hi";
import { appointmentStepsArray } from "../../constants";
import { services } from "../../constants";

const SelectService = ({ handleServiceSelection, appointmentData, appointmentStep, proceedTo, resetData }) => {
    const { type, time, price } = appointmentData;
    useEffect(() => {
        resetData();
        handleServiceSelection({
            type: type || services[0].name,
            price: price || services[0].price,
            time: time || services[0].time
        });
    }, []);
    return (
        <>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0 my-8">
                <div className="basis-2/5 bg-white border shadow-cardshadow1 border-background4 rounded-md p-6">
                    <div className="flex flex-row">
                        <img src="/assets/images/doctor-anita-large.jpg" className="h-20 w-20 rounded-full" />
                        <div className="ml-8">
                            <div className="text-lg text-text2 font-bold">Dr Anita Balakrishna</div>
                            <div className="mt-2 font-semibold text-text2">MS(OBG)Fetal Maternal Specialist
                                Obstetrics and Gynaecology
                                Senior Consultant Obstetrician & Gynaecologist, Feto-Maternal Specialist
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 text-text1">
                        {"Dr Anita Balakrishna graduated as a doctor from the prestigious Bangalore Medical College & Hospital. She pursued her Masters in Obstetrics & Gynecology from the esteemed St John's Medical College & Hospital, Bangalore, where she was awarded 10th Rank for MS OBG in 2004 under Rajiv Gandhi University. Later she enrolled for a Fellowship in Fetal-Maternal medicine at Bangalore Assisted Conception Centre, where she was educated on the modern medical practices used in managing High Risk Pregnancies."}
                    </div>
                </div>
                <div className="basis-3/5">
                    <div className="text-lg font-bold text-text3">Select a Service</div>
                    {
                        services.map((service) => (
                            <div
                                className={classNames(
                                    "flex justify-between border rounded-md items-center cursor-pointer shadow-cardshadow1 mt-8 p-4 hover:border-primary1 hover:shadow-cardshadow",
                                    service.name === type ? "bg-background10 text-primary1" : "bg-white text-text2"
                                )}
                                key={service.name}
                                onClick={() => handleServiceSelection({
                                    type: service.name,
                                    price: service.price,
                                    time: service.time
                                })}
                            >
                                <div className="mx-4">
                                    <img src={service.img} className="h-16 w-16 rounded-full" />
                                </div>
                                <div className="mx-4 flex flex-col grow">
                                    <div className="text-lg font-semibold">{service.name}</div>
                                    <div className="flex mt-2">
                                        <div className="flex items-center text-sm">
                                            <HiOutlineClock className={service.name === type ? "text-primary1" : "text-background6"} />
                                            <div className="ml-1">{service.time}</div>
                                        </div>
                                        <div className="ml-8 flex items-center text-sm">
                                            <HiOutlineCurrencyRupee className={service.name === type ? "text-primary1" : "text-background6"} />
                                            <div className="ml-1">{service.price}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <HiOutlineChevronRight className="text-background6" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="grid grid-flow-row grid-cols-2 my-8">
                <div />
                <button
                    onClick={() => proceedTo(appointmentStepsArray[Number(appointmentStep.id)])}
                    className="rounded-full font-bold py-4 px-10 flex items-center justify-self-end bg-primary1 text-white shadow-buttonshadow hover:bg-background2 hover:shadow-lg hover:shadow-primary1"
                >
                    Next&nbsp;&nbsp;<HiArrowNarrowRight />
                </button>
            </div>
        </>
    );
};

export default SelectService;
