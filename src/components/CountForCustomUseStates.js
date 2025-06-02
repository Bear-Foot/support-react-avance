export const Count = ({ stateHook, label }) => {
  const [count, setCount] = stateHook(0)

  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      {label}
      clicked:
      {count}
    </button>
  )
}
