import { Component } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { params } from "./params";
import MineField from "./src/components/Field/Field/MineField/MineField";
import {
  createMinedBoard,
  hadExplosion,
  openField,
  showMines,
  wonGame,
  cloneBoard,
  invertFlag,
  flagsUsed
} from "./src/components/Field/Field/functions";
import Header from "./src/components/Header/Header";
import LevelSelection from "./src/components/pages/LevelSelection";

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
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    };
  };
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Burrão");
      //Clonar o tabuleiro
    }
    if (won) {
      Alert.alert("Você ganhou");
    }
    this.setState({ board, lost, won });
  };

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert("Você ganhou");
    }
    this.setState({ board, won });
  };

  onLevelSelected = (level) =>{
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Campo Minado</Text>
        <LevelSelection isVisible={this.state.showLevelSelection} onLevelSelected={this.onLevelSelected}
          onCancel={()=>this.setState({showLevelSelection:false})}
        />
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress = {() =>this.setState({showLevelSelection: true})}
        />
        <View style={styles.board}>
          <MineField
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
          />
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
