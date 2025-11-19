// src/components/InputField.jsx
export default function InputField({ label, name, value, onChange, type = 'text', required = true }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      />
    </div>
  );
}
