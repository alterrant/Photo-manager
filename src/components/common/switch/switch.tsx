import SwitchStyle from './switch.module.css';

function Switch({ isOn, handleToggle, onColor }: any) {
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
                style={{ background: isOn && onColor }}
                className={SwitchStyle.reactSwitchLabel}
                htmlFor='react-switch-new'
            >
                <span className={SwitchStyle.reactSwitchButton} />
            </label>
        </>
    );
}

export default Switch;
