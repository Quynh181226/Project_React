import { Button } from 'antd';

interface HeroSectionProps {
    onRandomQuiz: () => void;
}
const HeroSection = ({onRandomQuiz}: HeroSectionProps) => {
    return (
        <section className="bg-[#4A3DB5] text-center pt-8 pb-6">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-5">
                Let's try a random puzzle 🎲
            </h2>
            <Button type="primary" onClick={onRandomQuiz} className="!bg-yellow-400 !text-black hover:!bg-yellow-500">
                Play
            </Button>
        </section>
    );
};

export default HeroSection;