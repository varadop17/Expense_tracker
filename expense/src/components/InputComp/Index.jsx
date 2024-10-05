import "./input.css";

function Input({ label, state, setState, placeHolder, type = "text" }) {
    return (
        <div className="input-wrapper">
            <p className="label-input">{label}</p>
            <input
                className="custom-input"
                value={state}
                type={type} 
                placeholder={placeHolder}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    );
}

export default Input;
