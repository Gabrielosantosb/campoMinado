import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { params } from "./params";
import MineField from "./src/components/Field/Field/MineField/MineField";
import { createMineBoard } from "./src/components/Field/Field/functions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  //Calcular quantidade de bombas
  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    //retorna o menor número inteiro maior ou igual a "x"
    return Math.ceil(cols * rows * params.difficultLevel);
  };
  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMineBoard(rows, cols, this.minesAmount()),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Campo Minado</Text>
        <Text>
          Tamanho grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>
        {/* <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={5} />
      <Field opened nearMines={7} />
      <Field opened mined></Field>
      <Field flagged></Field> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#BBB",
  },
});
