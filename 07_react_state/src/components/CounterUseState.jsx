import React, { useState } from 'react';
const CounterUseState = () => {
  // 通过 useState 创建本地状态，初始值为 0
  const [count, setCount] = useState(0);
  // 返回一个包含当前 count 状态和更新该状态的 setCount 函数的数组
  return (
    <div>
      <p>计数器: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
    </div>
  );
}
export default CounterUseState
