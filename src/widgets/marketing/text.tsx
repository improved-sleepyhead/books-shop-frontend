import { Button } from "@/shared/ui/kit/button";
import { ArrowRight } from "lucide-react";

export const Text = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center gap-y-6 w-full  px-6">
                <h1 className="font-extrabold text-2xl md:text-4xl lg:text-5xl text-center md:w-2/3">
                    Погрузитесь в океан историй — ваша идеальная книга ждёт вас <br className="hidden lg:block"/> здесь и <span className="underline">сейчас.</span>
                </h1>
                <p className="font-bold text-lg md:text-xl lg:text-2xl md:w-2/3 lg:w-1/3 text-center">
                    Выберите книгу, оформите заказ и погрузитесь в историю за считанные минуты!
                </p>
                <Button className="h-9 lg:h-10 w-32">
                    В каталог <ArrowRight />
                </Button>
            </div>
        </div>
    );
};