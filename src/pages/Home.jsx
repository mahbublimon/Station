import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-primary">Welcome to Station</h1>
        <p className="text-gray-700 mt-4">
          The next-gen social gaming platform.
        </p>
        <Link to="/signup">
          <button className="bg-primary text-white px-6 py-3 mt-6 rounded">
            Open Station in Your Browser
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;