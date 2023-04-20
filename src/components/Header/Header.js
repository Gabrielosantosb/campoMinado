import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Flag from "../Field/Field/Flag/Flag";

// import { Container } from './styles';

export default (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <TouchableOpacity onPress={props.onFlagPress} style={styles.flagButton}>
          <Flag />
        </TouchableOpacity>
        <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
        <Text style={styles.buttonLabel}>Novo Jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  flagContainer: {
    flexDirection: "row",
  },
  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },
  flagsLeft: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 5,
    marginLeft: 20,
  },
  button: {
    marginLeft: 20,
    backgroundColor: "#999",
    padding: 5,
    borderRadius: 10
  },
  buttonLabel: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
