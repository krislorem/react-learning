const Input = ({ onInputChange }) => {
  return (
    <input
      type="text"
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="请输入..."
    />
  )
}
export default Input
