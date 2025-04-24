// ======================
// 此版已废弃
//=======================


//=======================
// 投票系统核心逻辑
// ======================

// 初始化投票数据
let votes = JSON.parse(localStorage.getItem('votes')) || {
    "实用小工具合集": 0,
    "更加精美的UI界面": 0
};
let lastVoteTime = parseInt(localStorage.getItem('lastVoteTime')) || 0;

// ======================
// 数据迁移模块 (关键修正)
// ======================
function migrateData() {
    // 深拷贝原始数据避免污染
    const rawData = JSON.parse(JSON.stringify(votes));

    // 重置投票数据保证结构正确
    votes = {
        "实用小工具合集": 0,
        "更加精美的UI界面": 0
    };

    // 数据迁移 (兼容所有历史版本)
    Object.entries(rawData).forEach(([key, value]) => {
        // 处理带"的"字的旧数据
        if (key.includes('实用') && key.includes('工具')) {
            votes['实用小工具合集'] += value;
            return;
        }
        
        // 处理UI选项的变体
        if (key.includes('UI') || key.includes('界面')) {
            votes['更加精美的UI界面'] += value;
            return;
        }

        // 保留有效数据
        if (['实用小工具合集', '更加精美的UI界面'].includes(key)) {
            votes[key] += value;
        }
    });

    localStorage.setItem('votes', JSON.stringify(votes));
}

// ======================
// 投票核心功能
// ======================
function vote(option) {
    const currentTime = Date.now();
    
    // 有效性验证
    if (!votes.hasOwnProperty(option)) {
        alert(`无效选项: ${option}`);
        return;
    }

    // 时间间隔验证 (60000ms = 1分钟)
    if (currentTime - lastVoteTime < 60000) {
        alert(`请等待 ${Math.ceil((60000 - (currentTime - lastVoteTime)) / 1000)} 秒后再次投票`);
        return;
    }

    // 执行投票
    votes[option]++;
    lastVoteTime = currentTime;
    
    // 持久化存储
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('lastVoteTime', lastVoteTime);

    // 更新UI
    disableButtons();
    displayResults();
    
    // 自动恢复按钮 (精确到毫秒)
    const remainTime = 60000 - (currentTime - lastVoteTime); // 修正时间计算
    setTimeout(() => {
        enableButtons();
        alert("现在可以再次投票了！");
    }, remainTime);
}

// ======================
// UI控制模块
// ======================
function disableButtons() {
    document.querySelectorAll('.vote-button').forEach(btn => {
        btn.disabled = true;
        btn.style.transform = 'scale(0.95)';
        btn.style.filter = 'grayscale(80%)';
    });
}

function enableButtons() {
    document.querySelectorAll('.vote-button').forEach(btn => {
        btn.disabled = false;
        btn.style.transform = 'scale(1)';
        btn.style.filter = 'none';
    });
}

// ======================
// 结果显示模块
// ======================
function displayResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // 按票数排序
    const sorted = Object.entries(votes)
        .sort((a, b) => b[1] - a[1]);

    // 生成结果条目（修正进度条计算）
    sorted.forEach(([option, count]) => {
        const total = Object.values(votes).reduce((a, b) => a + b, 0);
        const percentage = (count / Math.max(1, total)) * 100;
        
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
            </div>
            <span class="option">${option}</span>
            <span class="count">${count} 票</span>
        `;
        resultsDiv.appendChild(div);
    });
}

// ======================
// 初始化执行
// ======================
document.addEventListener('DOMContentLoaded', () => {
    migrateData(); // 数据清洗
    
    // 自动恢复按钮状态
    const remainTime = 60000 - (Date.now() - lastVoteTime);
    if (remainTime > 0) {
        disableButtons();
        setTimeout(enableButtons, remainTime);
    }

    displayResults();
});


function resetVotes() {
    if (confirm('确定要重置所有投票数据吗？此操作不可撤销！')) {
        votes = {
            "实用小工具合集": 0,
            "更加精美的UI界面": 0
        };
        localStorage.setItem('votes', JSON.stringify(votes));
        lastVoteTime = 0;
        localStorage.removeItem('lastVoteTime');
        displayResults();
        alert('已成功重置投票数据！');
    }
}
