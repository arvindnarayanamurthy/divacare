import Head from "next/head";
import classNames from "classnames";
import DatePicker from "../../components/DatePicker";

const appointments = [
    {
        patient: "Jane Cooper",
        service: "Pregnancy Consultation",
        status: "SCHEDULED",
        location: "Online",
        cost: "Rs 500",
        email: "jane.cooper@example.com"
    },
    {
        patient: "Jane Rotanson",
        service: "Fertility Consultation",
        status: "CANCELLED",
        location: "In Person",
        cost: "Rs 500",
        email: "jane.rotanson@example.com"
    },
    {
        patient: "Jane Watson",
        service: "Common Consultation",
        status: "COMPLETED",
        location: "In Person",
        cost: "Rs 500",
        email: "jane.Watson@example.com"
    },
    // More appointments...
];

export default function Appointments() {

    return (
        <>
            <Head>
                <title>Diva Care | Doctor | Appointments</title>
                <script type="application/ld+json">
                    {/** TODO: Page Specific SEO */}
                </script>
            </Head>
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
                                                        {appointments.map((person) => (
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
                                                        ))}
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
        </>
    );
}
