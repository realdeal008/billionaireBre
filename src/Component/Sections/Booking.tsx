"use client";

import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { UserCheck, Wine, Car, Clock } from "lucide-react";
import morphShapeAnimation from "../morphShapeAnimation.json";

interface Service {
  name: string;
  price: number;
}

interface Stylist {
  name: string;
  specialty: string;
  image: string;
}

const services: { category: string; items: Service[] }[] = [
  {
    category: "Checklist",
    items: [
      { name: "Deep Conditioning only", price: 10 },
      { name: "Loc Repair", price: 20 },
      { name: "Basic Styling Only", price: 30 },
      { name: "Detox", price: 40 },
      { name: "Color End Only", price: 40 },
      { name: "Two Strand Twist Style Only", price: 50 },
      { name: "Color Full Hand", price: 60 },
      { name: "Shampoo Deep Condition set", price: 60 },
      { name: "Ponytail", price: 65 },
      { name: "Quick Weave", price: 70 },
      { name: "Basic Re-twist", price: 75 },
      { name: "Re-twist plus Basic Style", price: 85 },
      { name: "Wig Install", price: 85 },
      { name: "Stitch Braid 6-8", price: 85 },
      { name: "Re-twist two or three Strand Twist", price: 95  },
    ],
  },
  {
    category: "Luxury Treatments",
    items: [
      { name: "Starter", price: 100 },
      { name: "Sew in & Closure", price: 110 },
      { name: "Insta Locs", price: 300 },
      { name: "Locs Extension", price: 500 },
    ],
  },
];

const stylists: Stylist[] = [
  {
    name: "Antonio",
    specialty: "Red Carpet Specialist",
    image:
      "https://placeholder-image-service.onrender.com/image/150x120?prompt=Professional%20hairstylist%20with%20trendy%20haircut%20and%20black%20outfit&id=e350b910-31e2-407d-9c58-43d7a238e0dc",
  },
  {
    name: "Chloe",
    specialty: "Editorial Styling",
    image:
      "https://placeholder-image-service.onrender.com/image/150x120?prompt=Stylish%20female%20hairstylist%20with%20bold%20fashion%20sense&id=5ca18686-b5b2-49fe-88f5-da1d8f8dd810",
  },
];

const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:30 PM",
  "5:00 PM",
];

const vipOptions = [
  { icon: UserCheck, label: "Private Suite", price: 150 },
  { icon: Wine, label: "Champagne Service", price: 75 },
  { icon: Car, label: "Valet Parking", price: 35 },
  { icon: Clock, label: "After Hours", price: 200 },
];

export default function Booking() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedVip, setSelectedVip] = useState<string[]>([]);
  const [dateMin, setDateMin] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDateMin(`${yyyy}-${mm}-${dd}`);
  }, []);

  const toggleVip = (label: string) => {
    setSelectedVip((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label]
    );
  };

  const handleBooking = () => {
    if (!selectedService || !selectedStylist || !selectedTime) {
      alert("Please complete all selections before booking.");
      return;
    }
    alert("Your appointment has been successfully booked! 🎉");
  };

  return (
    <section className="bookingWrapper py-20 px-5 md:px-20 lg:px-40">
      {/* Overlay for contrast */}
      <div className="hero-overlay"></div>

      {/* Morphing Luxury Background as overlay */}
      <div className="booking-overlay">
        <Lottie
          animationData={morphShapeAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Booking Content */}
      <div className="bookingSection">
        {/* Services */}
        <div className="services">
          <h2 className="sectionTitle">Our Premium Services</h2>
          {services.map((cat) => (
            <div key={cat.category} className="serviceCategory">
              <h3>{cat.category}</h3>
              {cat.items.map((srv) => (
                <div
                  key={srv.name}
                  className={`serviceItem ${
                    selectedService?.name === srv.name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedService(srv)}
                >
                  <span className="serviceName">{srv.name}</span>
                  <span className="servicePrice">${srv.price}</span>
                </div>
              ))}
            </div>
          ))}

          {/* Stylists */}
          <h2 className="sectionTitle">Your Stylist Billionaire Bre</h2>
          <div className="stylists">
            {stylists.map((sty) => (
              <div
                key={sty.name}
                className={`stylist ${
                  selectedStylist?.name === sty.name ? "selected" : ""
                }`}
                onClick={() => setSelectedStylist(sty)}
              >
                <div
                  className="stylistImg"
                  style={{ backgroundImage: `url(${sty.image})` }}
                ></div>
                <div className="stylistInfo">
                  <div className="stylistName">{sty.name}</div>
                  <div className="stylistSpecialty">{sty.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bookingFormContainer">
          <h2 className="sectionTitle">Book Your Appointment</h2>

          <div className="formGroup">
            <label htmlFor="name">Your Name</label>
            <input id="name" className="formControl" type="text" />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email Address</label>
            <input id="email" className="formControl" type="email" />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" className="formControl" type="tel" />
          </div>

          <div className="formGroup">
            <label htmlFor="date">Select Date</label>
            <input
              id="date"
              className="formControl"
              type="date"
              min={dateMin}
            />
          </div>

          <div className="formGroup">
            <label>Select Time</label>
            <div className="timeSlots">
              {timeSlots.map((slot, idx) => (
                <div
                  key={slot}
                  className={`timeSlot ${
                    idx === 3 || idx === 7 ? "occupied" : ""
                  } ${selectedTime === slot ? "selected" : ""}`}
                  onClick={() =>
                    !(idx === 3 || idx === 7) && setSelectedTime(slot)
                  }
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>

          <div className="formGroup">
            <label>VIP Options</label>
            <div className="vipOptions">
              {vipOptions.map((vip) => (
                <div
                  key={vip.label}
                  className={`vipOption ${
                    selectedVip.includes(vip.label) ? "selected" : ""
                  }`}
                  onClick={() => toggleVip(vip.label)}
                >
                  <vip.icon size={24} />
                  <div>{vip.label}</div>
                  <small>+ ${vip.price}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="special-requests">Special Requests</label>
            <textarea
              id="special-requests"
              className="formControl"
              rows={3}
            ></textarea>
          </div>

          <button className="btnBook" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </section>
  );
}
