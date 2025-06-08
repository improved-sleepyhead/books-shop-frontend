import { Separator } from "@/shared/ui/kit/separator";
import { Content } from "@/widgets/resources/components/content";
import { Navbar } from "@/widgets/resources/components/navbar";
import { sections } from "@/widgets/resources/constants/terms-selections";
import { termsContent } from "@/widgets/resources/constants/terms-text";

const TermsPage = () => {
    return (
        <div className="flex min-h-screen bg-white rounded-3xl">
            <Navbar sections={sections}/>
            <main className="flex-1 py-10 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">Условия пользования</h1>
                {termsContent.map((section) => (
                    <Content key={section.id} {...section} />
                ))}
                <div className="px-7">
                    <Separator />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                    Используя приложение, вы подтверждаете, что ознакомились и согласны с данной политикой.
                </p>
            </main>
        </div>
    );
};
 
export default TermsPage;