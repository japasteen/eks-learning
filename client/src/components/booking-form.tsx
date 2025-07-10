import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { Room } from "@shared/schema";

export default function BookingForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [rooms, setRooms] = useState("1");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const availabilityMutation = useMutation({
    mutationFn: async (data: {
      checkIn: string;
      checkOut: string;
      guests: number;
      rooms: number;
    }) => {
      const response = await apiRequest("POST", "/api/availability", data);
      return response.json() as Promise<Room[]>;
    },
    onSuccess: (availableRooms) => {
      if (availableRooms.length > 0) {
        toast({
          title: "Rooms Available!",
          description: `Found ${availableRooms.length} available rooms for your dates.`,
        });
        setLocation("/rooms");
      } else {
        toast({
          title: "No Rooms Available",
          description: "Sorry, no rooms are available for your selected dates. Please try different dates.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to check availability. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing Information",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    availabilityMutation.mutate({
      checkIn,
      checkOut,
      guests: parseInt(guests),
      rooms: parseInt(rooms),
    });
  };

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-deep-blue mb-4">
            Reserve Your Perfect Stay
          </h2>
          <p className="text-lg text-gray-600">
            Select your dates and preferences for an unforgettable experience
          </p>
        </div>
        
        <Card className="booking-card rounded-2xl shadow-xl max-w-5xl mx-auto">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              <div className="lg:col-span-1 xl:col-span-1">
                <Label htmlFor="checkIn" className="block text-sm font-semibold text-deep-blue mb-2">
                  Check-in
                </Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="lg:col-span-1 xl:col-span-1">
                <Label htmlFor="checkOut" className="block text-sm font-semibold text-deep-blue mb-2">
                  Check-out
                </Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  min={checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="lg:col-span-1 xl:col-span-1">
                <Label className="block text-sm font-semibold text-deep-blue mb-2">
                  Guests
                </Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5 Guests</SelectItem>
                    <SelectItem value="6">6 Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-1 xl:col-span-1">
                <Label className="block text-sm font-semibold text-deep-blue mb-2">
                  Rooms
                </Label>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger className="focus:ring-2 focus:ring-warm-orange focus:border-transparent">
                    <SelectValue placeholder="Rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-2 xl:col-span-2 flex items-end">
                <Button 
                  type="submit" 
                  disabled={availabilityMutation.isPending}
                  className="w-full bg-warm-orange hover:bg-warm-orange/90 text-white px-6 py-3 text-lg font-semibold h-auto transform hover:scale-105 transition-all"
                >
                  {availabilityMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Availability
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
