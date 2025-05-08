import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// 全局导入Leaflet样式，确保在所有页面都可用
import 'leaflet/dist/leaflet.css?url'

// 渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 