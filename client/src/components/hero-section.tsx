import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onBookingClick: () => void;
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
            Experience Luxury{" "}
            <span className="text-golden">Redefined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Indulge in unparalleled comfort and elegance at Grand Luxe Hotel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onBookingClick}
              className="bg-warm-orange hover:bg-warm-orange/90 text-white px-8 py-4 text-lg font-semibold h-auto transform hover:scale-105 transition-all"
            >
              Book Your Stay
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-deep-blue px-8 py-4 text-lg font-semibold h-auto transition-all"
            >
              Virtual Tour
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white h-8 w-8" />
      </div>
    </section>
  );
}
