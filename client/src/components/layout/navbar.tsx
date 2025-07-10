import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/rooms", label: "Rooms" },
    { href: "/booking", label: "Book Now" },
    { href: "#amenities", label: "Amenities" },
    { href: "#dining", label: "Dining" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location === "/" && sectionId.startsWith("#")) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-playfair font-bold text-warm-brown cursor-pointer">
                Grand Luxe
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  if (link.href.startsWith("#")) {
                    scrollToSection(link.href);
                  } else {
                    window.location.href = link.href;
                  }
                }}
                className="text-deep-blue hover:text-warm-brown px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <h2 className="text-xl font-playfair font-bold text-warm-brown mb-4">
                    Grand Luxe
                  </h2>
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => {
                        if (link.href.startsWith("#")) {
                          scrollToSection(link.href);
                        } else {
                          window.location.href = link.href;
                        }
                        setIsOpen(false);
                      }}
                      className="text-deep-blue hover:text-warm-brown px-3 py-2 text-lg font-medium transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
