var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var score = 0;

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Молодец Семен!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Гра закінчена, спочатку?");
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

$(".best").html(score);


// $(document).keydown(function () {
//   if (!started) {
//     $("#level-title").html("Уровень " + level);
//     nextSequence();
//     started = true;
//   }
// });


$(document).on('mousedown touchstart', function () {
  if (!started) {
    $("#level-title").html("Уровень " + level);
    nextSequence();
    started = true;
  }
});



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Рівень " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  if (score < level) {
    score = level - 1;
    $(".best").html(score);
  }

}



function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
