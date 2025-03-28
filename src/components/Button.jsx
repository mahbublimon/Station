const Button = ({ text, onClick, className }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-primary text-white px-4 py-2 rounded ${className}`}
      >
        {text}
      </button>
    );
  };
  
  export default Button;  