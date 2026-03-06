import Hero from "@/components/Hero";
import Gallary from "@/components/Gallary";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Gallary />
    </div>
  );
}