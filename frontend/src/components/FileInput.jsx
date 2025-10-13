/* eslint-disable react/prop-types */
import { FileUp, Database, Users, Loader2 } from "lucide-react";
import { useState } from "react";

const FileInput = ({ onResults }) => {
  const [catalogFile, setCatalogFile] = useState(null);
  const [behaviorFile, setBehaviorFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "catalog") setCatalogFile(file);
    if (type === "behavior") setBehaviorFile(file);
  };

  const handleUpload = async () => {
    if (!catalogFile || !behaviorFile) {
      alert("Please upload both files!");
      return;
    }

    const formData = new FormData();
    formData.append("catalog", catalogFile);
    formData.append("behavior", behaviorFile);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onResults(data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to generate recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FileUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Upload Your Data
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
          Select your files to generate recommendations
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 border-2 border-dashed border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <input 
            type="file" 
            id="catalog" 
            onChange={(e) => handleFileChange(e, "catalog")} 
            className="hidden" 
            accept=".json,.csv,.txt"
          />
          <label htmlFor="catalog" className="cursor-pointer block">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
              Product Catalog
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
              Upload your product data file
            </p>
            <span className="text-blue-600 font-medium text-xs sm:text-sm block truncate px-2">
              {catalogFile ? catalogFile.name : "Choose file"}
            </span>
          </label>
        </div>
        <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 border-2 border-dashed border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
          <input 
            type="file" 
            id="behavior" 
            onChange={(e) => handleFileChange(e, "behavior")} 
            className="hidden" 
            accept=".json,.csv,.txt"
          />
          <label htmlFor="behavior" className="cursor-pointer block">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
            </div>
            <h2 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
              User Behavior
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
              Upload user interaction data
            </p>
            <span className="text-green-600 font-medium text-xs sm:text-sm block truncate px-2">
              {behaviorFile ? behaviorFile.name : "Choose file"}
            </span>
          </label>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleUpload}
          disabled={loading || !catalogFile || !behaviorFile}
          className="cursor-pointer w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 mx-auto font-medium text-sm sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Processing Files...</span>
            </>
          ) : (
            <>
              <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Generate Recommendations</span>
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 mt-3 sm:hidden">
          Supported formats: JSON, CSV
        </p>
      </div>
    </div>
  );
};

export default FileInput;