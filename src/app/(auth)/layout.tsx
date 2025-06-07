import { Header } from "@/widgets/auth/components/header";

interface AuthLayoutProps {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="min-h-screen dark:bg-[#1F1F1F] bg-neutral-100">
            <div className="mx-auto max-w-screen-2xl p-4">
                <Header/>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-10">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;