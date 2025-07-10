import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link } from "wouter";
import type { Room } from "@shared/schema";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <img 
        src={room.imageUrl} 
        alt={room.name}
        className="w-full h-64 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-2xl font-playfair font-bold text-deep-blue mb-2">
          {room.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {room.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-warm-orange">
            ${room.price}/night
          </div>
          <div className="flex items-center text-golden">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="bg-gray-100 text-gray-800">
              {amenity}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Link href={`/rooms/${room.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link href="/booking" className="flex-1">
            <Button className="w-full bg-warm-orange hover:bg-warm-orange/90 text-white">
              Select Room
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
