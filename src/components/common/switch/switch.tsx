import './switch.css';

type SwitchTypes = {
  isOn: boolean;
  handleToggle: () => void;
  onColor: string;
};

export const Switch = ({ isOn, handleToggle, onColor }: SwitchTypes) => (
  <>
    <input
      checked={isOn}
      onChange={handleToggle}
      className="reactSwitchCheckbox"
      id="react-switch-new"
      type="checkbox"
    />
    <label
      style={{ background: isOn ? onColor : undefined }}
      className="reactSwitchLabel"
      htmlFor="react-switch-new"
    >
      <span className="reactSwitchButton" />
    </label>
  </>
);
