import { Content } from "@/widgets/resources/components/content";
import { Navbar } from "@/widgets/resources/components/navbar";
import { privacyContent } from "@/widgets/resources/constants/privacy-text";


const PrivacyPage = () => {
    return (
        <div className="flex min-h-screen bg-white rounded-3xl">
            <Navbar />
            <main className="flex-1 py-10 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">Политика конфиденциальности</h1>
                {privacyContent.map((section) => (
                    <Content key={section.id} {...section} />
                ))}
            </main>
        </div>
    );
};

export default PrivacyPage;