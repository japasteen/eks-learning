import HeroSection from "@/components/hero-section";
import BookingForm from "@/components/booking-form";
import RoomCard from "@/components/room-card";
import AmenitiesSection from "@/components/amenities-section";
import DiningSection from "@/components/dining-section";
import ContactSection from "@/components/contact-section";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { Room } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    { id: "all", label: "All Rooms" },
    { id: "deluxe", label: "Deluxe" },
    { id: "suite", label: "Suites" },
    { id: "premium", label: "Premium" },
    { id: "family", label: "Family" },
  ];

  const filteredRooms = rooms?.filter(room => 
    selectedCategory === "all" || room.category === selectedCategory
  ) || [];

  return (
    <div className="pt-16">
      <HeroSection onBookingClick={scrollToBooking} />
      <BookingForm />
      
      {/* Room Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-deep-blue mb-4">
              Exquisite Accommodations
            </h2>
            <p className="text-lg text-gray-600">
              Discover our collection of luxuriously appointed rooms and suites
            </p>
          </div>

          {/* Room Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-warm-brown text-white"
                    : "bg-white text-deep-blue hover:bg-warm-brown hover:text-white"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            ) : (
              filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            )}
          </div>
        </div>
      </section>

      <AmenitiesSection />
      <DiningSection />
      <ContactSection />
    </div>
  );
}
