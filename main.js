$(document).ready(function() {
  var player1 = "Player 1";
  var player2 = "Player 2";

  // Function to change the player name
  function editNames() {
    player1 = prompt("Change Player1 name");
    player2 = prompt("Change player2 name");

    $("p.Player1").html(player1);
    $("p.Player2").html(player2);
  }

  // Function to roll the dice
  function rollTheDice() {
    setTimeout(function () {
      var randomNumber1 = rollDice();
      var randomNumber2 = rollDice();

      $(".img1").attr("src", "images/dice" + randomNumber1 + ".png");
      $(".img2").attr("src", "images/dice" + randomNumber2 + ".png");

      var winner = calculateWinner(randomNumber1, randomNumber2);
      var result;

      if (winner === "draw") {
        result = "Draw!";
      } else if (winner === "player2") {
        result = player2 + " WINS!";
      } else {
        result = player1 + " WINS!";
      }

      $("h1").html(result);
    }, 2500);
  }

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Attach the rollTheDice function to the button click event
  $('#dice-btn').click(function() {
    rollTheDice();

    // Your AJAX code here
    $.ajax({
      url: "http://localhost:3000/index",
      type: "GET",
      headers: {
        "task": "roll-btn"
      },
      success: function(response) {
        console.log("Response:", response);

        const rollValue = response.roll;
        $('#dice').css({
          'transition': 'transform 1s ease-out',
          'transform': `rotate(${rollValue * 60}deg)`
        });

        const result = response.result;
        $('#resultText').text(`You rolled a ${rollValue}! ${result}`);
      },
      error: function(error) {
        console.error("Error:", error);
      }
    });
  });

  // Function to calculate the winner
  function calculateWinner(randomNumber1, randomNumber2) {
    if (randomNumber1 === randomNumber2) {
      return "draw";
    } else if (randomNumber1 < randomNumber2) {
      return "player2";
    } else {
      return "player1";
    }
  }
});
