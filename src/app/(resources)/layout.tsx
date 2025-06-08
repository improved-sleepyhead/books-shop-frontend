import { Footer } from "@/widgets/marketing/components/footer";
import { Header } from "@/widgets/resources/components/header";

interface AuthLayoutProps {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="flex flex-col items-center min-h-screen w-full relative bg-neutral-100">
            <div className="flex items-center w-full p-4">
                <Header/>
            </div>
            <div className="flex flex-col flex-grow min-h-0 items-center justify-center p-4">
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default AuthLayout;