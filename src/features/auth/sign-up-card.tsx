"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Separator } from "@/shared/ui/kit/separator";
import { Button } from "@/shared/ui/kit/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/kit/form";
import { authService } from "@/shared/api/services/auth.service";

const formSchema = z.object({
    name: z.string().trim().min(1, "Введите имя"),
    email: z.string().email("Неверный email"),
    password: z.string().min(8, "Минимум 8 символов"),
});

export const SignUpCard = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const promise = authService.main('register', values)
                .then(() => {
            form.reset();
            router.push("/");
        });
        
        toast.promise(promise, {
            loading: "Регистрация аккаунта...",
            success: "Успешная регистрация!",
            error: (error) => error?.response?.data?.message || "Ошибка регистрации",
        });
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none gap-0">
            <CardHeader className="flex flex-col items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Регистрация</CardTitle>
                <CardDescription>
                    Регистрируясь, вы принимаете нашу {" "}
                    <Link href="/privacy">
                        <span className="text-custom-pink">Политику Конфиденциальности</span>{" "}
                    </Link>
                    и {" "}
                    <Link href="/terms">
                        <span className="text-custom-pink">Условия Пользования</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Введите ваше имя" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Введите email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Введите пароль" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">
                            Зарегистрироваться
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-5 flex items-center justify-center text-sm">
                <p>Уже есть аккаунт?</p>
                <Link href="/sign-in">
                    <span className="text-custom-pink px-2">Войти</span>
                </Link>
            </CardContent>
        </Card>
    );
};
