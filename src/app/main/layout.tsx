interface MainLayoutProps {
    children: React.ReactNode;
};

const MainLayout = async ({ children }: MainLayoutProps) => {
    return (
        <main className="flex flex-col items-center min-h-screen w-full relative">
            {/* <Header /> */}
            <div className="flex flex-grow items-center min-h-0 justify-center">
                {children}
            </div>
        </main>
    );
};
 
export default MainLayout;