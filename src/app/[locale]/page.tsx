import Hero from '@/components/sections/Hero';
import ServiceShowcase from '@/components/sections/ServiceShowcase';
import ValueProposition from '@/components/sections/ValueProposition';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Hero />
      <ServiceShowcase />
      <ValueProposition />
      <Contact />
    </div>
  );
}
