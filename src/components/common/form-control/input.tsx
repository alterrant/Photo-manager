type InputLoginFormTypes = {
    input: any;
    meta: any;
    className: string;
}

export const inputLoginForm = ({input, meta, className}: InputLoginFormTypes) => {
    const conditionError = meta.touched && meta.error;

    const classNameInput = `${className}${meta.active ? " input-focused" : ""}${conditionError ? " input-error" : ""}`;

    return (
        <>
            <div className="input-login-wrapper">
                <input className={classNameInput} {...input} type={input.name}/>
                {conditionError &&
                <div className="error-text-wrapper">
                  <div className="error-text-message">{meta.error}</div>
                </div>}
            </div>
        </>
    )
};
