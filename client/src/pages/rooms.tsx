import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RoomCard from "@/components/room-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import type { Room } from "@shared/schema";

export default function Rooms() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [minGuests, setMinGuests] = useState("");

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const categories = [
    { id: "all", label: "All Rooms" },
    { id: "deluxe", label: "Deluxe" },
    { id: "suite", label: "Suites" },
    { id: "premium", label: "Premium" },
    { id: "family", label: "Family" },
  ];

  const filteredRooms = rooms?.filter(room => {
    const categoryMatch = selectedCategory === "all" || room.category === selectedCategory;
    const priceMatch = !maxPrice || parseFloat(room.price) <= parseFloat(maxPrice);
    const guestMatch = !minGuests || room.maxGuests >= parseInt(minGuests);
    
    return categoryMatch && priceMatch && guestMatch;
  }) || [];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-deep-blue mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our selection of luxuriously appointed accommodations
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-semibold text-deep-blue mb-2 block">
                Category
              </Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxPrice" className="text-sm font-semibold text-deep-blue mb-2 block">
                Max Price per Night
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Any price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="minGuests" className="text-sm font-semibold text-deep-blue mb-2 block">
                Min Guests
              </Label>
              <Input
                id="minGuests"
                type="number"
                placeholder="Any number"
                value={minGuests}
                onChange={(e) => setMinGuests(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setSelectedCategory("all");
                  setMaxPrice("");
                  setMinGuests("");
                }}
                variant="outline" 
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {isLoading ? "Loading..." : `${filteredRooms.length} rooms available`}
          </p>
        </div>

        {/* Room Grid */}
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
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
