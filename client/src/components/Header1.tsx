import { useState } from "react";
import { Link } from "react-router-dom";

interface Header1Props {
    onLogout: () => void;
}

const Header1 = ({ onLogout }: Header1Props) => {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white h-14 flex items-center justify-between px-4 relative">
            <h3 className="text-xl sm:text-2xl font-bold">QuizForge</h3>

            <nav className="hidden md:flex">
                <ul className="flex gap-3">
                    <li>
                        <Link to="/categoryManagement" className="hover:text-gray-300">Category</Link>
                    </li>
                    <li>
                        <Link to="/testManagement" className="hover:text-gray-300">Test</Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={onLogout} className="hover:text-gray-300">Log out</Link>
                    </li>
                </ul>
            </nav>

            <button  onClick={() => setOpen(!open)} className="md:hidden flex w-[56px] h-[40px] px-[13px] py-[5px] justify-center items-center rounded-[6px] border border-white/10 bg-transparent cursor-pointer hover:bg-white/10 active:bg-white/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none"><path d="M1 1H23M1 9H23M1 17H23" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>

            {open && (
                <div className="absolute z-50 top-14 right-4 bg-gray-700 md:hidden rounded-lg shadow-lg">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <Link to="/categoryManagement" className="hover:text-gray-300" onClick={() => setOpen(false)}>Category</Link>
                        </li>
                        <li>
                            <Link to="/testManagement" className="hover:text-gray-300" onClick={() => setOpen(false)}>Test</Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={() => { onLogout(); setOpen(false); }} className="hover:text-gray-300">Log out</Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header1;
