import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-deep-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4 text-golden">
              Grand Luxe
            </h3>
            <p className="text-gray-300 mb-4">
              Experience luxury redefined at Grand Luxe Hotel, where every detail is crafted for your comfort and satisfaction.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-golden">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-golden">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-golden">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-golden">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-golden">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/rooms" className="text-gray-300 hover:text-white transition-colors">Rooms & Suites</a></li>
              <li><a href="#amenities" className="text-gray-300 hover:text-white transition-colors">Amenities</a></li>
              <li><a href="#dining" className="text-gray-300 hover:text-white transition-colors">Dining</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/booking" className="text-gray-300 hover:text-white transition-colors">Book Now</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-golden">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Concierge</span></li>
              <li><span className="text-gray-300">Room Service</span></li>
              <li><span className="text-gray-300">Spa & Wellness</span></li>
              <li><span className="text-gray-300">Airport Transfer</span></li>
              <li><span className="text-gray-300">Business Center</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-golden">Newsletter</h4>
            <p className="text-gray-300 mb-4">Stay updated with our latest offers and events</p>
            <form onSubmit={handleNewsletterSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-gray text-white border-none focus:ring-2 focus:ring-golden rounded-r-none"
              />
              <Button 
                type="submit" 
                className="bg-warm-orange hover:bg-warm-orange/90 rounded-l-none"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-gray mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 Grand Luxe Hotel. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
