import Header1 from '../components/Header1';
import { Button } from "antd";
import TableTest from "../components/TableTest.tsx";
import "../styles/testmana.css";
import HandleLogout from "../components/handleLogout.tsx";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer.tsx";

const TestManagement = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    return (
        <div className="min-h-screen flex flex-col">
            <Header1 onLogout={HandleLogout} />

            <div className="lg:px-30 px-12 overflow-x-auto sm:w-full">
                <h2 className="text-2xl font-semibold my-5">Test Management</h2>

                <div className="flex md:items-center justify-between mb-5 gap-4">
                    <Button type="primary" onClick={()=>navigate("/createTest")} className="!px-5 !py-4.5 !m-0.5">
                        Add test
                    </Button>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <select id="select-op" value={sort} onChange={(e) => setSort(e.target.value)} className="w-35 md:w-50 ml-18 sm:m-0 h-10.5 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">All</option>
                            <option value="title">Test name</option>
                            <option value="duration">Play time (increase)</option>
                        </select>

                        <div className="relative">
                            <input type="text" id="inputSearch" placeholder="Tìm kiếm theo tên" value={search} onChange={(e) => setSearch(e.target.value)} className="w-53 md:w-full border border-gray-300 rounded-md p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500"/>
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <TableTest search={search} sort={sort} />
            </div>

            <Footer/>
        </div>
    );
};

export default TestManagement;