import productImage from "../assets/product.jpeg";
import { Star, Heart, ShoppingBag, Shield } from "lucide-react";

const Recommendations = () => {
  const recommendations = [
    {
      id: 1,
      title: "Wireless Noise-Canceling Headphones",
      category: "Electronics",
      price: "$299.99",
      rating: 4.8,
      reviews: 1247,
      reason:
        "Based on your recent audio equipment purchases and listening habits",
    },
    {
      id: 2,
      title: "Professional Yoga Mat",
      category: "Fitness",
      price: "$89.99",
      rating: 4.6,
      reviews: 892,
      features: ["Non-slip Surface", "Eco-friendly", "Extra Thick"],
      reason: "Matches your fitness routine and preferred workout style",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Recommended For You
        </h1>
      </div>
      <div className="space-y-5">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-5 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
          >
            <div className="md:w-40 flex-shrink-0 flex justify-center">
              <div className="relative w-36 h-36">
                <img
                  src={productImage}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full cursor-pointer hover:bg-white shadow-sm">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-600" />
                </button>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h2>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {item.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      {item.price}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <h4 className="text-md font-semibold text-gray-900">
                    Why we recommend this ?
                  </h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 border bg-black border-gray-300 text-white rounded-lg cursor-pointer hover:scale-102 transition-colors text-sm">
          View More Recommendations
        </button>
      </div>
    </div>
  );
};

export default Recommendations;