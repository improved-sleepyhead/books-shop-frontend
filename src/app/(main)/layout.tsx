interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="min-h-screen w-full relative">
            <div className="flex flex-col items-center w-full">
                {children}
            </div>
        </main>
    );
}
 
export default MainLayout;