import type {JSX} from "react";

export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null | undefined;
}

export interface Quiz {
    id: number;
    image: string;
    categoryId: number;
    title: string;
    ques: number;
    plays: number;
    // categoryDisplay?: string
    // JSX.Element
    categoryDisplay: string | JSX.Element;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}

export type NewCategory = {
    name: string;
    image: string;
};

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null | undefined;
}

export interface Answer {
    id: number;
    text: string;
    correct: boolean;
}

export interface Question {
    id: number;
    question: string;
    answers: Answer[];
}

export interface TestDetail {
    id: number;
    title: string;
    categoryId: number;
    plays: number;
    questionCount: number;
    duration: number;
    questionsDetail: Question[];
}

export interface TestState {
    list: TestDetail[];
    status: "idle" | "pending" | "success" | "failed";
    error: string | null | undefined;
    selectedTest?: TestDetail | null;
}

export interface QuesState {
    list: Question[];
    status: "idle" | "pending" | "success" | "failed";
    error: string | null | undefined;
}

// export interface HomeState {
//     quizzes: Quiz[];
// }