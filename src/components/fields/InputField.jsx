// Custom components
import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    value,
    onChange,
    name,
  } = props;
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  

  return (
    <div className={`${extra} relative`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <input
        disabled={disabled}
        type={showPassword ? "text" : type}
        id={id}
        placeholder={placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
        name={name}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 translate-y-1/2 transform items-center text-gray-600 focus:outline-none"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
      {state === "error" && (
        <FaExclamationCircle className="absolute right-3 top-1/2 translate-y-1/2 transform text-red-500" />
      )}
      {state === "success" && (
        <FaCheckCircle className="absolute right-3 top-1/2 translate-y-1/2 transform text-green-500" />
      )}
    </div>
  );
}

export default InputField;
