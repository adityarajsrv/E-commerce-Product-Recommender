import { FileUp, Database, Users } from 'lucide-react';
import { useState } from 'react';

const FileInput = () => {
  const [draggingSection, setDraggingSection] = useState(null);

  return (
    <div className="max-w-7xl mx-auto p-5 bg-white rounded-xl border-2 mb-5 border-gray-200 shadow-lg">
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Data Input</h1>
      </div>
      <div className="flex flex-row gap-12 justify-center">
        {/* Product Catalog Input */}
        <div className="flex-1 max-w-lg p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Product Catalog</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload CSV or JSON with: <span className="font-mono text-blue-600">id, name, price, category, image</span>
            </p>
            <label 
              className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${
                draggingSection === 'product' 
                  ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25 hover:shadow-md'
              }`}
              onDragEnter={() => setDraggingSection('product')}
              onDragLeave={() => setDraggingSection(null)}
            >
              <div className="relative">
                <FileUp className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              <div className="text-center space-y-2">
                <span className="text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  Choose File
                </span>
                <p className="text-xs text-gray-400">or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">CSV, JSON files accepted</p>
              </div>
              <input 
                type="file" 
                accept=".csv,.json" 
                className="hidden"
              />
            </label>
          </div>
        </div>
        {/* User Behavior Input */}
        <div className="flex-1 max-w-lg p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">User Behavior</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload CSV or JSON with: <span className="font-mono text-green-600">productId, action, timestamp</span>
            </p>
            <label 
              className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${
                draggingSection === 'user' 
                  ? 'border-green-500 bg-green-50 scale-105 shadow-lg' 
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-25 hover:shadow-md'
              }`}
              onDragEnter={() => setDraggingSection('user')}
              onDragLeave={() => setDraggingSection(null)}
            >
              <div className="relative">
                <FileUp className="w-12 h-12 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
              </div>
              <div className="text-center space-y-2">
                <span className="text-base font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  Choose File
                </span>
                <p className="text-xs text-gray-400">or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">CSV, JSON files accepted</p>
              </div>
              <input 
                type="file" 
                accept=".csv,.json" 
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInput;