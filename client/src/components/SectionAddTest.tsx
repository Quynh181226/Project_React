import { Form, Input, Select, InputNumber, Button } from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalAddEditQues from "./ModalAddEditQues";
import TableQues from "./TableQues";
import type { RootState } from "../stores/Store";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addTest, updateTest } from "../apis/TestApi";
import type { Question, TestDetail } from "../types/type";
import {toast} from "react-toastify";

const SectionAddTest = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { categories: categoryList } = useSelector((state: RootState) => state.categories);
    const tests = useSelector((state: RootState) => state.tests.list);
    const selectedTest = useAppSelector(state => state.tests.selectedTest);

    const [modalOpen, setModalOpen] = useState(false);
    const [editQues, setEditQues] = useState<Question | null>(null);
    const [currTest, setCurrTest] = useState<TestDetail>({
        id: 0,
        title: "",
        categoryId: 0,
        duration: 0,
        quesCnt: 0,
        quesDetail: [],
        plays: 0,
    });
    const [form] = Form.useForm();
    const [testTitleErr, setTestTitleErr] = useState<string | null>(null);
    const [durationError, setDurationError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedTest) {
            setCurrTest({
                ...selectedTest,
                quesDetail: selectedTest.quesDetail || [],
            });
            form.setFieldsValue({
                testName: selectedTest.title,
                category: selectedTest.categoryId,
                time: selectedTest.duration,
            });
        } else {
            setCurrTest({
                id: 0,
                title: "",
                categoryId: 0,
                duration: 0,
                quesCnt: 0,
                quesDetail: [],
                plays: 0,
            });
            form.resetFields();
        }
    }, [selectedTest, form]);

    const handleAddQues = () => {
        setEditQues(null);
        setModalOpen(true);
    };

    const handleEditQues = (ques: Question) => {
        setEditQues(ques);
        setModalOpen(true);
    };

    const handleSaveQues = (updatedQues: Question[]) => {
        setCurrTest({
            ...currTest,
            quesDetail: updatedQues,
            quesCnt: updatedQues.length,
        });
        setModalOpen(false);
    };

    const handleDeleQues = (quesId: number) => {
        const updatedQues = currTest.quesDetail.filter((q) => q.id !== quesId);
        setCurrTest({
            ...currTest,
            quesDetail: updatedQues,
            quesCnt: updatedQues.length,
        });
    };

    const validateTestTitle = (value: string) => {
        if (!value || value.trim().length < 2) {
            setTestTitleErr("Test name must be >= 2 characters");
            return false;
        }
        if (
            tests.some(
                t =>
                    t.title.toLowerCase() === value.toLowerCase() &&
                    (!currTest || t.id !== currTest.id)
            )
        ) {
            setTestTitleErr("The test name already exists");
            return false;
        }
        setTestTitleErr(null);
        return true;
    };

    const validateDuration = (val: number) => {
        if (!val || val <= 0 || val > 120) {
            setDurationError("Time must be 1-120 minutes");
            return false;
        }
        setDurationError(null);
        return true;
    };

    const onFinish = async (values: any) => {
        const questionsList = currTest.quesDetail || [];
        if (questionsList.length === 0) {
            toast.error("The test requires at least one question");
            return;
        }

        const isTitleValid = validateTestTitle(values.testName);
        const isDurationValid = validateDuration(values.time);

        if (!isTitleValid || !isDurationValid) {
            return;
        }

        const testData: TestDetail = {
            id: currTest.id,
            title: values.testName,
            categoryId: values.category,
            duration: values.time,
            quesCnt: questionsList.length,
            quesDetail: questionsList,
            plays: currTest.plays || 0,
        };

        try {
            if (currTest.id === 0) {
                await dispatch(addTest(testData)).unwrap();
                toast.success("Test created success");
            } else {
                await dispatch(updateTest(testData)).unwrap();
                toast.success("Test update successful");
            }
            navigate("/testManagement");
        } catch (err: any) {
            toast.error(`Err saving test: ${err.message}`);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mt-6 mb-4">
                {currTest.id ? "Edit the test" : "Create the test"}
            </h2>

            <Form form={form} layout="vertical" className="space-y-4" onFinish={onFinish}>
                <Form.Item label="Test name" name="testName" validateStatus={testTitleErr ? "error" : ""} help={testTitleErr}>
                    <Input placeholder="Fill in the test name" onChange={(e) => validateTestTitle(e.target.value)}/>
                </Form.Item>

                <div className="flex gap-4">
                    <Form.Item label="Category" name="category">
                     {/*rules={[{ required: true }]}*/}
                        <Select placeholder="Select category">
                            {categoryList.map(c => (
                                <Select.Option key={c.id} value={c.id}>
                                    <div className="flex items-center">
                                        <img src={c.image} alt={c.name} className="w-6 h-6 mr-2 object-cover" />
                                        {c.name}
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Time (minutes)" name="time" validateStatus={durationError ? "error" : ""} help={durationError}>
                        <InputNumber min={1} max={120} className="w-full" onChange={(val) => validateDuration(val as number)}/>
                    </Form.Item>
                </div>

                <h3 className="text-lg font-semibold mt-6">Quản lý câu hỏi</h3>
                <div className="flex justify-between mt-4 mb-6">
                    <Button
                        type="primary"
                        onClick={handleAddQues}
                    >
                        Add question
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Save test
                    </Button>
                </div>
            </Form>

            <TableQues
                testId={currTest.id}
                questions={currTest.quesDetail}
                onEdit={handleEditQues}
                onDelete={currTest.id === 0 ? handleDeleQues : undefined}
            />

            {modalOpen && (
                <ModalAddEditQues
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    testData={currTest}
                    editData={editQues}
                    onSave={handleSaveQues}
                />
            )}
        </>
    );
};

export default SectionAddTest;