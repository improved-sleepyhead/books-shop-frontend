import { parseJwt } from "@/shared/api/services/jwt/parse-jwt.service";
import { Footer } from "@/widgets/marketing/components/footer";
import { Header } from "@/widgets/marketing/components/header";
import { cookies } from "next/headers";

interface MainLayoutProps {
    children: React.ReactNode;
};

const MainLayout = async ({ children }: MainLayoutProps) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value
    const user = token ? parseJwt(token) : null
    
    return (
        <main className="flex flex-col items-center min-h-screen w-full relative">
            <Header user={user}/>
            <div className="flex flex-grow items-center min-h-0 justify-center">
                {children}
            </div>
            <Footer />
        </main>
    );
};
 
export default MainLayout;