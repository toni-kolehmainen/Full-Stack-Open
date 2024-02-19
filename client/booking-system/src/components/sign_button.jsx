
// const SignButton = ({handleClick, text}) => {
const SignButton = ({text, handleClick}) => {
  console.log(text)
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default SignButton