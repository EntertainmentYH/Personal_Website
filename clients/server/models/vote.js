import db from '../config/db.js';

export default class Vote {
  // 创建投票记录
  static async create({ userTag, ipAddress, option }) {
    const [result] = await db.query(
      `INSERT INTO votes 
       (user_tag, ip_address, option, is_valid)
       VALUES (?, ?, ?, TRUE)`,
      [userTag, ipAddress, option]
    );
    return result.insertId;
  }

  // 获取统计结果
  static async getResults() {
    const [rows] = await db.query(`
      SELECT 
        SUM(option = 'toolkit') AS toolkit,
        SUM(option = 'ui') AS ui
      FROM votes
      WHERE is_valid = TRUE
    `);
    return rows[0];
  }
}