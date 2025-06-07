import Image from "next/image";

export const Doodles = () => {
    return (
        <div className="flex flex-row items-center justify-center w-full h-full">
            <div className="md:h-[300px] md:w-[400px] h-[200px] w-[300px] relative mt-4">
                <Image 
                    className="object-contain"
                    src="/reading-side.svg"
                    loading="lazy"
                    fill
                    alt="Doodle_1"
                />
            </div>
            <div className="md:h-[300px] md:w-[400px] h-[200px] w-[300px] relative hidden sm:block">
                <Image
                    className="object-contain"
                    src="/sitting-reading.svg"
                    loading="lazy"
                    fill
                    alt="Doodle_2"
                />
            </div>
        </div>
    );
};