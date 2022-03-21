import DatePicker from "react-datepicker";
import { forwardRef, useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = ({ value, onClick, onChange }, ref) => (
    <div className="flex items-center bg-background5 rounded-md max-w-max" onClick={onClick}>
        <input
            className="bg-transparent border-transparent p-2"
            onChange={onChange}
            ref={ref}
            value={value}
        />
        <IoMdCalendar className="h-6 w-6 mx-1" />
    </div>
);

const DateInput = forwardRef(CustomInput);

export default function () {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            closeOnScroll={true}
            onChange={(date) => setStartDate(date)}
            customInput={<DateInput />}
        />
    );
}

