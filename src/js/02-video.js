import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// const player = new Player('handstick', {
//     id: 19231868,
//     width: 640
// });

// player.on('play', function() {
//     console.log('played the video!');
// });

const onPlay = throttle((function(data) { 
    localStorage.setItem("videoplayer-current-time", data.seconds);
    console.log(data.seconds);
}), 1000);

player.on('timeupdate', onPlay);

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function(seconds) {
    // seconds = the actual time that the player seeked to
    // console.log("current time")
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            //console.log("the time was less than 0 or greater")
            break;

        default:
            //console.log("some other error occurred")
            break;
    }
});

