import Link from "next/link"
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <div className="flex flex-row items-center justify-center w-full gap-x-2 p-3">
            <Link href="https://github.com/improved-sleepyhead"><FaGithub/></Link>
            <p className="text-sm text-end md:text-center">Все права защищены @improved-sleepyhead</p>
        </div>
    );
};