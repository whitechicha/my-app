import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from "react-native";

export default function App() {
  const [notification, setNotification] = useState("Player 1");
  const [board, setBoard] = useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  const [refresh, setRefresh] = useState(false);
  const [player, setPlayer] = useState("X");
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== " ") {
        Alert.alert("Winner", `Player ${player} wins!`);
        if (player === "X") {
          setPlayer1Wins(player1Wins + 1);
        } else {
          setPlayer2Wins(player2Wins + 1);
        }
        setRefresh(true);
        return;
      }
    }

    if (!board.includes(" ")) {
      Alert.alert("Draw", "It's a draw!");
      setRefresh(true);
    }
  };

  useEffect(() => {
    checkWinner();
  }, [board]); // Trigger checkWinner whenever the board changes

  const handleCellPress = (index) => {
    let newBoard = [...board];
    if (newBoard[index] === " " && !refresh) {
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
      setNotification(player === "X" ? "Player 2" : "Player 1");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(" "));
    setPlayer("X");
    setNotification("Player 1");
    setRefresh(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.notification}>{notification}</Text>
      <Text>Player 1 Wins: {player1Wins}</Text>
      <Text>Player 2 Wins: {player2Wins}</Text>
      <FlatList
        data={board}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.cell, item === "X" ? styles.xCell : styles.oCell]}
            onPress={() => handleCellPress(index)}
          >
            <Text style={styles.cellText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
      {refresh && <Button title="New Round" onPress={resetGame} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notification: {
    fontSize: 18,
    marginBottom: 10,
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  cellText: {
    fontSize: 24,
  },
  list: {
    width: 325,
    height: 325,
  },
});
