// 產生隨機 4 位不重複的數字
function generateNumber() {
    let digits = [];
    while (digits.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!digits.includes(num)) {
            digits.push(num);
        }
    }
    return digits.join('');
}

// 初始化遊戲
let answer = generateNumber();
console.log("答案（Debug 用）:", answer);  // 方便測試時看答案

// 處理玩家的猜測
function submitGuess() {
    let guess = document.getElementById("guessInput").value.trim();  // 移除前後空格

    // 確保是 4 位數字，且不重複
    if (!/^\d{4}$/.test(guess)) {
        document.getElementById("result").textContent = "請輸入 4 位不重複的數字！";
        return;
    }
    
    // 確保數字不重複
    let guessSet = new Set(guess);
    if (guessSet.size !== 4) {
        document.getElementById("result").textContent = "數字不能重複，請重新輸入！";
        return;
    }

    let result = checkGuess(guess, answer);
    document.getElementById("result").textContent = result;

    // 如果猜對，顯示「遊戲結束」
    if (result === "4A0B") {
        document.getElementById("result").textContent += " 🎉 恭喜！你猜對了！";
    }
}

// 計算 1A2B 的結果
function checkGuess(guess, answer) {
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === answer[i]) {
            A++;
        } else if (answer.includes(guess[i])) {
            B++;
        }
    }
    return `${A}A${B}B`;
}

// 加入「重新開始」按鈕功能
function resetGame() {
    answer = generateNumber();
    console.log("新答案（Debug 用）:", answer);
    document.getElementById("result").textContent = "遊戲已重置，請輸入新的數字！";
    document.getElementById("guessInput").value = "";
}
