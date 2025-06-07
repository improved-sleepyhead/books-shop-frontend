import { Doodles } from "@/widgets/marketing/doodles";
import { Text } from "@/widgets/marketing/text";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Text />
      <Doodles />
    </div>
  );
}
 
export default HomePage;