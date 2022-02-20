const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

const CheckWinner = (squares) => {
  for (let i = 0; i < winStates.length; i++) {
    const state = winStates[i];
    if (squares[state[0]] !== null && squares[state[0]] === squares[state[1]] && squares[state[0]] === squares[state[2]] && squares[state[1]] === squares[state[2]]) {
      return squares[state[0]];
    }
  }
  return 0;
};

export default CheckWinner;
