// 确保导出正确的连接池
import mysql from 'mysql2/promise';

export default mysql.createPool({
  // ...你的数据库配置
});