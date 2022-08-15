import SwitchStyle from './switch.module.css';

type SwitchTypes = {
    isOn: boolean;
    handleToggle: () => void;
    onColor: string;
};

export const Switch = ({ isOn, handleToggle, onColor }: SwitchTypes) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className={SwitchStyle.reactSwitchCheckbox}
                id='react-switch-new'
                type='checkbox'
            />
            <label
                style={{ background: isOn ? onColor : undefined }}
                className={SwitchStyle.reactSwitchLabel}
                htmlFor='react-switch-new'
            >
                <span className={SwitchStyle.reactSwitchButton} />
            </label>
        </>
    );
};
