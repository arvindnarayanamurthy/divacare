import classNames from "classnames";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
const Pagination = ({ itemsCount, currentPage, onChange, pageLimit }) => {
    const maxPage = Math.ceil(itemsCount / pageLimit);
    const buttons = [...Array(maxPage)];
    return (
        <div className="flex justify-center my-4 mx-2">
            <div className="mr-2 cursor-pointer">
                <HiOutlineChevronLeft
                    onClick={() => onChange(currentPage - 1, (currentPage - 1) * pageLimit)}
                    className={
                        classNames(
                            "text-background6 h-6 w-6 cursor-pointer",
                            currentPage === 0 && "hidden"
                        )
                    }
                />
            </div>
            <div className="flex space-x-2 items-center">
                {
                    buttons.length > 1 && buttons.map((_, index) => (
                        <p
                            key={`page-${index + 1}`}
                            className={`rounded-md bg-background2 h-1.5 w-${index === currentPage ? "12" : "4"}`}
                        />
                    ))
                }
            </div>
            <div className="ml-2">
                <HiOutlineChevronRight
                    onClick={() => onChange(currentPage + 1, (currentPage + 1) * pageLimit)}
                    className={
                        classNames(
                            "text-background6 h-6 w-6 cursor-pointer",
                            currentPage === (maxPage - 1) && "hidden"
                        )
                    }
                />
            </div>
        </div>
    );
};

export default Pagination;
