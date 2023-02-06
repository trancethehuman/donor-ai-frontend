import { useEffect } from "react";
import "./Settings.css";

const SettingDropdown = ({ label, options, onChange }) => {
  const onChangeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="sub-setting">
      <label>{label}</label>
      <select
        className="input-field dropdown"
        onChange={onChangeHandler}
        defaultValue={0}
      >
        <option key={0} value="0" disabled></option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingDropdown;
