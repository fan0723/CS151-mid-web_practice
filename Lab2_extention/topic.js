var topic = ["尚未開學", "國定假日", "環境準備", "停課", "隨機性", "停課", "重複性"];

const dateInput = document.getElementById("date-input");
var selectedDate = new Date();

// 當使用者在dateInput輸入日期時，執行function
dateInput.addEventListener("change", function () {
    console.log(dateInput.value);
    // 將dateInput.value轉換成日期格式
    selectedDate = new Date(dateInput.value);
    updateCourseTable();
});