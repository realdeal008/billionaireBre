import Gallery from "@/Component/Sections/Gallery";
import Navbar from "../Component/Navbar"
import Hero from "../Component/Sections/Hero";
import Booking from "@/Component/Sections/Booking";
import Footer from "@/Component/Sections/Footer";

export default function Home() {
  return (
    <div>
       <Navbar/>
       <Hero/>
       <Gallery/>
       <Booking/>
       <Footer/>
    </div>
  );
}
