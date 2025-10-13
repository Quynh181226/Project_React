import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { Question, TestDetail } from "../types/type";

// Lấy danh sách câu hỏi theo testId
export const getAllQues = createAsyncThunk<Question[], number>(
    "ques/getAll",
    async (testId) => {
        const res = await axiosConfig.get(`tests/${testId}`);
        return res.data.questionsDetail || [];
    }
);

export const addQues = createAsyncThunk<Question, { testId: number; newQues: Question }>(
    "ques/add",
    async ({ testId, newQues }) => {
        const testRes = await axiosConfig.get(`tests/${testId}`);
        const test: TestDetail = testRes.data;

        const updatedTest: TestDetail = {
            ...test,
            questionsDetail: [...(test.questionsDetail || []), newQues],
            questionCount: (test.questionsDetail?.length || 0) + 1,
        };

        await axiosConfig.put(`tests/${testId}`, updatedTest);
        return newQues;
    }
);

export const deleteQues = createAsyncThunk<number, { testId: number; quesId: number }>(
    "ques/delete",
    async ({ testId, quesId }) => {
        const testRes = await axiosConfig.get(`tests/${testId}`);
        const test: TestDetail = testRes.data;

        const updatedTest: TestDetail = {
            ...test,
            questionsDetail: (test.questionsDetail || []).filter((q) => q.id !== quesId),
            questionCount: Math.max((test.questionsDetail?.length || 1) - 1, 0),
        };

        await axiosConfig.put(`tests/${testId}`, updatedTest);
        return quesId;
    }
);

export const updateQues = createAsyncThunk<Question, { testId: number; ques: Question }>(
    "ques/update",
    async ({ testId, ques }) => {
        const testRes = await axiosConfig.get(`tests/${testId}`);
        const test: TestDetail = testRes.data;

        const updatedTest: TestDetail = {
            ...test,
            questionsDetail: (test.questionsDetail || []).map((q) =>
                q.id === ques.id ? ques : q
            ),
        };

        await axiosConfig.put(`tests/${testId}`, updatedTest);
        return ques;
    }
);
