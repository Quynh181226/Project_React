import { Input } from "antd";
import {type ChangeEvent, useCallback, useState} from "react";
import { Link } from "react-router-dom";
import {debounce} from "lodash"

interface HeaderProps {
    onLogout: () => void;
    onSearch?: (text: string) => void;
}

const Header = ({  onLogout, onSearch }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const debouncedSearch = useCallback(debounce((val: string) => {
        if(onSearch) onSearch(val)
    }, 500), [onSearch])

    const handleChange=(e: ChangeEvent<HTMLInputElement>) => {
        const val=e.target.value;
        setSearch(val);
        debouncedSearch(val);
    }
    return (
        // <header className="bg-gray-800 text-white h-14 flex items-center justify-between px-4 relative">
        <header className="bg-gray-800 text-white h-14 flex items-center justify-between px-4 relative">
            <h3 className="text-xl sm:text-2xl font-bold">QuizForge</h3>
            <div className="flex-1 max-w-3xs md:max-w-sm lg:max-w-lg">
                <Input value={search} onChange={handleChange} placeholder="Search for test"/>
            </div>

            <nav className="hidden sm:flex">
                <ul className="flex gap-5">
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={onLogout} className="hover:text-gray-300">
                            Log out
                        </Link>
                    </li>
                </ul>
            </nav>

            <button onClick={() => setOpen(!open)} className="sm:hidden flex w-[56px] h-[40px] px-[13px] py-[5px] justify-center items-center rounded-[6px] border border-white/10 bg-transparent cursor-pointer hover:bg-white/10 active:bg-white/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill="none"><path d="M1 1H23M1 9H23M1 17H23" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>

            {open && (
                <div className="absolute top-14 right-4 bg-gray-700 sm:hidden rounded-lg shadow-lg">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <Link to="/dashboard" className="hover:text-gray-300" onClick={() => setOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={() => { onLogout(); setOpen(false); }} className="hover:text-gray-300">
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;