var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];

var level = 0;
var started = 0;
var len;
$(document).keypress(function () {
    if (started === 0) {
        nextSequence();
        started = 1;
    }
});

$('.btn').click(function () {
    var col = $(this).attr('id');
    userClickedPattern.push(col);
    len = userClickedPattern.length;
    animatePress(col);
    checkAnswer(len - 1);
});

function checkAnswer(curlen) {
    if (userClickedPattern[curlen] === gamepattern[curlen]) {
        console.log('success');
        if (userClickedPattern.length === gamepattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log('wrong');
        $('h1').text('Game over, press any key to continue');
        $('body').addClass('game-over');
        var audi = new Audio('sounds/wrong.mp3');
        audi.play();
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startover();
    }
}

function nextSequence() {
    level++;
    userClickedPattern = [];
    $('h1').text('Level ' + level);
    var num = Math.floor(Math.random() * 4);
    var chosen = buttonColours[num];
    gamepattern.push(chosen);
    $('#' + chosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosen);
}

function animatePress(chosen) {
    $('#' + chosen).addClass('pressed');
    setTimeout(function () {
        $('#' + chosen).removeClass('pressed');
    }, 100);
}

function playSound(chosen) {
    var aud = new Audio("sounds/" + chosen + ".mp3");
    aud.play();
}

function startover() {
    level = 0;
    gamepattern = [];
    started = 0;

}