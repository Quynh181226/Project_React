import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../stores/Store";
import type { TestDetail } from "../types/type";
import { getAllTests } from "../apis/TestApi";
import { useNavigate } from "react-router-dom";
// import { getAllCategories} from "../slices/CategoriesSlice";
import ModalDeleteTest from "./ModalDeleteTest";
import {getAllCategories} from "../apis/CateApi.ts";
import Pagination from "../components/Pagination";

interface TableTestProps {
    search: string;
    sort: string;
}

const TableTest = ({ search, sort }: TableTestProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { list, status, error } = useSelector((state: RootState) => state.tests);
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState<TestDetail | undefined>(undefined);

    const [currPage, setCurrPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        dispatch(getAllTests());
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleDeleteClick = (quiz: TestDetail) => {
        setSelectedTest(quiz);
        setDeleteOpen(true);
    };

    let filtered = list.filter((t: TestDetail) =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "title") {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "duration") {
        filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    }

    const totalPages=Math.ceil(filtered.length / perPage);
    const start=(currPage-1) * perPage;
    const end=start+perPage;

    const pagi=filtered.slice(start, end);

    if (status === "pending") return <p>Loading...</p>;
    if (status === "failed") return <p className="text-red-600">{error}</p>;

    return (
        <div className="overflow-x-auto sm:w-full" >
            <table className="w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2 border border-[#DEE2E6]">ID</th>
                    <th className="px-4 py-2 border border-[#DEE2E6]">Test name</th>
                    <th className="px-4 py-2 border border-[#DEE2E6]">Category</th>
                    <th className="px-4 py-2 border border-[#DEE2E6]">Number questions</th>
                    <th className="px-4 py-2 border border-[#DEE2E6]">Time</th>
                    <th className="px-4 py-2 border border-[#DEE2E6] text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {pagi.map((quiz: TestDetail, index: number) => {
                    const category = categories.find(c => c.id === quiz.categoryId);







                    // const categoryDisplay = category ? `<img src={category.image} /> {category.name}` : "";













                    return (
                        <tr key={quiz.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}>
                            <td className="px-4 py-2 border border-[#DEE2E6]">{quiz.id}</td>
                            <td className="px-4 py-2 border border-[#DEE2E6]">{quiz.title}</td>
                            <td className="px-4 py-2 border border-[#DEE2E6]">
                                {/*<td className="px-4 py-2">*/}
                                {category ? (
                                    <div className="flex items-center">
                                        <img src={category.image} alt={category.name} className="w-6 h-6 mr-2 object-cover" />
                                        {category.name}
                                    </div>
                                ) : (
                                    // "Empty"
                                    <div className="px-4 py-2">Không có danh mục</div>
                                )}
                            {/*</td>*/}


                                {/*{categoryDisplay}*/}
                            </td>
                            <td className="px-4 py-2 border border-[#DEE2E6] text-center">{quiz.questionCount}</td>
                            <td className="px-4 py-2 border border-[#DEE2E6] text-center">{quiz.duration} min</td>
                            <td className="px-4 py-2 border border-[#DEE2E6]">
                                <div className="flex justify-center">
                                    <button onClick={() => navigate(`/createTest/${quiz.id}`)} className="px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500 mr-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteClick(quiz)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <ModalDeleteTest open={deleteOpen} onClose={() => setDeleteOpen(false)} test={selectedTest} />

            {totalPages > 1 &&
                <Pagination currPage={currPage} totalPages={totalPages} onChangePage={(p)=>setCurrPage(p)}/>
            }
        </div>
    );
};

export default TableTest;