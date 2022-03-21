import Head from "next/head";
import classNames from "classnames";
import { MdOutlineMail, MdOutlinePhone, MdSearch } from "react-icons/md";

const patients = [
    {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        phone: "+91 - 9281291720",
        image:
            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Jane Rotanson",
        email: "jane.rotanson@example.com",
        phone: "+91 - 9281291720",
        image:
            "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Jane Watson",
        email: "jane.watson@example.com",
        phone: "+91 - 9281291720",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];
const appointments = [
    {
        date: "17-05-2020",
        patient: "Jane Cooper",
        service: "Pregnancy Consultation",
        status: "SCHEDULED",
        location: "Online",
        cost: "Rs 500",
        email: "jane.cooper@example.com"
    },
    {
        date: "16-05-2020",
        patient: "Jane Rotanson",
        service: "Fertility Consultation",
        status: "CANCELLED",
        location: "In Person",
        cost: "Rs 500",
        email: "jane.rotanson@example.com"
    },
    {
        date: "15-05-2020",
        patient: "Jane Watson",
        service: "Common Consultation",
        status: "COMPLETED",
        location: "In Person",
        cost: "Rs 500",
        email: "jane.watson@example.com"
    },
    // More appointments...
];

export default function Patients() {
    return (
        <>
            <Head>
                <title>Diva Care | Doctor | Patients</title>
                <script type="application/ld+json">
                    {/** TODO: Page Specific SEO */}
                </script>
            </Head>
            <div className="flex-1 flex overflow-hidden">
                <div className="py-2 lg:py-6 sm:py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <h1 className="text-2xl font-semibold text-text3">Patient Details</h1>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    </div>
                </div>
            </div>
            <div className="flex border-t border-gray-200">
                {/* Secondary column (hidden on smaller screens) */}
                <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first w-72 border-r border-gray-200">
                    <div className="h-full w-full relative flex flex-col bg-background11 p-4 overflow-y-auto">
                        <div className="my-4 flex rounded-md shadow-sm">
                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center">
                            <div className="py-4 block text-sm font-medium text-text3 border-b-2 w-full border-gray-200">
                                Patients
                            </div>
                            <ul role="list" className="divide-y divide-gray-200 w-full">
                                {patients.map((person) => (
                                    <li key={person.email} className="py-1 cursor-pointer">
                                        <div className="p-2 hover:bg-background5 flex items-center rounded-md">
                                            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-text3">{person.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>
                <section
                    aria-labelledby="primary-heading"
                    className="min-w-0 flex-1 h-screen flex flex-col overflow-y-auto lg:order-last"
                >
                    <div className="flex flex-col mx-0 lg:mx-10">
                        <div className="bg-white px-4 py-6 my-4 shadow sm:p-6 sm:rounded-lg">
                            <div className="flex flex-col space-y-3 xl:flex-row xl:space-x-3 xl:items-center">
                                <div className="min-w-0 flex-1 flex items-center space-x-3">
                                    <img className="h-10 w-10 rounded-full" src={patients[0].image} alt="" />
                                    <p className="text-sm font-medium text-gray-900">
                                        {patients[0].name}
                                    </p>
                                </div>
                                <div className="min-w-0 flex-1 flex flex-col">
                                    <div className="text-sm font-medium py-1 text-text1 flex">
                                        <MdOutlineMail className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                                        Email
                                    </div>
                                    <p className="text-sm font-medium py-1 text-gray-900">
                                        {patients[0].email}
                                    </p>
                                </div>
                                <div className="min-w-0 flex-1 flex flex-col">
                                    <div className="text-sm font-medium py-1 text-text1 flex">
                                        <MdOutlinePhone className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                                        Phone Number
                                    </div>
                                    <p className="text-sm font-medium py-1 text-gray-900">
                                        {patients[0].phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="py-2 align-middle inline-block min-w-full overflow-x-auto">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider"
                                                >
                                                    Date
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
                                            {appointments.map((person) => (
                                                <tr key={person.email}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-text3">{person.date}</div>
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
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
