import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Head from "next/head";
import classNames from "classnames";
import { MdContentCopy } from "react-icons/md";

const dayOptions = [
    { name: "Sun", text: "Sunday" },
    { name: "Mon", text: "Monday" },
    { name: "Tue", text: "Tuesday" },
    { name: "Wed", text: "Wednesday" },
    { name: "Thu", text: "Thursday" },
    { name: "Fri", text: "Friday" },
    { name: "Sat", text: "Saturday" },
];

export default function BusinessHours() {
    const [mem, setMem] = useState(dayOptions[2]);
    return (
        <>
            <Head>
                <title>Diva Care | Doctor | Business Hours</title>
                <script type="application/ld+json">
                    {/** TODO: Page Specific SEO */}
                </script>
            </Head>
            <div className="flex-1 bg-background11 border-b border-gray-200">
                <div className="py-2 lg:py-6 sm:py-4">
                    <div className="max-w-7xl px-4 sm:px-6 md:px-8">
                        <h1 className="text-2xl font-semibold text-text3">Set Business Hours</h1>
                    </div>
                    <div className="max-w-7xl my-5 px-4 sm:px-6 md:px-8 text-text3">
                        <p className="mb-5">
                            Add the hours your clinic operates.
                        </p>
                        <p className="mb-5">
                            Choose the days your business operates along with your work hours. Your patients will be able to book appointments only during these hours.
                        </p>
                        <p>
                            You can add multiple hours in a single day. The gaps in your working hours will not be available for patients to book. Use this feature to accomodate your breaks, off-time etc.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 max-w-3xl">
                <div className="py-2 lg:py-6 sm:py-4">
                    <div className="max-w-2xl px-4 sm:px-6 md:px-8">
                        <div className="py-4 block text-sm font-medium text-text3 w-full">
                            Select Working Days
                        </div>
                        <RadioGroup value={mem} onChange={setMem} className="my-2">
                            <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
                                {dayOptions.map((option) => (
                                    <RadioGroup.Option
                                        key={option.name}
                                        value={option}
                                        className={({ checked }) =>
                                            classNames(
                                                "cursor-pointer focus:outline-none",
                                                checked
                                                    ? "bg-background10 border-primary1 text-primary1 hover:bg-primary1 hover:text-white"
                                                    : "bg-gray-100 border-gray-200 text-text3 hover:bg-gray-50",
                                                "border rounded-md py-3 flex items-center justify-center text-sm font-medium sm:flex-1"
                                            )
                                        }
                                    >
                                        <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                        <div className="my-2 block text-sm font-small text-text1 w-full">
                            5 Days Selected
                        </div>
                    </div>
                    <div className="max-w-7xl px-4 sm:px-6 md:px-8">
                        <div className="py-4 block text-sm font-medium text-text3 w-full">
                            Enter Working Hours
                        </div>
                        <div className="block text-sm font-small text-text1 w-full">
                            Add your Working Hours
                        </div>
                        <div className="flex flex-col space-y-5 my-4">
                            {
                                dayOptions.map((day, index) => (
                                    <div key={day.name} className="flex flex-col lg:flex-row lg:space-x-4">
                                        <div className="lg:basis-1/4 font-semibold text-text3 align-middle mb-4">
                                            {day.text}
                                        </div>
                                        <div className="lg:basis-3/4 flex flex-col">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    defaultValue={"09:00 AM"}
                                                    type="text"
                                                    name="start"
                                                    className="rounded-md border-gray-200 w-40"
                                                />
                                                <p className="text-background6">to</p>
                                                <input
                                                    defaultValue={"05:00 PM"}
                                                    type="text"
                                                    name="start"
                                                    className="rounded-md border-gray-200 w-40"
                                                />
                                            </div>
                                            <div className="flex space-x-8">
                                                <button className="text-primary1 text-left text-sm py-2">
                                                    + Add Hours
                                                </button>
                                                {
                                                    !index && <button className="text-primary1 text-left text-sm py-2 flex items-center">
                                                        <MdContentCopy className="text-primary1"/>&nbsp;Copy to All
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <button className="py-2 px-4 bg-primary1 text-white rounded-md">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
