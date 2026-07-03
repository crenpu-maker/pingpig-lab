import { HeroSection } from "@/components/HeroSection";
import { StartPortal } from "@/components/StartPortal";

export default function HomePage() {
  return (
    <>
      <StartPortal />
      <div id="sections" className="scroll-mt-24 bg-[#030712]">
        <HeroSection />
      </div>
    </>
  );
}
