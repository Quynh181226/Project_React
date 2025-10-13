import { useState, useEffect } from "react";
import { Button } from "antd";
// import { getAllCategories } from "../slices/CategoriesSlice.ts";
import TableCategory from "../components/TableCategory";
import ModalAddEditCategory from "../components/ModalAddEditCategory";
import ModalDeleteCategory from "../components/ModalDeleteCategory";
import type { Category } from "../types/type";
import Header1 from "../components/Header1";
import Footer from "../components/Footer";
import HandleLogout from "../components/handleLogout.tsx";

import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import {getAllCategories} from "../apis/CateApi.ts";

const CategoryManagement = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state) => state.categories);

    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [code, setCode] = useState<"Add" | "Edit">("Add");
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header1 onLogout={HandleLogout} />
            <div className="lg:px-30 px-12">
                <h2 className="text-2xl font-semibold my-5">Category Management</h2>

                <Button type="primary" className="mb-3 !px-3 !py-4.5"
                    onClick={() => {
                        setCode("Add");
                        setSelectedCategory(undefined);
                        setOpenAddEdit(true);
                    }}
                >
                    Add Category
                </Button>

                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}

                <TableCategory
                    categories={categories}
                    setCode={setCode}
                    setSelectedCategory={setSelectedCategory}
                    setOpenAddEdit={setOpenAddEdit}
                    setOpenDelete={setOpenDelete}
                />

                <ModalAddEditCategory
                    open={openAddEdit}
                    onClose={() => setOpenAddEdit(false)}
                    category={selectedCategory}
                    code={code}
                />

                <ModalDeleteCategory
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    category={selectedCategory}
                />
            </div>
            <Footer />
        </div>
    );
};

export default CategoryManagement;
