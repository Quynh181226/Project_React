import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllQues } from "../apis/QuesApi";
import type { Question } from "../types/type";
import ModalAddEditQues from "./ModalAddEditQues";
import ModalDeleteQues from "./ModalDeleteQues";
import { Button } from "antd";
import Pagination1 from "./Pagination1.tsx";
import LoadingProcess from "./LoadingProcess.tsx";

interface TableQuesProps {
    testId: number;
    onEdit?: (ques: Question) => void;
    onDelete?: (quesId: number) => void;
    questions?: Question[];
}

const TableQues = ({ testId, onEdit, onDelete, questions: questionsFromProp }: TableQuesProps) => {
    const dispatch = useAppDispatch();
    const { list, status, error } = useAppSelector(state => state.ques);

    const quesList = questionsFromProp || list;
    const quesStatus = questionsFromProp ? "success" : status;
    const quesError = questionsFromProp ? null : error;

    const [modalAddEditOpen, setModalAddEditOpen] = useState(false);
    const [editQues, setEditQues] = useState<Question | null>(null);

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [selectedQues, setSelectedQues] = useState<Question | null>(null);

    const [currPage, setCurrPage] = useState(1);
    const perPage=2;

    useEffect(() => {
        if (!questionsFromProp && testId !== 0) {
            dispatch(getAllQues(testId));
        }
    }, [dispatch, testId, questionsFromProp]);

    const totalPages=Math.ceil(quesList.length / perPage);
    const start=(currPage-1)*perPage;
    const end=start+perPage;
    const pagi=quesList.slice(start,end);

    const handleEdit = (ques: Question) => {
        setEditQues(ques);
        setModalAddEditOpen(true);
        if (onEdit) onEdit(ques);
    };

    const handleDeleteClick = (ques: Question) => {
        setSelectedQues(ques);
        setModalDeleteOpen(true);
    };

    const handleSaveQues = () => {
        if (!questionsFromProp && testId !== 0) {
            dispatch(getAllQues(testId));
        }
        setModalAddEditOpen(false);
    };

    const handleDeletedQues = () => {
        if (!questionsFromProp && testId !== 0) {
            dispatch(getAllQues(testId));
        }
        setModalDeleteOpen(false);
    };

    if (status === "pending") return <LoadingProcess/>;








    if (quesStatus === "failed") return <p className="text-red-600">{quesError}</p>;

    return (
        <div className="overflow-x-auto mt-6">
            <table className="w-full">
                <thead>
                <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2  border border-[#DEE2E6]">ID</th>
                    <th className="px-4 py-2 border border-[#DEE2E6]">Câu hỏi</th>
                    <th className="px-4 py-2 border border-[#DEE2E6] text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {pagi.map((q, index) => (
                    <tr
                        key={q.id}
                        className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50 transition`}
                    >
                        <td className="px-4 py-2 border border-[#DEE2E6] text-center">{q.id}</td>
                        <td className="px-4 py-2 border border-[#DEE2E6]">{q.question}</td>
                        <td className="px-4 py-2 text-center border border-[#DEE2E6]">
                            <div className="flex justify-center gap-2">
                                <Button type="primary"
                                    className="!bg-yellow-400 !text-black hover:!bg-yellow-500"
                                    onClick={() => handleEdit(q)}
                                >
                                    Sửa
                                </Button>
                                <Button type="primary"
                                    className="!bg-red-600 !text-white hover:!bg-red-700"
                                    onClick={() => handleDeleteClick(q)}
                                >
                                    Xóa
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                {quesList.length === 0 && (
                    <tr>
                        <td colSpan={3} className="text-center px-4 py-2 border">
                            No questions yet
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {modalAddEditOpen && (
                <ModalAddEditQues
                    open={modalAddEditOpen}
                    onClose={() => setModalAddEditOpen(false)}
                    testData={{
                        id: testId,
                        quesDetail: quesList,
                        quesCnt: quesList.length,
                        title: "",
                        categoryId: 0,
                        duration: 0,
                        plays: 0

                    }}
                    editData={editQues}
                    onSave={handleSaveQues}
                />
            )}

            {modalDeleteOpen && (
                <ModalDeleteQues open={modalDeleteOpen} onClose={() => setModalDeleteOpen(false)} ques={selectedQues} testId={testId} onDeleted={handleDeletedQues} customHandleDelete={onDelete}/>
            )}

            {totalPages > 1 &&
                <Pagination1 currPage={currPage} totalPages={totalPages} onChangePage={(p)=>setCurrPage(p)}/>
            }
        </div>
    );
};

export default TableQues;