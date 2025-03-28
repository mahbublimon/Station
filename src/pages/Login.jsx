import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Welcome Back
          </h2>
          <InputField label="Email or Phone Number" type="text" />
          <div className="text-right text-sm text-blue-500 mb-4">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded">
            Login
          </button>
          <div className="text-center mt-4">
            <span>Need an account?</span>{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;