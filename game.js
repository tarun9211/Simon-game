var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];


var userClickedPattern = [];
$(".btn").click(function(){
    var userchoosencolor = $(this).attr("id");
    userClickedPattern.push(userchoosencolor);

    playsound(userchoosencolor);
    animatePress(userchoosencolor);

    if(userClickedPattern. length == level){checkAns(level);}
});

function nextsequence(){

    level++;

    $("#level-title").text("Level "+ level);

    var randomnumber = Math.floor(Math.random() * 4) % 4;
    randomChosenColour = buttonColours[randomnumber];
    // animatePress(randomChosenColour);
    gamepattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

    //checkAns(level);
}


function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}

var started = false;
var level = 0;

$(document).on('keypress',function(){
    
    if(!(started)){
        
        $("#level-title").text("Level "+ level);
        nextsequence();
        
        started = true;
    }
    
});

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }



function checkAns(currentLevel){
    if(arrayEquals(gamepattern, userClickedPattern)){
       // alert("calling next sequence...");
        nextsequence();
        userClickedPattern = [];
    }
    else{
       // alert("come under else...");
        var wrongans = new Audio("sounds/wrong.mp3");
        wrongans.play();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");  
        },200);

        startOver();
    }
}

function startOver(){
    gamepattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}