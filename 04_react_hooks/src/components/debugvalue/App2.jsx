import React, { useState, useEffect, useDebugValue } from "react";

function useApi(url) {
  const [data, setData] = useState(null);
  useDebugValue(data ? "Data Loaded" : "Loading");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, [url]);

  return data;
}

const App2 = () => {
  const data = useApi("https://api.xygeng.cn/one");
  if (!data) return <p>加载中...</p>;
  return (
    <div>
      <h2>{data.content}</h2>
      <p>来源：{data.origin}</p>
      <p>作者：{data.name}</p>
      <p>标签：{data.tag}</p>
    </div>
  );
};

export default App2;
