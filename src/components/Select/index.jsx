import React from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

function Select(props) {
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
    options,
    valueKey,
    valueName,
  } = props;

  const getOptionValue = (option) => {
    if (typeof valueKey === "string") {
      return option[valueKey];
    } else if (typeof valueKey === "function") {
      return valueKey(option);
    }
    return "";
  };

  const getOptionName = (option) => {
    if (typeof valueName === "string") {
      return option[valueName];
    } else if (typeof valueName === "function") {
      return valueName(option);
    }
    return "";
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
      <select
        disabled={disabled}
        type={type}
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
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={getOptionValue(option)} value={getOptionValue(option)}>
            {getOptionName(option)}
          </option>
        ))}
      </select>
      {state === "error" && (
        <FaExclamationCircle className="absolute right-3 top-1/2 translate-y-1/2 transform text-red-500" />
      )}
      {state === "success" && (
        <FaCheckCircle className="absolute right-3 top-1/2 translate-y-1/2 transform text-green-500" />
      )}
    </div>
  );
}

export default Select;
