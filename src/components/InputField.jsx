const InputField = ({ label, type, placeholder }) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="text-gray-700">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-primary"
        />
      </div>
    );
  };
  
  export default InputField;  