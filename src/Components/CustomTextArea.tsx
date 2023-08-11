import React from "react";

interface CustomTextAreaProps {
  name: string;
  placeholder: string;
  value: string;
  className: string;
  onChange: (name: string, value: string) => void;
  style?: React.CSSProperties;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  name,
  placeholder,
  className,
  value,
  onChange,
  style,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    onChange(name, value);
  };

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={handleChange}
      style={style}
    />
  );
};

export default CustomTextArea;
