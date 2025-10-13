import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import QuizList from "../components/QuizList";
import SortContainer from "../components/SortContainer";
import Footer1 from "../components/Footer1";
import { type Quiz } from "../types/type";
import HandleLogout from "../components/handleLogout.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/Hook.ts";
import { getAllTests } from "../apis/TestApi.ts";
import { getAllCategories } from "../apis/CateApi.ts";
import Pagination from "../components/Pagination.tsx";
import NotFound from "../assets/NotFound.jpg"

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tests = useAppSelector((state) => state.tests.list);
    const categories = useAppSelector((state) => state.categories.categories);

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
    const [search, setSearch] = useState("");

    const [currPage, setCurrPage] = useState(1);
    const perPage = 4;
    const start=(currPage-1) * perPage;
    // const end=currPage * perPage;
    const end=start+perPage;




    const handlePageChange=(page: number) => {
        if(currPage >= 1 && currPage <= totalPages){
            setCurrPage(page);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // call both APIs in parallel
                await Promise.all([dispatch(getAllTests()), dispatch(getAllCategories())]);
            } catch (err) {
                console.log("Err fetching data", err);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const mappedQuizzes = tests.map((test) => {
            const cate = categories.find((c) => c.id === test.categoryId);
            return {
                id: test.id,
                image: "/assets/Image.svg",
                categoryId: test.categoryId,
                title: test.title,
                ques: test.questionCount,
                plays: test.plays || 0,
                categoryDisplay: cate ? (
                    <div className="flex items-center justify-center mb-1">
                        <img src={cate.image} alt={cate.name} className="w-6 h-6 mr-2 object-cover" />
                        {cate.name}
                    </div>
                ).toString(): (
                    ""
                )
            };
        });
        setQuizzes(mappedQuizzes);
    }, [tests, categories]);

    const filteredQuizzes = useMemo(() => {
        const key = search.trim().toLowerCase();
        return key ? quizzes.filter((q) => q.title.toLowerCase().includes(key)) : quizzes;
    }, [search, quizzes]);

    const sortedQuizzes = useMemo(() => {
        if(sortOrder ==="none") return filteredQuizzes
        return [...filteredQuizzes].sort((a, b) =>
            sortOrder === "desc" ? b.plays - a.plays : a.plays - b.plays
        );
    }, [filteredQuizzes, sortOrder]);

    const totalPages=Math.ceil(sortedQuizzes.length / perPage);
    const pagi=sortedQuizzes.slice(start, end);

    const handleRandomQuiz = () => {
        const pool = filteredQuizzes.length > 0 ? filteredQuizzes : quizzes;
        if (pool.length > 0) {
            const randomId = pool[Math.floor(Math.random() * pool.length)].id;
            navigate(`/quizTest/${randomId}`);
        }
    };

    return (
        <div className=" flex flex-col">
            <Header onLogout={HandleLogout} onSearch={setSearch} />
            <HeroSection onRandomQuiz={handleRandomQuiz} />
            <h3 className="text-center text-2xl font-semibold my-5">⭐ Featured quizzes</h3>
            <div className="lg:px-30 px-12">
                <SortContainer currSort={sortOrder} setSort={setSortOrder} />
                {pagi.length > 0 ? (
                    <QuizList quizzes={pagi} />
                ) : (
                    <div className="flex flex-col items-center justify-center text-center mt-16">
                        <img src={NotFound} alt="No quizzes" className="w-52 h-38 mb-3 opacity-90"/>
                        <h3 className="text-3xl font-semibold text-gray-700 mb-3 ">
                            No quizzes found
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Try adjusting your search keywords.
                        </p>
                    </div>
                )}
            </div>
            {totalPages > 1 &&
                <Pagination currPage={currPage} totalPages={totalPages} onChangePage={handlePageChange} />
            }
            <Footer1 />
        </div>
    );
};

export default Dashboard;
