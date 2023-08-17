$(document).ready(function() {
    let currentPosition = -4.86;

    $(".spin").click(function() {
        // Your roulette spin logic here
        // Update the wheel rotation and display result
    });

    // Function to change player names
    function editNames() {
        var player1 = prompt("Change Player1 name");
        var player2 = prompt("Change player2 name");

        $("p.Player1").html(player1);
        $("p.Player2").html(player2);
    }

    // Function to roll the dice
    function rollTheDice() {
        var randomNumber1 = Math.floor(Math.random() * 6) + 1;
        var randomNumber2 = Math.floor(Math.random() * 6) + 1;

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
    }

    // Attach the editNames function to the button click event
    $("#editNamesBtn").click(function() {
        editNames();
    });

    // Attach the rollTheDice function to the button click event
    $("#dice-btn").click(function() {
        rollTheDice();
    });
});
