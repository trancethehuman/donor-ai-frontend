import { Input, Label, useId } from "@fluentui/react-components";
import "./SettingInputField.css";

const SettingInputField = ({
  label,
  onChange,
  stateVariable,
  type = "text",
  contentBefore = undefined,
}) => {
  const inputId = useId("input");

  return (
    <div className="sub-setting">
      <Label htmlFor={inputId} size={"small"} className="label">
        {label}
      </Label>
      <Input
        className="input-field"
        inputId={inputId}
        size="small"
        defaultValue={stateVariable}
        onChange={onChange}
        type={type}
        contentBefore={contentBefore}
      />
    </div>
  );
};

export default SettingInputField;
