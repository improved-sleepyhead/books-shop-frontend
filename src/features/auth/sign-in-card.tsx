"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Separator } from "@/shared/ui/kit/separator";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/kit/form";
import Link from "next/link";
import { authService } from "@/shared/api/services/auth.service";

const formSchema = z.object({
    name: z.string(),
    email: z.string().trim().min(1, "Необходимое поле").email("Неверный email"),
    password: z.string().min(1, "Необходимое поле"),
});

export const SignInCard = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          name: "",
          password: "",
        },
      });
    
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const promise = authService.main('login', values)
            .then(() => {
          form.reset();
          router.push("/");
        });
    
        toast.promise(promise, {
          loading: "Вход в систему...",
          success: "Успешный вход!",
          error: (error) => error?.response?.data?.message || "Ошибка входа",
        });
      };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none gap-0">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">С возвращением!</CardTitle>
            </CardHeader>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            Войти
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-5 flex items-center justify-center text-sm">
                <p>Еще нет аккаунта?</p>
                <Link href="/sign-up">
                    <span className="text-custom-pink px-2">Зарегистрироваться</span>
                </Link>
            </CardContent>
        </Card>
    );
};
