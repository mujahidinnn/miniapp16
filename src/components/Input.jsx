const Input = ({
  type = "text",
  placeholder = "Masukan",
  label = "label",
  value = "",
  name = "name",
  onChange = () => null,
  onClickShow = () => null,
  show,
}) => {
  return (
    <div className="input">
      <label name={name}>{label}</label>
      <br />
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
