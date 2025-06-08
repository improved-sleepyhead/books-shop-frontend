import { JwtPayload } from "@/shared/api/services/jwt/parse-jwt.service";
import { Button } from "@/shared/ui/kit/button"
import { Logo } from "@/shared/ui/logo"
import Link from "next/link";

export interface HeaderProps {
    user: JwtPayload | null
};

export const Header = ({user} : HeaderProps) => {
    return (
        <div className="flex items-center w-full h-16 justify-between pt-8 px-9">
            <Logo />
                {user?.id ? (
                    <Button size="lg" className="hidden md:block">
                        <Link href="/main">
                            Перейти в магазин
                        </Link>
                    </Button>
                ) : (
                    <div className="flex item-center justify-end gap-x-5">
                        <Button variant="ghost" size="lg" className="hidden md:block">
                            <Link href="/sign-in">
                                Войти
                            </Link>
                        </Button>
                        <Button size="lg" asChild>
                            <Link href="/sign-up">
                                Регистрация
                            </Link>
                        </Button>
                    </div>
                )}
        </div>
    );
};