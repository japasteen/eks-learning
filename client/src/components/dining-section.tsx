import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DiningSection() {
  const restaurants = [
    {
      name: "Le Jardin",
      description: "Award-winning fine dining with seasonal menu and wine pairings",
      hours: "Open 6:00 PM - 11:00 PM",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      action: "Reserve",
    },
    {
      name: "The Terrace",
      description: "Casual all-day dining with international cuisine and outdoor seating",
      hours: "Open 6:00 AM - 11:00 PM",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      action: "View Menu",
    },
    {
      name: "Sky Lounge",
      description: "Rooftop bar with craft cocktails and stunning city views",
      hours: "Open 4:00 PM - 2:00 AM",
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      action: "Happy Hour",
    },
  ];

  return (
    <section id="dining" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-deep-blue mb-4">
            Exceptional Dining
          </h2>
          <p className="text-lg text-gray-600">
            Culinary experiences that delight every palate
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.name} className="overflow-hidden card-hover">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-bold text-deep-blue mb-2">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {restaurant.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-warm-orange font-semibold">
                    {restaurant.hours}
                  </span>
                  <Button className="bg-warm-orange hover:bg-warm-orange/90 text-white">
                    {restaurant.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
