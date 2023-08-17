$(document).ready(function() {
    let currentPosition = -4.86;
    let player1; // Değişkenleri tanımladık, fakat henüz değer atamadık
    let player2;

    $(".spin").click(function() {
        // Roulette spin mantığını burada işleyin
        // Tekerlek dönüşünü güncelleyin ve sonucu görüntüleyin
    });

    function editNames() {
        player1 = prompt("Change Player1 name"); // Değerleri burada atıyoruz
        player2 = prompt("Change player2 name");

        $("p.Player1").html(player1);
        $("p.Player2").html(player2);
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
