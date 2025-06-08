import { Doodles } from "@/widgets/marketing/components/doodles";
import { Text } from "@/widgets/marketing/components/leading";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Text />
      <Doodles />
    </div>
  );
}
 
export default HomePage;