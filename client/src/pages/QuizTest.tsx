import { Button, Checkbox } from "antd";
import Header2 from "../components/Header2.tsx";
import Footer from "../components/Footer.tsx";
import { useState, useEffect } from "react";
import ModalComplete from "../components/ModalComplete.tsx";
import HandleLogout from "../components/handleLogout.tsx";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getTest } from "../apis/TestApi";
import {increasePlays} from "../apis/HomeApi.ts";
import {increasePlayCnt} from "../slices/TestsSlice.ts";

const QuizTest = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const test = useAppSelector((state) => state.tests.selectedTest);
    const [open, setOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [currQuesIdx, setCurrQuesIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(getTest(parseInt(id)));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if(timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev=>{
                if(prev <= 1){
                    clearInterval(timer)
                    handleComplete()
                    // Cập nhật timeLeft về 0
                    return 0
                }
                // Giảm 1 giây
                return prev - 1;
            })
        }, 1000)
        return ()=>clearInterval(timer)
    }, [timeLeft]);

    useEffect(() => {
        if (test) {
            setTotalQuestions(test.questionsDetail.length);


            setTimeLeft(test.duration * 60);
        }
    }, [test]);

    const handleAnswerChange = (checkedValues: number[]) => {
        setSelectedAnswers(checkedValues);
    };

    const handleNext = () => {
            checkAns();
            setSelectedAnswers([]);
            setCurrQuesIdx((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currQuesIdx > 0) {
            setCurrQuesIdx((prev) => prev - 1);
            setSelectedAnswers([]);
        }
    };

    const checkAns=()=>{
        const currQues=test?.questionsDetail[currQuesIdx];

        const correctIds=currQues?.answers.filter((a) => a.correct).map((a) => a.id);
        const isCorrect=selectedAnswers.sort().toString()===correctIds?.sort().toString();

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setCorrectAnswers((prev) => prev + 1);
        }else {
            setWrongAnswers((prev) => prev + 1);
        }
    }
    
    const handleComplete = async () => {







        try {
            if(test?.id){
                // await increasePlays(test.id);


                await increasePlays(test.id, test.plays);



                dispatch(increasePlayCnt(test.id));
            }
        }catch (err){
            console.error("Cannot increase play count:", err);
        }





        checkAns();
        setOpen(true);
    };

    if (!test) return <p>Loading...</p>;

    const currentQuestion = test.questionsDetail[currQuesIdx];

    return (
        <div className="flex flex-col min-h-screen bg-[#F4F4F4]">
            <Header2 onLogout={HandleLogout} />

            <main className="flex-1 flex justify-center p-3">
                <div className="flex flex-col md:flex-row bg-gray-100 w-full">
                    <div className="w-full md:w-56 bg-white p-2 md:p-4">
                        <h3 className="text-[#212529] text-center font-inter text-[23.487px] font-medium leading-[30px] mb-3">
                            Điều hướng nhanh
                        </h3>
                        <div className="grid grid-cols-12 sm:grid-cols-15 md:grid-cols-4 gap-2 text-center">
                            {test.questionsDetail.map((q) => (
                                <div key={q.id}
                                    className={`flex items-center justify-center w-8.5 h-8.5 rounded-lg cursor-pointer ${
                                        q.id === currentQuestion.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                    onClick={() => setCurrQuesIdx(q.id - 1)}
                                >
                                    {q.id}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs mt-4 text-gray-500">
                            Lưu ý: Làm bài kiểm tra bạn có thể sử dụng để điều hướng.
                        </p>
                    </div>

                    <div className="flex flex-1">
                        <div className="flex-1 bg-white border-t md:border-t-0 md:border-l border-gray-300 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-3">
                                <h2 className="text-2xl font-bold">{test.title}</h2>
                                <div className="flex flex-col text-sm mt-1">
                                    <p>
                                        Thời gian: <span>{test.duration}</span> phút
                                    </p>
                                    <p className="mt-1">
                                        Còn lại: <span>{Math.floor(timeLeft / 60)}: {(timeLeft % 60).toString().padStart(2, "0")}</span> phút {/* Thêm timer nếu cần */}
                                    </p>
                                </div>
                            </div>

                            <p className="text-lg font-medium mt-4 mb-3">Câu hỏi {currentQuestion.id} trên {totalQuestions}:</p>
                            <p className="mb-4">{currentQuestion.question}</p>

                            <Checkbox.Group value={selectedAnswers} onChange={handleAnswerChange} className="flex flex-col gap-2">
                                {currentQuestion.answers.map((ans) => (
                                    <Checkbox key={ans.id} value={ans.id}>
                                        {ans.text}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>

                            <div className="flex flex-row justify-between gap-5 ml-0 md:ml-6 mt-4 md:mt-6">
                                <div className="flex gap-4 md:gap-6 mb-2 md:mb-0">
                                    <Button onClick={handlePrev} disabled={currQuesIdx === 0}>Trước</Button>
                                    <Button type="primary" onClick={handleNext} disabled={currQuesIdx === totalQuestions - 1}>Tiếp</Button>
                                </div>
                                <Button type="primary" onClick={handleComplete} className="!bg-[#198754]">
                                    Hoàn thành
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ModalComplete open={open} onClose={() => setOpen(false)} score={Math.round((score / totalQuestions) * 100)} totalQuestions={totalQuestions} correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />

            <Footer />
        </div>
    );
};

export default QuizTest;