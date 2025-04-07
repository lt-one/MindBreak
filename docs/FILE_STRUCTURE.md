# 见心光(MindBreak)项目文件结构说明

本文档详细介绍了项目中各个文件和目录的用途，帮助开发者更好地理解项目结构。

## 根目录文件

| 文件名 | 描述 |
|-------|------|
| `.gitignore` | 定义Git版本控制需要忽略的文件和目录，避免将不必要的文件提交到代码库 |
| `README.md` | 项目主要说明文档，包含项目介绍、功能描述、技术栈、安装和使用指南等 |
| `index.html` | 应用入口HTML文件，定义了页面的基础结构和元数据 |
| `package.json` | 项目依赖管理文件，定义了项目的依赖包、脚本和基本信息 |
| `package-lock.json` | 锁定项目依赖的精确版本，确保所有环境使用相同的依赖版本 |
| `postcss.config.js` | PostCSS配置文件，用于处理CSS转换和优化 |
| `tailwind.config.js` | Tailwind CSS配置文件，定义了项目的主题、颜色、动画等样式 |
| `tsconfig.json` | TypeScript编译器配置文件，定义了TS编译选项和规则 |
| `tsconfig.node.json` | 专门用于Node.js环境的TypeScript配置 |
| `vite.config.ts` | Vite构建工具的配置文件，定义了开发服务器和构建选项 |

## 主要目录结构

### `/public`目录

存放静态资源文件，会被直接复制到构建输出目录。

| 文件/目录 | 描述 |
|----------|------|
| `mindbreak-icon.svg` | 网站图标，显示在浏览器标签和收藏夹中 |
| `vite.svg` | Vite框架的默认图标 |

### `/src`目录

应用的主要源代码目录。

| 子目录/文件 | 描述 |
|------------|------|
| `App.tsx` | 应用的根组件，定义了整体布局和路由结构 |
| `main.tsx` | 应用的入口点，负责将根组件渲染到DOM |
| `index.css` | 全局CSS样式文件，包含Tailwind CSS指令和基础样式 |
| `global.css` | 额外的全局样式定义 |
| `vite-env.d.ts` | Vite环境的TypeScript类型声明文件 |

#### `/src/components`目录

可复用的UI组件。

| 子目录 | 描述 |
|--------|------|
| `/layout` | 布局相关组件，如Header、Footer、Navigation等 |
| `/common` | 通用UI组件，如按钮、表单元素、加载指示器等 |
| `/features` | 特定功能模块的组件 |
| `/Logo` | 网站Logo相关组件 |

**`/src/components/layout`目录详解**

| 文件 | 描述 |
|------|------|
| `layout.tsx` | 主布局组件，定义了网站的基本结构 |
| `header.tsx` | 页头组件，包含网站标题、导航菜单和用户控件 |
| `footer.tsx` | 页脚组件，包含联系信息、版权声明和链接 |
| `navigation.tsx` | 导航菜单组件，处理网站内的页面导航 |
| `navbar.tsx` | 响应式导航栏组件，适配不同屏幕尺寸 |
| `index.ts` | 统一导出布局相关组件 |

**`/src/components/features`目录详解**

| 子目录 | 描述 |
|--------|------|
| `/food` | 美食探索和食物图鉴相关组件 |
| `/philosophy` | 中国哲学相关组件 |
| `/quotes` | 智慧语录相关组件 |
| `/blog` | 博客相关组件 |

#### `/src/pages`目录

应用的页面组件，每个文件对应一个路由页面。

| 文件 | 描述 |
|------|------|
| `Home.tsx` | 首页组件，展示网站概览和亮点功能 |
| `About.tsx` | 关于页面，介绍网站和作者 |
| `Blog.tsx` | 博客列表页面 |
| `Projects.tsx` | 项目展示页面 |
| `FoodFinder.tsx` | 美食探索页面，集成了地图搜索功能 |
| `FoodAtlas.tsx` | 食物图鉴页面，展示美食分类和详情 |
| `ChinesePhilosophy.tsx` | 中国哲学页面 |
| `EnglishTraining.tsx` | 英语学习资源页面 |
| `Contact.tsx` | 联系页面，包含联系表单和联系方式 |
| `WebsiteProject.tsx` | 网站项目详情页面 |
| `Services.tsx` | 服务介绍页面 |

#### `/src/data`目录

存放应用的数据文件和数据模型。

| 子目录 | 描述 |
|--------|------|
| `/food` | 美食相关数据，包含餐厅信息和食物数据 |
| `/quotes` | 智慧语录数据集合 |

#### `/src/hooks`目录

自定义React钩子函数。

| 文件 | 描述 |
|------|------|
| `useGeolocation.ts` | 处理地理位置获取和更新的钩子 |
| `useRestaurants.ts` | 餐厅数据获取和过滤的钩子 |

#### `/src/styles`目录

样式相关文件。

| 文件 | 描述 |
|------|------|
| `animations.css` | 定义全局动画效果 |

#### `/src/types`目录

TypeScript类型定义文件。

| 子目录 | 描述 |
|--------|------|
| `/food` | 美食相关类型定义 |
| `/quotes` | 语录相关类型定义 |
| `global.d.ts` | 全局类型定义 |

### `/.vscode`目录

Visual Studio Code编辑器配置文件。

| 文件 | 描述 |
|------|------|
| `extensions.json` | 推荐的VSCode扩展列表 |

## 文件命名约定

项目遵循以下命名约定：

1. **组件文件**：使用PascalCase (例如：`Header.tsx`, `FoodCard.tsx`)
2. **工具和钩子文件**：使用camelCase并以用途前缀 (例如：`useGeolocation.ts`)
3. **类型定义文件**：使用camelCase或index.ts (例如：`restaurant.types.ts`, `index.ts`)
4. **样式文件**：使用camelCase (例如：`animations.css`)

## 导入约定

1. 相对路径导入使用`./`或`../`
2. 避免使用太深的相对路径 (如`../../../../`)
3. 常用的共享组件和工具从索引文件导入

## 代码组织原则

1. **组件结构**: 每个组件文件只包含一个主要组件
2. **关注点分离**: 将业务逻辑、UI渲染和样式分开
3. **可重用性**: 构建通用组件以便在多处复用
4. **一致性**: 保持文件结构和命名约定一致

---

文档最后更新: 2024年4月7日 