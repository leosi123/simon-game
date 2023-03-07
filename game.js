var gamePattern = []
var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var started = false
var level = 0
$('body').keydown(function simon(event) { 
    if (!started){
        level=0
        gamePattern=[]
        userClickedPattern=[]
        started = true
        nextSequence()
        $('h1').html('Level '+ level);
        
    }
});
$('h1').click(function simon(event) { 
    if (!started){
        level=0
        gamePattern=[]
        userClickedPattern=[]
        started = true
        nextSequence()
        $('h1').html('Level '+ level);
        
    }
});
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    level =level +1
    $('h1').html('Level '+ level);
}


$('.btn').click(function () {
    if (started){
        var userChosenColor = this.id
        userClickedPattern.push(userChosenColor)
        playSound(userChosenColor)
        animatePress(userChosenColor)
        checkAnswer(userClickedPattern.length-1)
    }
    else{
        $('h1').addClass('game-over');
        setTimeout(function(){
            $('h1').removeClass('game-over');
        },200)
    }
    
});

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                userClickedPattern=[]
                nextSequence()
            },1000)
        }
    }
    else{
        playSound('wrong')
        $('h1').html('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200)
        started=false
        
    }
}