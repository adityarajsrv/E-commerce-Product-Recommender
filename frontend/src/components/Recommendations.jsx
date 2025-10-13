/* eslint-disable react/prop-types */
import { Shield, ChevronDown, ChevronUp, Star, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import fallbackImage from "../assets/product.jpeg";

const isValidUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch {
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
      <div className="max-w-7xl mx-auto mt-6 sm:mt-8 px-4">
        <p className="text-center text-gray-500 text-sm sm:text-base py-8 sm:py-12">
          No recommendations yet. Upload your data to get started.
        </p>
      </div>
    );

  const toggleExpand = (userId) => {
    setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 sm:mt-10 px-3 sm:px-4 lg:px-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          User Recommendations
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Click on each user to view their personalized recommendations
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {data.map((user) => (
          <div
            key={user.user_id}
            className="border border-gray-200 rounded-lg sm:rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleExpand(user.user_id)}
              className="w-full flex justify-between items-center p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg sm:rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {user.user_id}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {Array.isArray(user.recommendations) 
                      ? `${user.recommendations.length} recommendations`
                      : 'No recommendations'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expanded[user.user_id] ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                )}
              </div>
            </button>
            {expanded[user.user_id] && Array.isArray(user.recommendations) && (
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {user.recommendations.map((rec, idx) => {
                  const imageSrc =
                    rec.image && isValidUrl(rec.image.trim())
                      ? rec.image.trim()
                      : fallbackImage;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 border rounded-lg p-3 sm:p-4 hover:shadow transition-all bg-white"
                    >
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={imageSrc}
                          alt={rec.name || "Product"}
                          onError={(e) => (e.target.src = fallbackImage)}
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-lg object-cover bg-gray-100"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2 sm:mb-3">
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                              {rec.name || "Unnamed Product"}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              {rec.category || "Uncategorized"}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs">
                            {rec.score && (
                              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                                <Star className="w-3 h-3 text-blue-600" />
                                <span className="text-blue-700 font-medium">
                                  Score: {typeof rec.score === 'number' ? rec.score.toFixed(2) : rec.score}
                                </span>
                              </div>
                            )}
                            {rec.pop_score && (
                              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                                <TrendingUp className="w-3 h-3 text-green-600" />
                                <span className="text-green-700 font-medium">
                                  Popular: {typeof rec.pop_score === 'number' ? rec.pop_score.toFixed(2) : rec.pop_score}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="border-t pt-2 sm:pt-3">
                          <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                            <h5 className="font-semibold text-gray-800 text-sm sm:text-base">
                              Why we recommend this:
                            </h5>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {rec.explanation || "Explanation not available for this product."}
                          </p>
                        </div>
                        {rec.reason_features && Array.isArray(rec.reason_features) && rec.reason_features.length > 0 && (
                          <div className="mt-2 sm:mt-3">
                            <p className="text-xs text-gray-500 mb-1">Key features:</p>
                            <div className="flex flex-wrap gap-1">
                              {rec.reason_features.slice(0, 3).map((feature, featureIdx) => (
                                <span
                                  key={featureIdx}
                                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;