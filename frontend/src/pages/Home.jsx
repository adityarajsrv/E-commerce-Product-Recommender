import { useState } from "react";
import Navbar from "../components/Navbar";
import FileInput from "../components/FileInput";
import Recommendations from "../components/Recommendations";

const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <Navbar />
      <FileInput onResults={setResults} />
      <Recommendations data={results} />
    </div>
  );
};

export default Home;
