export default function AmenitiesSection() {
  const amenities = [
    {
      name: "Infinity Pool",
      description: "Rooftop infinity pool with panoramic city views",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      name: "Luxury Spa",
      description: "Full-service spa with world-class treatments",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      name: "Fitness Center",
      description: "State-of-the-art fitness facility with personal trainers",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
    {
      name: "Concierge",
      description: "24/7 concierge service for personalized assistance",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    },
  ];

  return (
    <section id="amenities" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-deep-blue mb-4">
            World-Class Amenities
          </h2>
          <p className="text-lg text-gray-600">
            Every detail designed for your comfort and convenience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity) => (
            <div key={amenity.name} className="text-center p-6">
              <img 
                src={amenity.image} 
                alt={amenity.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-playfair font-bold text-deep-blue mb-2">
                {amenity.name}
              </h3>
              <p className="text-gray-600">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
