import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <nav className='h-[60px] w-full bg-gray-900 text-white p-3 flex items-center justify-between px-6'>
            <Link to="/">
                <h1 className="font-bold select-none text-lg p-2 border border-transparent hover:border-white rounded-sm">WD Compiler</h1>
            </Link>
            <ul>
                <li>
                    <Link to="/compiler">
                       <Button variant="secondary" className="p-5 text-lg font-medium">Compiler</Button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
