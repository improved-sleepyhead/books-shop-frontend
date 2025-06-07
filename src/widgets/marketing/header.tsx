import { Button } from "@/shared/ui/kit/button"
import { Logo } from "@/shared/ui/logo"

export const Header = () => {
    return (
        <div className="flex items-center w-full h-16 justify-between p-5">
            <Logo />
            <div className="flex item-center justify-end gap-x-5">
                <Button variant="ghost" size="lg" className="hidden md:block">Войти</Button>
                <Button size="lg">Регистрация</Button>
            </div>
        </div>
    );
};