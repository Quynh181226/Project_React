interface PagiProps {
    currPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const Pagination1 = ({ currPage, totalPages, onChangePage }: PagiProps) => {
    const generatePages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currPage <= 2) {
                for (let i = 1; i <= 3; i++) {
                    pages.push(i);
                }
                pages.push("...");
            } else if (currPage >= totalPages - 3) {
                pages.push("...");
                for (let i = totalPages - 3; i < totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(currPage - 1);
                pages.push(currPage);
                pages.push(currPage + 1);
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pagesToShow = generatePages();

    return (
        <div className="flex justify-center pt-4">
            {/*id="btnPrev"*/}
            <button
                disabled={currPage === 1}
                onClick={() => onChangePage(currPage - 1)}
                className="w-10 h-10 font-medium border border-gray-300 cursor-pointer p-0 rounded-l-lg hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
                <i className="fa fa-chevron-left"></i>
            </button>

            {/*id="btnPages"*/}
            <div className="flex">
                {pagesToShow.map((page, idx) =>
                    page === "..." ? (
                        <button
                            key={`btn-${idx}`}
                            disabled
                            className="w-10 h-10 flex items-center justify-center text-gray-500 border border-gray-300 bg-white cursor-default"
                        >
                            ...
                        </button>


                    ) : (
                        <button
                            key={page}
                            onClick={() => onChangePage(page as number)}
                            className={`w-10 h-10 font-medium border border-gray-300 cursor-pointer ${
                                currPage === page ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/*id="btnNext"*/}
            <button
                disabled={currPage === totalPages}
                onClick={() => onChangePage(currPage + 1)}
                className="w-10 h-10 font-medium border border-gray-300 bg-white cursor-pointer p-0 rounded-r-lg hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
                <i className="fa fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination1;
