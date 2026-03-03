import AppointmentSection from "@/component/about";
import HeroBanner from "@/component/banner";
import HairSolutions from "@/component/hairsolutions";
import Navbar from "@/component/navbar";
import WhyBonitaa from "@/component/whybonita";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroBanner />
    <AppointmentSection />
    <WhyBonitaa />
    <HairSolutions />
    </>
  );
}
