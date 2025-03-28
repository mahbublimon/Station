import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Create an Account
          </h2>
          <InputField label="Email" type="email" />
          <InputField label="Display Name" type="text" />
          <InputField label="Username" type="text" />
          <InputField label="Password" type="password" />
          <InputField label="Date of Birth" type="date" />
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">
              Receive updates and tips
            </span>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded">
            Continue
          </button>
          <div className="text-center mt-4">
            <span>Already have an account?</span>{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;