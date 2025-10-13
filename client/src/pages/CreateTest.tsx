// import Header1 from "../components/Header1";
// import Footer from "../components/Footer.tsx";
// import SectionAddTest from "../components/SectionAddTest.tsx";
// import HandleLogout from "../components/handleLogout.tsx";
// // import TableQues from "../components/TableQues.tsx";
// // import { useAppSelector } from "../hooks/Hook";
//
// const CreateTest = () => {
//     // const selectedTest = useAppSelector((state) => state.tests.selectedTest);
//
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Header1 onLogout={HandleLogout} />
//             <div className="lg:px-30 px-12">
//                 <SectionAddTest />
//                 {/*{selectedTest && <TableQues testId={selectedTest.id!} />}*/}
//             </div>
//             <Footer />
//         </div>
//     );
// };
//
// export default CreateTest;
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
        // chỉ load danh sách test 1 lần khi mount
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