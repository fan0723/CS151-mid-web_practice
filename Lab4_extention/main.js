// 改成16*16的地圖 同時邊界位置、每個item的大小也要改變
// 讓一個物品跨越多格 四個格子或是八個格子是一個物品
// 創建一個物品可以被玩家吃掉
let mapArray, ctx, currentImgMain;
let imgMounain, imgMain, imgEnemy;

const gridLength = 37;

$(function () {
    // 產生大小為16*16的地圖陣列, 0-可走,1-障礙,2-終點,3-敵人,4-錢袋
    mapArray = [
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 4, 0, 0, 0, 1, 1, 3, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 3, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 1, 3, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 4, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 3, 0, 2]
    ];

    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };
    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    imgMounain = new Image();
    imgMounain.src = "images/material.png";
    // 創建一個玩家可拾取的錢袋
    imgCoin = new Image();
    imgCoin.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgMounain.onload = function () {
        imgEnemy.onload = function () {
            for (var x in mapArray) {
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 1) {
                        ctx.drawImage(imgMounain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } 
                    else if (mapArray[x][y] == 3) {
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                    else if(mapArray[x][y] == 4){// 畫出錢袋
                        ctx.drawImage(imgCoin, 192, 31, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } 
                }
            }
        }
    }
});

// 處理使用者按下按鍵
$(document).on("keydown", function (event) {
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        "x": -1,
        "y": -1
    };
    targetBlock = {
        "x": -1,
        "y": -1
    };
    event.preventDefault();

    switch (event.code) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    // 確認目標位置不會超過地圖
    if (targetImg.x <= 591 && targetImg.x >= 0 && targetImg.y <= 591 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if (targetBlock.x != -1 && targetBlock.y != -1) {

        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3:
                $("#talkBox").text("哈囉");
                break;
            // 創建一個物品可以被玩家拾取
            case 4:
                $("#talkBox").text("拾取金幣!");
                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
        }
    } else {
        $("#talkBox").text("邊界");
    }
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
});