import { useState, useEffect } from 'react'

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 设置定时器
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 清除定时器的清理函数
    return () => clearInterval(timerID);
  }, []); // 空依赖数组表示只在组件挂载时执行

  // 格式化时间为 HH:mm:ss
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{
      fontSize: '24px',
      fontWeight: 'bold',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      textAlign: 'center',
      width: '200px',
      margin: '20px auto'
    }}>
      {formatTime(time)}
    </div>
  );
}
export default Time
