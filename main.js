$(document).ready(function() {
    let currentPosition = -4.86;
    let player1 = "Player 1";
    let player2 = "Player 2";

    $(".spin").click(function() {
        console.log("hello");
        $.ajax({
            url: "http://localhost:3000",
            type: "GET",
            headers: {
                task: "spin",
            },
            data: {
                user: "Alice",
            },
            success: function(response) {
                console.log(response);
                currentPosition += 1080 + response.getSpin;
                $('.wheel img').css('transform', 'rotate(-' + currentPosition + 'deg)');
            },
            error: function(error) {
                console.error("Error:", error);
            },
        });
    });

    function editNames() {
        player1 = prompt("Change Player 1 name") || player1;
        player2 = prompt("Change Player 2 name") || player2;

        $("p.Player1").html(player1);
        $("p.Player2").html(player2);
    }

    function calculateWinner(dice1, dice2) {
        if (dice1 === dice2) {
            return "draw";
        } else if (dice1 > dice2) {
            return "player1";
        } else {
            return "player2";
        }
    }

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

    $("#editNamesBtn").click(function() {
        editNames();
    });

    $("#dice-btn").click(function() {
        rollTheDice();
    });
});