import { Modal, Button, Input, Checkbox } from "antd";
import type { Question, TestDetail, Answer } from "../types/type";
import { useAppDispatch } from "../hooks/Hook.ts";
import { useEffect, useState } from "react";
import { updateTest } from "../apis/TestApi.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    testData: TestDetail;
    editData?: Question | null;
    onSave?: (updatedQues: Question[]) => void;
}

const ModalAddEditQues = ({ open, onClose, testData, editData, onSave }: ModalProps) => {
    const dispatch = useAppDispatch();

    const [errQues, setErrQues] = useState<string | null>(null);
    const [errAns, setErrAns] = useState<string | null>(null);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState<Answer[]>([
        { id: 1, text: "", correct: false },
        { id: 2, text: "", correct: false },
        { id: 3, text: "", correct: false },
        { id: 4, text: "", correct: false },
    ]);

    useEffect(() => {
        if (open) {
            setErrQues(null);
            setErrAns(null);
            if (editData) {
                setQuestion(editData.question);
                setAnswers(editData.answers);
            } else {
                setQuestion("");
                setAnswers([
                    { id: 1, text: "", correct: false },
                    { id: 2, text: "", correct: false },
                    { id: 3, text: "", correct: false },
                    { id: 4, text: "", correct: false },
                ]);
            }
        }
    }, [open, editData]);

    const handleToggleCorrect = (id: number) => {
        setAnswers((answers) =>
            answers.map((a) => (a.id === id ? { ...a, correct: !a.correct } : a))
        );
    };

    const handleAddAnswer = () => {
        setAnswers((answers) => [
            ...answers,
            { id: answers.length + 1, text: "", correct: false },
        ]);
    };

    const handleDeleteAnswer = (id: number) => {
        setAnswers((answers) => answers.filter((a) => a.id !== id));
    };

    const handleChangeAnswer = (id: number, text: string) => {
        setAnswers((answers) =>
            answers.map((a) => (a.id === id ? { ...a, text } : a))
        );
    };

    const handleSave = async () => {
        setErrQues(null);
        setErrAns(null);
        let hasError = false;

        if (!question.trim()) {
            setErrQues("Question not empty");
            hasError = true;
        }

        if (answers.some((a) => !a.text.trim())) {
            setErrAns("Answer not empty");
            hasError = true;
        } else if (answers.length < 2) {
            setErrAns("There must be at least 2 answers");
            hasError = true;
        } else if (!answers.some((a) => a.correct)) {
            setErrAns("There must be at least one correct answer");
            hasError = true;
        }

        if (hasError) return;

        const newQuesId =
            editData?.id ||
            (testData.quesDetail.length > 0
                ? Math.max(...testData.quesDetail.map((e) => e.id)) + 1
                : 1);

        const newQues: Question = {
            id: newQuesId,
            question,
            answers: answers.map((a) => ({ ...a })),
        };

        const updatedQues = editData
            ? testData.quesDetail.map((e) =>
                e.id === editData.id ? newQues : e
            )
            : [...testData.quesDetail, newQues];

        try {
            const updatedTest: TestDetail = {
                ...testData,
                quesCnt: updatedQues.length,
                quesDetail: updatedQues,
            };

            if (onSave) {
                onSave(updatedQues);
                onClose();
                return;
            }

            if (testData.id !== 0) {
                await dispatch(updateTest(updatedTest)).unwrap();
                toast.success(
                    editData
                        ? "Question updated success"
                        : "Question added success"
                );
            }

            onClose();
        } catch (err) {
            console.error("Update test error:", err);
            toast.error(`Err saving ques: ${err}`);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={editData ? "Edit question" : "Add question"}
            destroyOnClose
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <div className="mb-4">
                <label className="block font-medium mb-2">Question</label>
                <Input value={question}  placeholder="Input question" onChange={(e) => setQuestion(e.target.value)}/>
                {errQues && <div className="text-red-500 text-sm mt-2">{errQues}</div>}
            </div>

            <label className="block font-medium mb-2">Answer</label>
            <div className="flex flex-col gap-3">
                {answers.map((a) => (
                    <Input
                        key={a.id}
                        value={a.text}
                        onChange={(e) => handleChangeAnswer(a.id, e.target.value)}
                        addonBefore={
                            <Checkbox
                                checked={a.correct}
                                onChange={() => handleToggleCorrect(a.id)}
                            />
                        }
                        suffix={
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => handleDeleteAnswer(a.id)}
                            />
                        }
                    />
                ))}
            </div>
            {errAns && <div className="text-red-500 text-sm mt-2">{errAns}</div>}

            <Button type="default" className="mt-4" onClick={handleAddAnswer}>
                Add answer
            </Button>
        </Modal>
    );
};

export default ModalAddEditQues;
