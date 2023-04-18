$(function () {
    // 儲存目前作答到第幾題
    var currentQuiz = null;
    // 定義answers陣列
    var answers = [];
    // 當按下按鈕後要執行的函式
    $("#startButton").click(function () {
        // 設定目前作答從第0題開始
        if (currentQuiz == null) {
            currentQuiz = 0;
            // 顯示題目
            $("#question").text(questions[0].question);
            // 顯示選項
            $("#options").empty();
            for (var x = 0; x < questions[0].answers.length; x++) {
                $("#options").append(
                    `
                    <input name='options' type='radio' value=${x}>
                    ${questions[0].answers[x][0]}
                    <br><br>
                    `
                );
            }
            // 顯示按鈕
            $("#startButton").attr("value", "Next");
        } else {
            // 檢查使用者是否有選擇選項
            $.each(
                $(":radio"), function (i, val) {
                    if (val.checked) {
                        // 如果有選擇，將目前的選項儲存到answers陣列中
                        answers[currentQuiz] = parseInt(val.value);
                        currentQuiz++;
                    }
                }
            );
            // 檢查是否已經作答完畢
            if (currentQuiz == questions.length - 1) {
                // 計算分數
                var score = 0;
                for (var x = 0; x < questions.length; x++) {
                    score += questions[x].answers[answers[x]][1];
                }
                // 顯示分數
                $("#question").text("Your score is " + score);
                $("#options").empty();
                $("#startButton").attr("value", "Restart");
                currentQuiz = null;
            } else {
                // 顯示下一個題目
                console.log(currentQuiz);
                $("#question").text(questions[currentQuiz].question);
                $("#options").empty();
                for (var x = 0; x < questions[currentQuiz].answers.length; x++) {
                    $("#options").append(
                        `
                        <input name='options' type='radio' value=${x}>
                        ${questions[currentQuiz].answers[x][0]}
                        <br><br>
                        `
                    );
                }
            }
        }
    });
});