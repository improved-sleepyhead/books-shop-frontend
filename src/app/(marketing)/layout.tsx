import { Footer } from "@/widgets/marketing/footer";
import { Header } from "@/widgets/marketing/header";

interface MainLayoutProps {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="flex flex-col items-center min-h-screen w-full relative">
            <Header />
            <div className="flex flex-grow items-center min-h-0 justify-center">
                {children}
            </div>
            <Footer />
        </main>
    );
};
 
export default MainLayout;