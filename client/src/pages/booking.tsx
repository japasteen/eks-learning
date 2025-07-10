import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, CreditCard, Loader2, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Room } from "@shared/schema";

export default function Booking() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
  });
  const [step, setStep] = useState(1); // 1: Select Room, 2: Guest Details, 3: Confirmation
  const { toast } = useToast();

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      setStep(3);
      toast({
        title: "Booking Confirmed!",
        description: "Your reservation has been successfully created.",
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    if (selectedRoom) {
      const nights = calculateNights();
      return nights * parseFloat(selectedRoom.price);
    }
    return 0;
  };

  const handleBookingSubmit = () => {
    if (!selectedRoom) return;

    const nights = calculateNights();
    const totalPrice = calculateTotal();

    bookingMutation.mutate({
      roomId: selectedRoom.id,
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: parseInt(bookingData.guests),
      totalPrice: totalPrice.toString(),
    });
  };

  if (step === 3) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-playfair font-bold text-deep-blue mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for choosing Grand Luxe Hotel. Your reservation has been confirmed.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-deep-blue mb-4">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Guest:</strong> {bookingData.guestName}
                  </div>
                  <div>
                    <strong>Email:</strong> {bookingData.guestEmail}
                  </div>
                  <div>
                    <strong>Room:</strong> {selectedRoom?.name}
                  </div>
                  <div>
                    <strong>Guests:</strong> {bookingData.guests}
                  </div>
                  <div>
                    <strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Button onClick={() => window.location.href = "/"} className="bg-warm-orange hover:bg-warm-orange/90">
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-blue mb-4">
            Complete Your Booking
          </h1>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className={`flex items-center ${step >= 1 ? 'text-warm-orange' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-warm-orange text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2">Select Room</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-warm-orange' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-warm-orange text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2">Guest Details</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label>Number of Guests</Label>
                    <Select value={bookingData.guests} onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    {isLoading ? (
                      [...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                      ))
                    ) : (
                      rooms?.map((room) => (
                        <Card 
                          key={room.id} 
                          className={`cursor-pointer transition-all ${selectedRoom?.id === room.id ? 'ring-2 ring-warm-orange' : 'hover:shadow-md'}`}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <img src={room.imageUrl} alt={room.name} className="w-20 h-20 object-cover rounded" />
                              <div className="flex-1">
                                <h3 className="font-semibold text-deep-blue">{room.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary">{room.category}</Badge>
                                  <span className="text-sm text-gray-600">
                                    <Users className="inline h-3 w-3 mr-1" />
                                    Up to {room.maxGuests} guests
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-warm-orange">${room.price}</div>
                                <div className="text-sm text-gray-600">per night</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>

                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!selectedRoom || !bookingData.checkIn || !bookingData.checkOut}
                    className="w-full mt-6 bg-warm-orange hover:bg-warm-orange/90"
                  >
                    Continue to Guest Details
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="guestName">Full Name *</Label>
                      <Input
                        id="guestName"
                        value={bookingData.guestName}
                        onChange={(e) => setBookingData(prev => ({ ...prev, guestName: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="guestEmail">Email Address *</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        value={bookingData.guestEmail}
                        onChange={(e) => setBookingData(prev => ({ ...prev, guestEmail: e.target.value }))}
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="guestPhone">Phone Number</Label>
                      <Input
                        id="guestPhone"
                        type="tel"
                        value={bookingData.guestPhone}
                        onChange={(e) => setBookingData(prev => ({ ...prev, guestPhone: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleBookingSubmit}
                      disabled={!bookingData.guestName || !bookingData.guestEmail || bookingMutation.isPending}
                      className="flex-1 bg-warm-orange hover:bg-warm-orange/90"
                    >
                      {bookingMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRoom && (
                  <div className="space-y-4">
                    <div>
                      <img src={selectedRoom.imageUrl} alt={selectedRoom.name} className="w-full h-32 object-cover rounded" />
                      <h3 className="font-semibold text-deep-blue mt-2">{selectedRoom.name}</h3>
                    </div>

                    {bookingData.checkIn && bookingData.checkOut && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Check-in:</span>
                          <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-out:</span>
                          <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guests:</span>
                          <span>{bookingData.guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nights:</span>
                          <span>{calculateNights()}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-warm-orange">${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
