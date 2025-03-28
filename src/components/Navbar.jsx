import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Station</h1>
      <Link to="/login" className="bg-secondary px-4 py-2 rounded">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;