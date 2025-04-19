document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', handleCopy);
    button.addEventListener('touchstart', handleCopy); // 添加触摸事件
});

function handleCopy() {
    const textToCopy = this.previousElementSibling.innerText.trim();
    const originalText = this.innerText;

    // 设置按钮文本为“已复制”
    this.innerText = '已复制';

    // 为每个按钮单独管理恢复逻辑
    const button = this; // 保存当前按钮的引用

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // 使用箭头函数确保this的上下文正确
            setTimeout(() => {
                button.innerText = originalText; // 恢复原始文本
            }, 1000);
        }, (err) => {
            console.error('复制失败:', err);
            button.innerText = originalText; // 如果复制失败，立即恢复原始文本
        });
    } else {
        // 回退到 document.execCommand
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // 使用箭头函数确保this的上下文正确
        setTimeout(() => {
            button.innerText = originalText; // 恢复原始文本
        }, 1000);
    }
}
