import Gallery from "@/Component/Sections/Gallery";
import Navbar from "../Component/Navbar"
import Hero from "../Component/Sections/Hero";
import Booking from "@/Component/Sections/Booking";
import Footer from "@/Component/Sections/Footer";
import Luxury3DBackground from "../Component/Luxury3DBackground";

export default function Home() {
  return (
    <Luxury3DBackground>
      <Navbar/>
      <Hero/>
      <Gallery/>
      <Booking/>
      <Footer/>
    </Luxury3DBackground>
  );
}
