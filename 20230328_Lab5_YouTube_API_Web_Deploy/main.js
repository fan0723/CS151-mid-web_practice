let player; // Youtube player
let currentPlay = 0; // Current playing video

// YouTube API Ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: playList[currentPlay],
        playerVars: {
            'autoplay': 0, // Do not auto play the video
            'controls': 0, // Hide player controls
            'start': playTime[currentPlay][0],
            'end': playTime[currentPlay][1],
            // 'showinfo': 0, // Hide the video title
            // 'rel': 0, // Hide related videos
            'iv_load_policy': 3 // Hide the Video Annotations
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// YouTube Player Ready
function onPlayerReady(event) {
    $("#playButton").on("click", function () {
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

// Player State Change
function onPlayerStateChange(event) {
    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        } else {
            currentPlay = 0;
            player.cueVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        }
    }
    if (event.data == 1) {
        $("h2").text(player.getVideoData().title);
    }
}