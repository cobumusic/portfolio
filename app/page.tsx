import Nav from "../src/components/Nav/Nav";
import HeroSection from "../src/components/sections/HeroSection/HeroSection";
import AboutSection from "../src/components/sections/AboutSection/AboutSection";
import ExperienceSection from "../src/components/sections/ExperienceSection/ExperienceSection";
import SkillsSection from "../src/components/sections/SkillsSection/SkillsSection";
import WorkSection from "../src/components/sections/WorkSection/WorkSection";
import ContactSection from "../src/components/sections/ContactSection/ContactSection";
import Footer from "../src/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
