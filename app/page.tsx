import AppointmentSection from "@/component/about";
import HeroBanner from "@/component/banner";
import FaqSection from "@/component/faqsection";
import Footer from "@/component/footer";
import HairSolutions from "@/component/hairsolutions";
import MobileActionBar from "@/component/mobile-bar";
import Navbar from "@/component/navbar";
import PopupAd from "@/component/popadds";
import ReviewsSection from "@/component/reviewsection";
import TransformationsSection from "@/component/transformationssection";
import TreatmentsSection from "@/component/treatmentssection";
import WhyBonitaa from "@/component/whybonita";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroBanner />
    <AppointmentSection />
    <WhyBonitaa />
    <TransformationsSection />
    <TreatmentsSection />
    <HairSolutions />
    <ReviewsSection />
    <FaqSection />
    <Footer  />
    <MobileActionBar  />
    <PopupAd />
    
    </>
  );
}
