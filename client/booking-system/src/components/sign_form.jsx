const SignForm = ({text, contents, handleLogin}) => {
  
  return (
    <form onSubmit={handleLogin}>
      {contents.map( content =>
        <div key={content.id}>
          <input
            type={content.type}
            value={content.value}
            name={content.username}
            onChange={({ target }) => content.set(target.value)}
          />
        </div>
      )}
    <button type="submit">
      {text}
    </button>
    </form>
  )
}

export default SignForm