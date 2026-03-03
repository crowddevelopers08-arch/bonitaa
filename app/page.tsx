import AppointmentSection from "@/component/about";
import HeroBanner from "@/component/banner";
import Navbar from "@/component/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroBanner />
    <AppointmentSection />
    </>
  );
}
