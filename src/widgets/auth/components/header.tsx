"use client"
import { Logo } from "@/shared/ui/logo"
import { Button } from "@/shared/ui/kit/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export const Header = () => {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in"
    return (
        <nav className="flex items-center w-full h-16 justify-between p-5">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex items-center justify-end gap-x-4">
                <Button variant="secondary" asChild>
                    <Link href="/">
                        <ArrowLeft/> На главную
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                        {isSignIn ? "Регестрация" : "Войти"}
                    </Link>
                </Button>
            </div>
        </nav>
    );
};