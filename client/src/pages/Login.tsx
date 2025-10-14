import { useState, type FormEvent } from "react";
import "../styles/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { login } from "../apis/UserApi";
import LoadingProcess from "../components/LoadingProcess.tsx";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {type User} from "../types/type.ts"
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        login: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ email: "", password: "", login: "" });

        try {
            const result = await dispatch(login({ email: email.trim(), password: password.trim() }));


            console.log("Login result:", result);



            if (login.rejected.match(result)) {
                toast.error("Invalid email or password");
                return;
            }

            const user: User = result.payload;
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("currentUser", JSON.stringify(user.id));



            if (login.fulfilled.match(result)) {
                toast.success("Login success!!");
                setTimeout(() => {
                    if (user.role === "admin") {
                        navigate("/categoryManagement");
                    } else {
                        navigate("/dashboard");
                    }
                }, 2000);
            }


        } catch (err) {
            console.error("Login error:", err);

            // Server error
            toast.error("Login failed!!");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
                <h1 className="text-center font-medium text-4xl bg-gray-50">Log In</h1>
                <p className="text-[#52525B] font-poppins text-[18px] font-normal leading-[30px] text-center mt-5 mb-8 max-w-md mx-auto">
                    QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ dàng thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh chóng và hiệu quả!
                </p>
                <div className="bg-white p-6 rounded-xl shadow-lg w-100">
                    {loading && <LoadingProcess />}
                    {errors.login && <div className="mb-4 text-red-600 text-sm">{errors.login}</div>}
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
                                <span className="px-3 text-gray-400">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 p-2 outline-none"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
                                <span className="px-3 text-gray-400">
                                    <FontAwesomeIcon icon={faKey} />
                                </span>
                                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 p-2 outline-none"/>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Log in
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account yet? <Link to="/" className="text-blue-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;