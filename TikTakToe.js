const boxes = document.querySelectorAll(".box");
let array = [];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!box.textContent && !checkWinner("Player", "X")) {
            box.textContent = "X";
            array.push(index);
            console.log(array);
            if (!checkWinner("Player", "X")) {
                setTimeout(computer, 1000);
            }
        }
    });
});

function computer() {
    let flag = false;
    while (!flag && !checkWinner("Computer", "O")) {
        let rand = Math.floor(Math.random() * 9);
        if (array.indexOf(rand) === -1 && !boxes[rand].textContent) {
            flag = true;
            boxes[rand].textContent = "O";
            array.push(rand);
            checkWinner("Computer", "O"); // Check if computer wins after each move
        }
    }
}

function checkWinner(player, mark) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]              // Diagonal
    ];

    for (let condition of winConditions) {
        if (boxes[condition[0]].textContent === mark &&
            boxes[condition[1]].textContent === mark &&
            boxes[condition[2]].textContent === mark) {
            // Set background color of winning boxes
            boxes[condition[0]].style.backgroundColor = "green";
            boxes[condition[1]].style.backgroundColor = "green";
            boxes[condition[2]].style.backgroundColor = "green";

            // Show alert after a delay
            setTimeout(() => {
                alert(`${player} wins!`);
            }, 100);

            return true;
        }
    }

    if (array.length === 9) {
        setTimeout(() => {
            alert("It's a draw!");
        }, 1000);
        return true;
    }

    return false;
}
