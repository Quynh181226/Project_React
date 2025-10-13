import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getByEmail, add } from "../apis/UserApi";
import type { User } from "../types/type";
import LoadingProcess from "../components/LoadingProcess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((state) => state.user);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.username.trim()) newErrors.username = "Full name not empty";
        if (!form.email.trim()) newErrors.email = "Email not empty";
        else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email.trim())) newErrors.email = "Email invalid";
        }
        if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match";
        return newErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const clientErrors = validate();
        if (Object.keys(clientErrors).length > 0) {
            setErrors(clientErrors);
            toast.error("Register failed!!")
            return;
        }

        try {
            const res = await dispatch(getByEmail(form.email.trim())).unwrap();
            if (res.length > 0) {
                setErrors({ email: "Email already exists" });
                return;
            }

            const newUser: User = {
                id: Date.now(),
                fullName: form.username.trim(),
                email: form.email.trim(),
                password: form.password.trim(),
                role: "user",
            };

            await dispatch(add(newUser));

            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("currentUser", JSON.stringify(newUser.id));

            toast.success("Register success!!");
            // navigate("/dashboard");

            setTimeout(()=>{
                navigate("/login");
            }, 3000)


        } catch (err) {

            console.error("Register error:", err);
            setErrors({ general: "Failed to register." });
        }
    };

    return (
        <div className="bg-gray-50">
            {loading && <LoadingProcess />}
            <h1 className="text-center font-medium text-4xl pt-5">Đăng ký</h1>

            <p className="text-[#52525B] font-poppins text-[18px] font-normal leading-[30px] text-center mt-5 mb-8 max-w-md mx-auto">
                QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ dàng thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh chóng và hiệu quả!
            </p>

            <div className="flex items-center justify-center bg-gray-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                    {errors.general && (
                        <div className="mb-4 text-red-600 text-sm">{errors.general}</div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
                                <span className="px-3 text-gray-400">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input type="text" id="username" placeholder="Enter full name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="flex-1 p-2 outline-none"
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
                                <span className="px-3 text-gray-400">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input type="email" id="email" placeholder="Enter email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="flex-1 p-2 outline-none"/>
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
                                <span className="px-3 text-gray-400">
                                    <FontAwesomeIcon icon={faKey} />
                                </span>
                                <input type="password" id="password" placeholder="Enter password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="flex-1 p-2 outline-none"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
                                <span className="px-3 text-gray-400">
                                    <FontAwesomeIcon icon={faKey} />
                                </span>
                                <input type="password" id="confirmPassword" placeholder="Enter password" value={form.confirmPassword} className="flex-1 p-2 outline-none"
                                        onChange={(e) =>
                                            setForm({ ...form, confirmPassword: e.target.value })
                                        }
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        Have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;