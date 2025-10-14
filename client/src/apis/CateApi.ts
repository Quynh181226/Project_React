import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type {Category, NewCategory} from "../types/type";

export const getAllCategories = createAsyncThunk("categories/getAllCategories", async () => {
        const res = await axiosConfig.get<Category[]>("categories");
        return res.data;
    }
);

export const addCategory = createAsyncThunk("categories/addCategory", async (cate: NewCategory) => {
    const res = await axiosConfig.post<Category>("categories", cate);
    return res.data;
});

export const editCategory = createAsyncThunk("categories/editCategory", async (category: Category) => {
    const res = await axiosConfig.put<Category>(`categories/${category.id}`, category);
    return res.data;
});

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (id: number) => {
    await axiosConfig.delete(`categories/${id}`);
    return id;
});
