import ThemeToggle from './components/state/ThemeToggle'
import TextInput from './components/state/TextInput'
import FetchData from './components/effect/FetchData'
import PageTitle from './components/effect/PageTitle'
import Counter from './components/reducer/Counter'
import Form from './components/reducer/Form'
import UserPage from './components/context/UserPage'
import ExpensiveCalculationParent from './components/memo/ExpensiveCalculationParent'
import Parent from './components/callback/Parent'
import ListFilterParent from './components/memo/ListFilterParent'
import ExpensiveComponentParent from './components/callback/ExpensiveComponentParent'
import FocusInput from './components/ref/FocusInput'
import PreviousValue from './components/ref/PreviousValue'
import Parent1 from './components/imperativehandle/Parent1'
import Parent2 from './components/imperativehandle/Parent2'
import ComponentSize from './components/layouteffect/ComponentSize'
import AnimateBox from './components/layouteffect/AnimateBox'
import App1 from './components/debugvalue/App1'
import App2 from './components/debugvalue/App2'
import ThemeProvider from './components/context/ThemeProvider'
import ThemeButton from './components/context/ThemeButton'
import Data from './components/custom/Data'
import Search from './components/custom/Search'
const App = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query)
  }
  return (
    <div>
      {/* 切换主题模式 */}
      {/* <ThemeToggle />    */}

      {/* 表单输入 */}
      {/* <TextInput /> */}

      {/* 数据获取 */}
      {/* <FetchData /> */}

      {/* 动态文档标题 */}
      {/* <PageTitle /> */}

      {/* 计数器 */}
      {/* <Counter /> */}

      {/* 表单验证 */}
      {/* <Form /> */}

      {/* 主题上下文 */}
      {/* <ThemeProvider>
        <ThemeButton />
      </ThemeProvider> */}

      {/* 用户信息上下文 */}
      {/* <UserPage /> */}

      {/* 优化计算 */}
      {/* <ExpensiveCalculationParent /> */}

      {/* 列表过滤 */}
      {/* <ListFilterParent /> */}

      {/* 防止不必要的函数重渲染 */}
      {/* <Parent /> */}

      {/* 事件处理 */}
      {/* <ExpensiveComponentParent /> */}

      {/* 获取DOM 元素 */}
      {/* <FocusInput /> */}

      {/* 保存上一个值 */}
      {/* <PreviousValue /> */}

      {/* 父组件控制子组件的方法 */}
      {/* <Parent1 /> */}

      {/* 暴露自定义方法 */}
      {/* <Parent2 /> */}

      {/* 获取元素尺寸 */}
      {/* <ComponentSize /> */}

      {/* 动画同步 */}
      {/* <AnimateBox /> */}

      {/* 显示自定义值 */}
      {/* <App1 /> */}

      {/* 调试API请求 */}
      <App2 />

      {/* useFetch自定义Hook */}
      {/* <Data /> */}

      {/* useDebounce自定义Hook */}
      {/* <h1>Search Example</h1>
      <Search onSearch={handleSearch} /> */}
    </div>
  )
}
export default App
