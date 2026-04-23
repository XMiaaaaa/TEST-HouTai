# 甲易后台管理系统 - 前端演示

这是一个独立的前端演示项目，包含了甲易后台管理系统的所有页面。

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 项目结构

```
frontend-demo/
├── src/
│   ├── components/    # 组件
│   ├── pages/        # 页面
│   ├── utils/        # 工具函数
│   ├── App.tsx       # 主应用组件
│   ├── main.tsx      # 入口文件
│   └── index.css     # 全局样式
├── index.html        # HTML 模板
├── vite.config.ts    # Vite 配置
├── tailwind.config.js # Tailwind CSS 配置
├── postcss.config.js # PostCSS 配置
├── tsconfig.json     # TypeScript 配置
└── package.json      # 项目依赖
```

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (状态管理)
- Lucide React (图标库)
