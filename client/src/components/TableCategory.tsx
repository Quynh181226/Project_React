import Pagination from "../components/Pagination";
import type { Category } from "../types/type";
import {useState} from "react";

interface TableCategoryProps {
    categories: Category[];
    setCode: (code: "Add" | "Edit") => void;
    setSelectedCategory: (category: Category | undefined) => void;
    setOpenAddEdit: (open: boolean) => void;
    setOpenDelete: (open: boolean) => void;
}

const TableCategory = ({ categories, setCode, setSelectedCategory, setOpenAddEdit, setOpenDelete }: TableCategoryProps) => {
    const [currPage, setCurrPage] = useState(1);
    const perPage=5;

    const totalPages=Math.ceil(categories.length / perPage);
    const start=(currPage-1)*perPage;
    const end=start+perPage;
    const pagi=categories.slice(start,end);


    const handleEdit = (cate: Category) => {
        setSelectedCategory(cate);
        setCode("Edit");
        setOpenAddEdit(true);
    };

    const handleDelete = (cate: Category) => {
        setSelectedCategory(cate);
        setOpenDelete(true);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Category name</th>
                    <th className="px-4 py-2 border text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {pagi.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}>
                        <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                        <td className="px-4 py-2 border border-gray-300 flex gap-2 flex-row items-center">
                            <img src={item.image} alt="" className="w-10 h-10  hover:scale-110 transition-transform duration-200"/>
                            <span className="text-[#212529] font-roboto text-[16.934px] leading-[24px]">{item.name}</span>
                        </td>
                        <td className="px-4 py-2 text-center border border-gray-300">
                            <button onClick={() => handleEdit(item)} className="px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {totalPages > 1 &&
                <Pagination currPage={currPage} totalPages={totalPages} onChangePage={(p)=>setCurrPage(p)}/>
            }
        </div>
    );
};

export default TableCategory;