document.addEventListener('DOMContentLoaded', () => {
  const rollBtn = document.getElementById('dice-btn');
  const dice = document.getElementById('dice');
  const resultText = document.getElementById('resultText');

  rollBtn.addEventListener('click', () => {
      $.ajax({
          url: "http://localhost:3000/index",
          type: "GET",
          headers: {
              "task": "roll-btn"
          },
          success: function(response) {
              console.log("Response:", response);

              const rollValue = response.roll;
              dice.style.transition = 'transform 1s ease-out';
              dice.style.transform = `rotate(${rollValue * 60}deg)`;

              const result = response.result;
              resultText.textContent = `You rolled a ${rollValue}! ${result}`;
          },
          error: function(error) {
              console.error("Error:", error);
          }
      });
  });
});

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
