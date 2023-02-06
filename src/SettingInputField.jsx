import { Input, Label, useId } from "@fluentui/react-components";
import "./Settings.css";

const SettingInputField = ({
  label,
  onChange,
  stateVariable,
  type = "text",
  contentBefore = undefined,
  placeholder = undefined,
}) => {
  const inputId = useId("input");

  return (
    <div className="sub-setting">
      <Label htmlFor={inputId} size={"medium"} className="label">
        {label}
      </Label>
      <Input
        className="input-field"
        inputId={inputId}
        size="large"
        defaultValue={stateVariable}
        onChange={onChange}
        type={type}
        contentBefore={contentBefore}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SettingInputField;
