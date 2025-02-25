const StudentFunc = (props) => {
  return (
    <>
      <h2>姓名, {props.name}</h2>
      <h2>年龄, {props.age}</h2>
      <img src={props.img} />
      <a href="{props.homepage}">主页</a>
    </>
  )
}
export default StudentFunc
