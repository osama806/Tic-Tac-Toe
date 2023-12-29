const elems = {
  current: document.querySelector("#current"),
  board: document.querySelector(".board"),
  boxes: document.querySelectorAll(".index"),
  score_X: document.getElementById("sc_X"),
  score_O: document.getElementById("sc_O"),
};

let variables = { current_playing: true, winner: false, sc_X: 0, sc_O: 0 };
let check = false;
const tick = (e) => {
  const box = e.target; // to hold square this clicked it
  if (box.innerText) return; //if box is filled don't put X/O again
  box.innerText = variables.current_playing;
  box.innerText = variables.current_playing ? "X" : "O";
  variables.current_playing = !variables.current_playing;
  checkForwinner();
};

const winning_states = [
  // Horizontal
  [0, 1, 2], // 0
  [3, 4, 5], // 1
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6], // 8
];

const getBoxValue = (i) => elems.boxes[i].innerText;
const checkForwinner = () => {
  winning_states.forEach((state) => {
    if (
      getBoxValue(state[0]) &&
      getBoxValue(state[1]) &&
      getBoxValue(state[2]) &&
      getBoxValue(state[0]) == getBoxValue(state[1]) &&
      getBoxValue(state[0]) == getBoxValue(state[2]) &&
      getBoxValue(state[1]) == getBoxValue(state[2])
    ) {
      elems.current.innerText = `Player ${getBoxValue(state[0])} wins!`;
      variables.winner = true;
      check = true;
      for (let i = 0; i < elems.boxes.length; i++) {
        elems.boxes[i].innerText = " ";
      }
      if (check == true) {
        if (
          getBoxValue(state[0]) == getBoxValue(state[1]) &&
          getBoxValue(state[0]) == getBoxValue(state[2]) &&
          getBoxValue(state[1]) == getBoxValue(state[2]) &&
          !variables.current_playing
        ) {
          variables.sc_X += 1;
          elems.score_X.innerText = variables.sc_X;
        } else {
          variables.sc_O += 1;
          elems.score_O.innerText = variables.sc_O;
        }
      }
    } else if (
      getBoxValue(0) != "" &&
      getBoxValue(1) != "" &&
      getBoxValue(2) != "" &&
      getBoxValue(3) != "" &&
      getBoxValue(4) != "" &&
      getBoxValue(5) != "" &&
      getBoxValue(6) != "" &&
      getBoxValue(7) != "" &&
      getBoxValue(8) != ""
    ) {
      elems.current.innerText = `Draw !`;
      elems.boxes.forEach(element => element.innerText = "")
    }
  });
};

elems.board.addEventListener("click", tick);
