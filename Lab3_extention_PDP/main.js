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
                        // 如果有選擇，將目前的選項對應的得分存入answers陣列                                    
                        answers[currentQuiz] = parseInt(questions[currentQuiz].answers[i][1]);
                        currentQuiz++;
                    }
                }
            );
            // 檢查是否已經作答完畢
            if (currentQuiz == 30) {
                // 計算分數
                // scoreForTiger: 4,9,13,17,23,29
                var scoreForTiger = answers[4] + answers[9] + answers[13] + answers[17] + answers[23] + answers[29];
                // scoreForPeacock: 2,5,12,19,21,28
                var scoreForPeacock = answers[2] + answers[5] + answers[12] + answers[19] + answers[21] + answers[28];
                // scoreForKoala: 1,7,14,16,24,27
                var scoreForKoala = answers[1] + answers[7] + answers[14] + answers[16] + answers[24] + answers[27];
                // scoreForOwl: 0,6,10,15,20,25
                var scoreForOwl = answers[0] + answers[6] + answers[10] + answers[15] + answers[20] + answers[25];
                // scoreForChameleon: 3,8,11,18,22,26
                var scoreForChameleon = answers[3] + answers[8] + answers[11] + answers[18] + answers[22] + answers[26];

                var allScores = {
                    "老虎": scoreForTiger,
                    "孔雀": scoreForPeacock,
                    "無尾熊": scoreForKoala,
                    "貓頭鷹": scoreForOwl,
                    "變色龍": scoreForChameleon
                }
                // sort allScores
                var allScoresSorted = [];
                for (var animal in allScores) {
                    allScoresSorted.push([animal, allScores[animal]]);
                }
                allScoresSorted.sort(function (item1, item2) {
                    return item2[1] - item1[1];
                });

                // 顯示不同類型的所有分數
                var result = "";
                for (var i = 0; i < allScoresSorted.length; i++) {
                    result += allScoresSorted[i][0] + " : " + allScoresSorted[i][1] + "<br>";
                    result += personal_type[allScoresSorted[i][0]] + "<br><br>";
                }

                $("#question").html(result);
                // 隱藏選項
                $("#options").hide();
                // 隱藏按鈕
                $("#startButton").hide();

            } else {
                // 顯示下一個題目                
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