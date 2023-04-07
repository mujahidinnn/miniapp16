const Button = ({
  title = "default title",
  onClick = () => null,
  className = "",
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default Button;
