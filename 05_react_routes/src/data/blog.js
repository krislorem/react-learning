const blogs = [
  {
    id: 1,
    title: "前端模块化开发实践指南",
    content: "深入探讨ES Modules与CommonJS的区别与实践方案，分享Webpack和Vite的模块化配置技巧...",
    author: "张伟",
    image: "https://picsum.photos/400/250?random=1",
    views: 2845,
    favorites: 156,
    likes: 320,
    tags: ["模块化", "Webpack", "工程化"]
  },
  {
    id: 2,
    title: "现代前端项目的Webpack深度优化",
    content: "从构建速度、打包体积、缓存策略三个维度详解Webpack性能优化方案，包含Tree Shaking实战案例...",
    author: "李娜",
    image: "https://picsum.photos/400/250?random=2",
    views: 3512,
    favorites: 234,
    likes: 487,
    tags: ["Webpack", "性能优化", "构建工具"]
  },
  {
    id: 3,
    title: "前端工程化之代码规范体系",
    content: "基于ESLint + Prettier + Husky打造企业级代码规范，实现自动化代码质量检测与修复...",
    author: "王强",
    image: "https://picsum.photos/400/250?random=3",
    views: 4210,
    favorites: 298,
    likes: 655,
    tags: ["代码规范", "ESLint", "Git Hooks"]
  },
  {
    id: 4,
    title: "CI/CD在前端工程中的落地实践",
    content: "基于GitHub Actions实现自动化构建部署流水线，包含单元测试、镜像构建、灰度发布全流程...",
    author: "陈思",
    image: "https://picsum.photos/400/250?random=4",
    views: 1890,
    favorites: 132,
    likes: 278,
    tags: ["CI/CD", "DevOps", "自动化"]
  },
  {
    id: 5,
    title: "前端微前端架构演进之路",
    content: "从qiankun到Module Federation，对比分析不同微前端方案的优缺点及适用场景...",
    author: "赵敏",
    image: "https://picsum.photos/400/250?random=5",
    views: 3276,
    favorites: 187,
    likes: 423,
    tags: ["微前端", "架构", "qiankun"]
  },
  {
    id: 6,
    title: "TypeScript工程化实践指南",
    content: "大型项目中TS配置方案详解：路径别名、类型检查优化、声明文件管理及编译加速技巧...",
    author: "周杰",
    image: "https://picsum.photos/400/250?random=6",
    views: 4523,
    favorites: 324,
    likes: 721,
    tags: ["TypeScript", "静态类型", "编译优化"]
  },
  {
    id: 7,
    title: "前端监控体系搭建实战",
    content: "从异常监控、性能指标、用户行为追踪三个维度构建全方位监控系统，集成Sentry实战案例...",
    author: "吴芳",
    image: "https://picsum.photos/400/250?random=7",
    views: 2967,
    favorites: 198,
    likes: 412,
    tags: ["监控", "性能优化", "Sentry"]
  },
  {
    id: 8,
    title: "前端测试策略深度解析",
    content: "Jest + Testing Library完整测试方案：单元测试、快照测试、E2E测试的工程化实践...",
    author: "郑浩",
    image: "https://picsum.photos/400/250?random=8",
    views: 2341,
    favorites: 167,
    likes: 356,
    tags: ["单元测试", "Jest", "测试策略"]
  },
  {
    id: 9,
    title: "前端状态管理架构演进",
    content: "从Redux到Zustand，对比分析不同状态管理方案在大型项目中的工程化实践...",
    author: "孙丽",
    image: "https://picsum.photos/400/250?random=9",
    views: 3789,
    favorites: 256,
    likes: 589,
    tags: ["状态管理", "Redux", "Zustand"]
  },
  {
    id: 10,
    title: "前端脚手架开发全攻略",
    content: "基于Node.js打造企业级脚手架工具，实现项目模板管理、自动化配置与依赖注入...",
    author: "王刚",
    image: "https://picsum.photos/400/250?random=10",
    views: 3120,
    favorites: 213,
    likes: 467,
    tags: ["脚手架", "CLI", "Node.js"]
  },
  {
    id: 11,
    title: "前端依赖管理最佳实践",
    content: "深入解析package.json配置、版本控制策略、依赖漏洞检测与多包管理方案...",
    author: "李想",
    image: "https://picsum.photos/400/250?random=11",
    views: 2678,
    favorites: 178,
    likes: 398,
    tags: ["npm", "依赖管理", "安全"]
  },
  {
    id: 12,
    title: "前端性能优化工程化方案",
    content: "构建时优化（代码分割、预加载）与运行时优化（虚拟列表、缓存策略）的综合实践...",
    author: "周婷",
    image: "https://picsum.photos/400/250?random=12",
    views: 4095,
    favorites: 287,
    likes: 632,
    tags: ["性能优化", "Webpack", "缓存"]
  }
]

export default blogs;
