import { Logo } from "@/shared/ui/logo"
import { Button } from "@/shared/ui/kit/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const Header = () => {
    return (
        <nav className="flex items-center w-full h-16 justify-between p-5">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex items-center justify-end gap-x-4">
                <div className="flexx items-center justify-center hidden md:block">
                    <Button variant="secondary" asChild>
                        <Link href="/sign-up">
                            <ArrowLeft/> Вернуться
                        </Link>
                    </Button>
                </div>
                <Button asChild>
                    <Link href="/">
                        На главную
                    </Link>
                </Button>
            </div>
        </nav>
    );
};