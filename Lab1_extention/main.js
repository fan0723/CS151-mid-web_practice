// 當windows onload (當網頁載入時就是windows onload)執行function (initialization)
window.onload = function(){
    // alert("hi");
};

var lastChildNumber = -1;   /* 記錄上一次的數字 */
// 當網頁被完全載入完後會執行這個function
$(function(){
    $("input").on("click", function(){
        // alert("hi");
        var numberOfListItem = $("li").length;      /* 計算list元件有幾個 */
        var randomChildNumber;
        // 隨機產生不跟前一筆重複的數字
        do{
            randomChildNumber = Math.floor(Math.random() * numberOfListItem);
        }while(randomChildNumber == lastChildNumber);
        lastChildNumber = randomChildNumber;
        // 輸出randomChildNumber在console
        console.log(randomChildNumber);
        // $("img").attr("src", "ref/raman.jfif");     /* $尋找html元件 .attr設定attribute */
        if(randomChildNumber == 0)
            $("img").attr("src", "ref/raman.jfif");
        else if(randomChildNumber == 1)
            $("img").attr("src", "ref/ru.jfif");
        else if(randomChildNumber == 2)
            $("img").attr("src", "ref/tu.jfif");

        $("h1").text($("li").eq(randomChildNumber).text());
    });
});