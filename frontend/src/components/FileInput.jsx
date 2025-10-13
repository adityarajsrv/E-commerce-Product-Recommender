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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Header with FileUp icon */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileUp className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Data</h1>
        <p className="text-gray-500">Select your files to generate recommendations</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
        {/* Catalog Input */}
        <div className="flex-1 max-w-md border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <input 
            type="file" 
            id="catalog" 
            onChange={(e) => handleFileChange(e, "catalog")} 
            className="hidden" 
          />
          <label htmlFor="catalog" className="cursor-pointer block">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">Product Catalog</h2>
            <p className="text-sm text-gray-500 mb-3">Upload your product data file</p>
            <span className="text-blue-600 font-medium text-sm">
              {catalogFile ? catalogFile.name : "Choose file"}
            </span>
          </label>
        </div>

        {/* Behavior Input */}
        <div className="flex-1 max-w-md border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
          <input 
            type="file" 
            id="behavior" 
            onChange={(e) => handleFileChange(e, "behavior")} 
            className="hidden" 
          />
          <label htmlFor="behavior" className="cursor-pointer block">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">User Behavior</h2>
            <p className="text-sm text-gray-500 mb-3">Upload user interaction data</p>
            <span className="text-green-600 font-medium text-sm">
              {behaviorFile ? behaviorFile.name : "Choose file"}
            </span>
          </label>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleUpload}
          disabled={loading || !catalogFile || !behaviorFile}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-3 mx-auto font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Files...
            </>
          ) : (
            <>
              <FileUp className="w-5 h-5" />
              Generate Recommendations
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileInput;