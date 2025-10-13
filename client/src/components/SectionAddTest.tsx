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
    const [currentTest, setCurrentTest] = useState<TestDetail>({
        id: 0,
        title: "",
        categoryId: 0,
        duration: 0,
        questionCount: 0,
        questionsDetail: [],
        plays: 0,
    });
    const [form] = Form.useForm();
    // Thêm state để quản lý lỗi
    const [testTitleError, setTestTitleError] = useState<string | null>(null);
    const [durationError, setDurationError] = useState<string | null>(null);

    // Load test đang chọn (nếu có)
    useEffect(() => {
        if (selectedTest) {
            setCurrentTest({
                ...selectedTest,
                questionsDetail: selectedTest.questionsDetail || [],
            });
            form.setFieldsValue({
                testName: selectedTest.title,
                category: selectedTest.categoryId,
                time: selectedTest.duration,
            });
        } else {
            setCurrentTest({
                id: 0,
                title: "",
                categoryId: 0,
                duration: 0,
                questionCount: 0,
                questionsDetail: [],
                plays: 0,
            });
            form.resetFields();
        }
    }, [selectedTest, form]);

    // Mở modal thêm/sửa câu hỏi
    const handleAddQues = () => {
        setEditQues(null);
        setModalOpen(true);
    };

    const handleEditQues = (ques: Question) => {
        setEditQues(ques);
        setModalOpen(true);
    };

    // Callback khi lưu câu hỏi từ ModalAddEditQues
    const handleSaveQuestion = (updatedQuestions: Question[]) => {
        setCurrentTest({
            ...currentTest,
            questionsDetail: updatedQuestions,
            questionCount: updatedQuestions.length,
        });
    };

    // Xóa câu hỏi cục bộ cho test mới
    const handleLocalDeleteQues = (quesId: number) => {
        const updatedQuestions = currentTest.questionsDetail.filter((q) => q.id !== quesId);
        setCurrentTest({
            ...currentTest,
            questionsDetail: updatedQuestions,
            questionCount: updatedQuestions.length,
        });
    };

    // Validate tên bài test
    const validateTestTitle = (value: string) => {
        if (!value || value.trim().length < 3) {
            setTestTitleError("Tên bài test phải >= 3 ký tự");
            return false;
        }
        if (
            tests.some(
                t =>
                    t.title.toLowerCase() === value.toLowerCase() &&
                    (!currentTest || t.id !== currentTest.id)
            )
        ) {
            setTestTitleError("Tên bài test đã tồn tại");
            return false;
        }
        setTestTitleError(null);
        return true;
    };

    // Validate thời lượng
    const validateDuration = (value: number) => {
        if (!value || value <= 0 || value > 120) {
            setDurationError("Thời gian phải 1-120 phút");
            return false;
        }
        setDurationError(null);
        return true;
    };

    // Submit form (Lưu bài test)
    const onFinish = async (values: any) => {
        const questionsList = currentTest.questionsDetail || [];
        if (questionsList.length === 0) {
            toast.error("Bài test cần ít nhất 1 câu hỏi");
            return;
        }

        // Kiểm tra validate trước khi submit
        const isTitleValid = validateTestTitle(values.testName);
        const isDurationValid = validateDuration(values.time);

        if (!isTitleValid || !isDurationValid) {
            return;
        }

        const testData: TestDetail = {
            id: currentTest.id,
            title: values.testName,
            categoryId: values.category,
            duration: values.time,
            questionCount: questionsList.length,
            questionsDetail: questionsList,
            plays: currentTest.plays || 0,
        };

        try {
            if (currentTest.id === 0) {
                await dispatch(addTest(testData)).unwrap();
                toast.success("Tạo bài test thành công");
            } else {
                await dispatch(updateTest(testData)).unwrap();
                toast.success("Cập nhật bài test thành công");
            }
            navigate("/testManagement");
        } catch (err: any) {
            toast.error(`Lỗi khi lưu bài test: ${err.message || "Không xác định"}`);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-semibold mt-6 mb-4">
                {currentTest.id ? "Edit the test" : "Create the test"}
            </h2>

            <Form
                form={form}
                layout="vertical"
                className="space-y-4"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Test name"
                    name="testName"
                    validateStatus={testTitleError ? "error" : ""}
                    help={testTitleError}
                >
                    <Input
                        placeholder="Fill in the test name"
                        onChange={(e) => validateTestTitle(e.target.value)}
                    />
                </Form.Item>

                <div className="flex gap-4">
                    <Form.Item
                        label="Category"
                        name="category"
                        // rules={[{ required: true }]}
                    >
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

                    <Form.Item
                        label="Time (minutes)"
                        name="time"
                        validateStatus={durationError ? "error" : ""}
                        help={durationError}
                    >
                        <InputNumber
                            min={1}
                            max={120}
                            className="w-full"
                            onChange={(value) => validateDuration(value as number)}
                        />
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
                testId={currentTest.id}
                questions={currentTest.questionsDetail}
                onEdit={handleEditQues}
                onDelete={currentTest.id === 0 ? handleLocalDeleteQues : undefined}
            />

            {modalOpen && (
                <ModalAddEditQues
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    testData={currentTest}
                    editData={editQues}
                    onSave={handleSaveQuestion}
                />
            )}
        </>
    );
};

export default SectionAddTest;