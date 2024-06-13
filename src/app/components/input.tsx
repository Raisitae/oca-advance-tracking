import React, { useState } from "react";

type InputProps = {
  label: string;
  type: string;
  onValueChange: (value: string) => void;
  validate: (value: string) => string;
  disabled?: boolean;
  placeholder?: string;
  classname?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  disabled = false,
  validate,
  onValueChange,
  classname,
}) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as string;
    onValueChange(newValue);
    setValue(newValue);
  };

  const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  };

  return (
    <div className={classname}>
      <label className="w-full text-s font-medium tracking-wide leading-4 dark:text-neutral-200 text-neutral-700">
        {label}
      </label>
      <input
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={{ color: "black" }}
        className={`justify-center items-start px-3 py-2 mt-1 w-full text-sm tracking-wide leading-5 bg-white rounded border border-solid border-slate-400 ${
          disabled ? "border-slate-400 text-slate-300" : ""
        } ${
          error
            ? "border-red-700 border-solid leading-[143%] text-zinc-600"
            : ""
        } hover:border-purple-600  active:border-purple-400 active:border-[3px] active:text-zinc-600
        focus:outline-purple-400 focus:border-[3px] focus:text-zinc-600
        placeholder:border-slate-400 placeholder:text-zinc-600
        `}
      />

      {error && (
        <div className="flex gap-2 pr-5 mt-1 text-red-700 leading-[160%]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe031e40bb30ed49ea3f5305af51f66a7f8f92c794b185a195bc668221e931ef?apiKey=c085105b203241559a71a96b7e16d29d&"
            className="shrink-0 self-start w-5 aspect-square"
            alt=""
          />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
