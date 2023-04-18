// 當selectedDate被更改時，更改courseTable的內容
function updateCourseTable(){
    // 先清空courseTable
    $("#courseTable").empty();
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    var topicCount = topic.length;
    let millisecsPerDay = 24 * 60 * 60 * 1000;
    for(var x = 0; x < topicCount; x++){
        $("#courseTable").append(
            "<tr>"
            + `<td>${x + 1}</td>`
            // 只輸出月份與日期
            + `<td>${(new Date(selectedDate.getTime() + 7 * x * millisecsPerDay)).toLocaleDateString('en-US', {month: 'numeric', day: 'numeric'})}</td>`
            + `<td>${topic[x]}</td>`
            + "</tr>");
        // 如果topic[x]是"停課"，將該行文字變成灰色
        if(topic[x] == "停課")
            $("#courseTable tr:last-child").css("color", "lightgray");
    }
}