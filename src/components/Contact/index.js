import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineExternalLink } from "react-icons/hi";
import { MAP_VALUES } from "../../constants";
import useDetectScreen from "../../utils/hooks";
import classNames from "classnames";

const MapWithMarker = () => {
    return (
        <div className="relative w-full h-[360px] md:h-[840px] overflow: hidden;">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0834777911455!2d77.61211594993453!3d12.966509990814352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc48a1ebb181756e6!2zMTLCsDU3JzU5LjQiTiA3N8KwMzYnNTEuNSJF!5e0!3m2!1sen!2sin!4v1646758902776!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
            />
            <div className="absolute top-0 left-0 h-[38px] w-full bg-background1" />
        </div>
    );
};

const ContactUs = ({ isPhone }) => (
    <div className={classNames({ "absolute top-0 left-0": !isPhone, "relative": isPhone })}>
        <div className="relative max-w-md md:max-w-lg mx-auto px-4">
            <div className="relative overflow-hidden bg-white mt-5 md:mt-20 mb-10 px-10 py-10 rounded-lg shadow-md">
                <h3 className="text-2xl text-text2 font-bold">Contact Us</h3>
                <p className="mt-6 text-base max-w-3xl">
                </p>
                <dl className="mt-8 space-y-6 text-text2">
                    <dt>
                        <span className="sr-only">Location</span>
                    </dt>
                    <dd className="flex text-base">
                        <HiOutlineLocationMarker className="flex-shrink-0 w-6 h-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3 font-bold">Location</span>
                    </dd>
                    <dt>
                        <span className="sr-only">Phone number</span>
                    </dt>
                    <dd className="ml-6 flex text-base">
                        <span>Gynecology/Obstetrics Clinic<br />
                            #B-001, 10/1, Ground floor, Victoria lawns,
                            Victoria Road, Victoria Layout, Bangalore
                        </span>
                    </dd>
                    <dt>
                        <span className="sr-only">Phone number</span>
                    </dt>
                    <dd className="flex text-base">
                        <HiOutlinePhone className="flex-shrink-0 w-6 h-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3 font-bold">Phone number</span>
                    </dd>
                    <dt>
                        <span className="sr-only">Phone number</span>
                    </dt>
                    <dd className="ml-6 flex text-base">
                        <span className="underline">
                            <a href="tel:+919901600911">+91-9901600911</a>
                        </span>
                    </dd>
                    <dt>
                        <span className="sr-only">Email</span>
                    </dt>
                    <dd className="flex text-base">
                        <HiOutlineMail className="flex-shrink-0 w-6 h-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3 font-bold">Email ID</span>
                    </dd>
                    <dt>
                        <span className="sr-only">Email</span>
                    </dt>
                    <dd className="ml-6 flex flex-wrap text-base">
                        <span className="underline">
                            <a href="mailto:info@divacare.in">info@divacare.in</a>
                        </span>,&nbsp;
                        <span className="underline">
                            <a href="mailto:divacareclinic@gmail.com">divacareclinic@gmail.com</a>
                        </span>
                    </dd>
                    <dt className="flex items-center">
                        <HiOutlineExternalLink className="flex-shrink-0 w-6 h-6 text-gray-400" aria-hidden="true" />
                        <span className="ml-3 font-bold underline">
                            <a href={`https://maps.google.com/maps?ll=${MAP_VALUES.LATITIUDE},${MAP_VALUES.LONGITUDE}&z=14&t=m&hl=en-US&gl=IN&mapclient=embed&cid=14533616059994890979`}>Get Directions on Google Maps</a>
                        </span>
                    </dt>
                </dl>
            </div>
        </div>
    </div>
);

export default function Contact() {
    const { isPhone } = useDetectScreen();
    return (
        <section id="contact" className="relative overflow-hidden bg-background1 pt-14 sm:pt-18 md:pt-22">
            {
                !isPhone ? (
                    <div className="relative w-full h-full">
                        <MapWithMarker isPhone={isPhone} />
                        <ContactUs isPhone={isPhone} />
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <ContactUs isPhone={isPhone} />
                        <MapWithMarker isPhone={isPhone} />
                    </div>
                )
            }
        </section>
    );
}
