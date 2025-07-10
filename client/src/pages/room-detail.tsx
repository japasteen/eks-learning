import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star, Users, Bed, Wifi, Coffee, Car, Utensils } from "lucide-react";
import type { Room } from "@shared/schema";

export default function RoomDetail() {
  const { id } = useParams();
  
  const { data: room, isLoading, error } = useQuery<Room>({
    queryKey: [`/api/rooms/${id}`],
    enabled: !!id,
  });

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Room not found</h1>
            <Link href="/rooms">
              <Button>Back to Rooms</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) return null;

  const amenityIcons: { [key: string]: any } = {
    "King Bed": Bed,
    "Queen Bed": Bed,
    "Twin Beds": Bed,
    "WiFi": Wifi,
    "High-Speed WiFi": Wifi,
    "Premium WiFi": Wifi,
    "Mini Bar": Coffee,
    "Room Service": Utensils,
    "Valet Parking": Car,
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/rooms">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rooms
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Room Image */}
          <div>
            <img 
              src={room.imageUrl} 
              alt={room.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Room Details */}
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2 capitalize">
                {room.category}
              </Badge>
              <h1 className="text-3xl font-playfair font-bold text-deep-blue mb-2">
                {room.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-golden">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Up to {room.maxGuests} guests</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {room.description}
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-deep-blue mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Coffee;
                  return (
                    <div key={amenity} className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-warm-orange" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-warm-orange">
                      ${room.price}
                    </div>
                    <div className="text-gray-600">per night</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="text-lg font-semibold text-deep-blue">
                      Best Rate Guaranteed
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link href="/booking" className="block">
                    <Button className="w-full bg-warm-orange hover:bg-warm-orange/90 text-white py-3 text-lg">
                      Book This Room
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Check Availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-deep-blue mb-3">Check-in / Check-out</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Check-in: 3:00 PM</div>
                <div>Check-out: 11:00 AM</div>
                <div>Early check-in subject to availability</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-deep-blue mb-3">Policies</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Free cancellation until 24 hours before arrival</div>
                <div>No smoking in rooms</div>
                <div>Pets allowed with additional fee</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-deep-blue mb-3">Additional Services</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>24/7 Room Service</div>
                <div>Daily Housekeeping</div>
                <div>Concierge Service</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
