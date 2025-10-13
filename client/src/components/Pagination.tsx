interface PagiProps {
    currPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const Pagination=({currPage, totalPages, onChangePage}: PagiProps) => {
    const pages: number[] = [];
    for (let i=1; i<=totalPages; i++){
        pages.push(i);
    }

    return(
        <div className="flex justify-center my-8">
            {/*id="btnPrev"*/}
            <button disabled={currPage==1} onClick={()=> onChangePage(currPage - 1)}  className="w-10 h-10 font-medium border border-gray-300 cursor-pointer p-0 rounded-l-lg hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                <i className="fa fa-chevron-left"></i>
            </button>

            {/*id="btnPages"*/}
            <div className="flex">
                {pages.map((page) => (
                    <button key={page} onClick={()=> onChangePage(page)} className={`w-10 h-10 font-medium border border-gray-300 cursor-pointer ${currPage===page? "bg-blue-600 text-white": "bg-white text-blue-600 hover:bg-gray-100"}`}>
                        {page}
                    </button>
                ))}
            </div>

            {/*id="btnNext"*/}
            <button disabled={currPage===totalPages} onClick={()=>onChangePage(currPage + 1)} className="w-10 h-10 font-medium border border-gray-300 bg-white cursor-pointer p-0 rounded-r-lg hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                <i className="fa fa-chevron-right"></i>
            </button>
        </div>
    )
}

export default Pagination;