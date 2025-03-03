import React from "react";
import useFetch from "../../hooks/useFetch";
// 导入自定义的 useFetch Hook
const Data = () => {
  // 使用 useFetch Hook 从指定的 URL 获取数据，并接收 loading 和 error 状态
  const { data, loading, error } = useFetch("https://api.xygeng.cn/one");
  // 如果数据正在加载中，显示加载提示
  if (loading) return <div>加载中...</div>;
  // 如果发生错误，显示错误信息
  if (error) return <div>发生错误：{error}</div>;
  // 如果数据已加载完成且没有错误，渲染数据
  return (
    <div>
      <p>来源：{data.data.origin}</p>
      <p>作者：{data.data.name}</p>
      <p>标签：{data.data.tag}</p>
      <p>内容：{data.data.content}</p>
    </div>
  );
};
export default Data
