// 當windows onload (當網頁載入時就是windows onload)執行function (initialization)
window.onload = function () {
    // alert("hi");
};

// 當網頁被完全載入完後會執行這個function
$(function () {
    $("input").on("click", function () {
        var numberOfListItem = $("li").length;
        var randomChildNumber = Math.floor(Math.random() * numberOfListItem);
        $("h1").text($("li").eq(randomChildNumber).text());
    });
});