// server/server.js - 服务器入口文件

import app from './app.js';
import './config/db.js'; // 初始化数据库连接

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});