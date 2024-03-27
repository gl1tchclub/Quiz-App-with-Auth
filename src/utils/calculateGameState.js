const calculateGameState = (squares) => {
  // Lines for all possible win states
    const lines = [
      // all lines in a row
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // all lines at different angles
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let s = 0; s < lines.length; s++) {
      const [a, b, c] = lines[s];
      // To win, there will always need to be an X or O at positions 0,1,2,3, and 6
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  
  export default calculateGameState;