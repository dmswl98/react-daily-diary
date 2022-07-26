const Buttons = ({text, type, onClick}) => {
  return (
    <button
      className={["Buttons", `Button_${type}`].join(' ')}
      onClick={onClick}>{text}
    </button>
  )
}

Buttons.defaultProps = {
  type: "default",
}

export default Buttons;