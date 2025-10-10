import FileInput from "../components/FileInput"
import Navbar from "../components/Navbar"
import Recommendations from "../components/Recommendations"

const Home = () => {
  return (
    <div>
        <Navbar />
        <FileInput />
        <Recommendations />
    </div>
  )
}

export default Home