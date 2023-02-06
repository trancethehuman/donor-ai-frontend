import "./Settings.css";

const SettingDropdown = ({ label, placeholder, options }) => {
  return (
    <div className="sub-setting">
      <label>{label}</label>
      <select className="input-field dropdown" defaultValue={0}>
        <option key={0} value="0" disabled>
          {placeholder}
        </option>
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
