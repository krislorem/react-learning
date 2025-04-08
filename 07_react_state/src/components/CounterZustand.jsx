import useCounterStore from "../store/counterStore";
const CounterZustand = () => {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <h2>Zustand计数器</h2>
      <p>当前计数：{count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
    </div>
  );
};
export default CounterZustand
