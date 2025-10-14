import Header1 from "../components/Header1";
import Footer from "../components/Footer.tsx";
import SectionAddTest from "../components/SectionAddTest.tsx";
import HandleLogout from "../components/handleLogout.tsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllTests } from "../apis/TestApi";
import { setSelectedTest } from "../slices/TestsSlice";

const CreateTest = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useAppDispatch();
    const tests = useAppSelector((state) => state.tests.list);

    useEffect(() => {
        dispatch(getAllTests());
    }, [dispatch]);

    useEffect(() => {
        if (id && tests.length > 0) {
            const testId = parseInt(id, 10);
            const foundTest = tests.find((t) => t.id === testId);
            dispatch(setSelectedTest(foundTest || null));
        } else if (!id) {
            dispatch(setSelectedTest(null));
        }
    }, [id, tests, dispatch]);


    return (
        <div className="min-h-screen flex flex-col">
            <Header1 onLogout={HandleLogout} />
            <div className="lg:px-30 px-12">
                <SectionAddTest />
            </div>
            <Footer />
        </div>
    );
};

export default CreateTest;