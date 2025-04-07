<<<<<<< HEAD
# 个人网站项目 (My Personal Website)

这是一个使用现代前端技术栈构建的个人网站项目，展示个人作品、博客以及各种交互功能模块。

## 技术栈

- **框架**: React 18
- **构建工具**: Vite 6
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **路由**: React Router v7
- **状态管理**: Zustand
- **动画**: Framer Motion
- **地图**: Leaflet & React Leaflet
- **包管理**: npm

## 主要功能

- 🏠 **首页**: 个人介绍和项目概览
- 📁 **项目展示**: 展示个人作品集
- 📝 **博客系统**: 分享文章和知识
- 🍜 **美食探索**: 基于地图的餐厅查找功能
- 🏮 **中国哲学**: 中国传统哲学内容展示
- 📚 **英语学习**: 英语学习资源和工具
- 💬 **语录库**: 收集和展示中国古代智慧语录
- 📞 **联系页面**: 联系表单和社交媒体链接

## 项目结构

```
my-personal-website/
├── public/              # 静态资源
│   └── images/          # 公共图片资源
├── src/                 # 源代码
│   ├── assets/          # 项目资源
│   ├── components/      # 可复用组件
│   │   ├── Layout.tsx   # 布局组件
│   │   ├── Header.tsx   # 页头组件
│   │   ├── Footer.tsx   # 页脚组件
│   │   └── ...          # 其他组件
│   ├── data/            # 数据文件
│   ├── hooks/           # 自定义钩子
│   ├── image/           # 图片资源
│   ├── pages/           # 页面组件
│   │   ├── Home.tsx     # 首页
│   │   ├── About.tsx    # 关于页面
│   │   ├── Blog.tsx     # 博客页面
│   │   └── ...          # 其他页面
│   ├── services/        # 服务和API
│   ├── styles/          # 样式文件
│   ├── types/           # TypeScript类型定义
│   ├── App.tsx          # 应用入口组件
│   ├── main.tsx         # 应用挂载点
│   └── index.css        # 全局样式
├── .gitignore           # Git忽略文件
├── index.html           # HTML模板
├── package.json         # 项目依赖和脚本
├── postcss.config.js    # PostCSS配置
├── tailwind.config.js   # Tailwind CSS配置
├── tsconfig.json        # TypeScript配置
└── vite.config.ts       # Vite配置
```

## 主要组件

- **布局组件**: 提供一致的应用布局结构
- **导航组件**: 响应式导航菜单
- **项目卡片**: 展示项目信息的卡片组件
- **博客卡片**: 展示博客文章的卡片组件
- **语录卡片**: 展示智慧语录的卡片组件
- **地图组件**: 基于Leaflet的交互式地图
- **表单组件**: 用于用户输入和交互的表单

## 优化建议

为了让项目结构更加清晰，建议以下优化:

1. 组件目录细分:
   ```
   components/
   ├── layout/        # 布局相关组件
   ├── common/        # 通用组件
   ├── features/      # 特性相关组件
   │   ├── food/      # 美食探索相关组件
   │   ├── quotes/    # 语录库相关组件
   │   └── ...
   ```

2. 统一资源管理:
   - 合并 `assets/`、`image/` 目录，保持一致的资源管理

3. 数据层优化:
   - 扩展 `services/` 目录，增加各功能模块的API服务
   - 完善 `data/` 目录的数据模型和状态管理

4. 类型定义增强:
   - 为各功能模块创建专门的类型定义文件

## 使用说明

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 浏览器兼容性

支持所有现代浏览器:
- Chrome
- Firefox
- Safari
- Edge

## 贡献指南

欢迎贡献代码或提出建议:

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 许可证

本项目采用 MIT 许可证。详情请参阅 LICENSE 文件。

## 联系方式

如有任何问题或建议，请通过以下方式联系我:
- 邮箱: 1636678670@qq.com
- 网站: https://Mind Break.top
=======
# Web-MindBreak
个人网站MindBreak
>>>>>>> 30c4a91c5457ea9fcd047de67cde994bd6d744ae
