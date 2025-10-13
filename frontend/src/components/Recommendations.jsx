/* eslint-disable react/prop-types */
import { Heart, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import fallbackImage from "../assets/product.jpeg";

const isValidUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch{
    return false;
  }
};

const Recommendations = ({ data }) => {
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    console.log("Recommendations data:", data);
  }, [data]);

  if (!Array.isArray(data) || data.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No recommendations yet.
      </p>
    );

  const toggleExpand = (userId) => {
    setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">User Recommendations</h2>

      {data.map((user) => (
        <div
          key={user.user_id}
          className="border border-gray-200 rounded-lg bg-white mb-6 shadow-sm"
        >
          <div
            className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => toggleExpand(user.user_id)}
          >
            <h3 className="font-semibold text-gray-900">{user.user_id}</h3>
            {expanded[user.user_id] ? <ChevronUp /> : <ChevronDown />}
          </div>

          {expanded[user.user_id] && Array.isArray(user.recommendations) && (
            <div className="p-4 space-y-4">
              {user.recommendations.map((rec, idx) => {
                const imageSrc =
                  rec.image && isValidUrl(rec.image.trim())
                    ? rec.image.trim()
                    : fallbackImage;

                return (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row gap-4 border rounded-lg p-4 hover:shadow transition-all"
                  >
                    <img
                      src={imageSrc}
                      alt={rec.name || "Product"}
                      onError={(e) => (e.target.src = fallbackImage)}
                      className="w-32 h-32 rounded-lg object-cover bg-gray-100"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{rec.name || "Unnamed Product"}</h4>
                          <p className="text-sm text-gray-500">
                            {rec.category || "Uncategorized"}
                          </p>
                        </div>
                        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="mt-3 border-t pt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <h5 className="font-semibold text-gray-800">
                            Why we recommend this:
                          </h5>
                        </div>
                        <p className="text-sm text-gray-600">
                          {rec.explanation || "Explanation not available for this product."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
