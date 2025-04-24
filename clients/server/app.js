import express from 'express';
import voteRouter from './routes/vote/vote.routes.js'; // 新增

// ...其他已有配置...

// 挂载投票路由
app.use('/api/vote', voteRouter);

// ...其他路由配置...

import cors from 'cors';

app.use(cors({
  origin: 'https://yourdomain.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'X-User-Tag']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));