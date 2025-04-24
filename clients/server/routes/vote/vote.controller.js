import Vote from '../../models/Vote.js';

// 处理投票请求
export const handleVote = async (req, res) => {
  try {
    const { option } = req.body;
    const ip = req.ip;
    const userTag = req.headers['x-user-tag'] || generateUserTag();

    // 记录投票
    await Vote.create({
      userTag,
      ipAddress: ip,
      option,
      isValid: true
    });

    // 返回响应
    res.json({
      success: true,
      userTag,
      remaining: req.rateLimit.remaining
    });

  } catch (error) {
    res.status(500).json({ 
      error: '投票失败',
      details: error.message 
    });
  }
};

// 获取投票结果
export const getVoteResults = async (req, res) => {
  try {
    const results = await Vote.getResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: '获取结果失败',
      details: error.message
    });
  }
};

// 生成用户标签
function generateUserTag() {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}