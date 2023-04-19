import React from "react";
import { StyleSheet, View, Text } from "react-native";


import { params } from "../../../../../params";
import Mine from "../Mine/Mine";
import Flag from "../Flag/Flag";

// import { Container } from './styles';

export default (props) => {
  const { mined, opened, nearMines, exploded, flagged } = props;

  const styleField = [styles.field];
  if (styleField.length === 1) styleField.push(styles.regular);
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
  if (flagged) styleField.push(<Flag />, styles.regular);

  let color = null;
  if (nearMines > 0) {
    if (nearMines == 1) color = "blue";
    if (nearMines == 2) color = "green";
    if (nearMines > 2 && nearMines < 6) color = "orange";
    if (nearMines > 6) color = "red";
  }
  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 ? (
        <Text style={[styles.label, { color: color }]}>{nearMines}</Text>
      ) : (
        false
      )}
      {mined && opened ? <Mine /> : false}
      {flagged && !opened ? <Flag /> : false}
    </View>
  );
};

const styles = StyleSheet.create({
  exploded: {
    backgroundColor: "red",
    borderColor: "red",
  },

  opened: {
    backgroundColor: "#444",
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: params.fontSize,
  },

  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderwidth: params.borderSize,
  },
  regular: {
    backgroundColor: "#999",
    borderColor: "black",
    borderWidth: 2,
    // borderLeftColor: "#CCC",
    // borderTopColor: "#CCC",
    // borderRightColor: "#333",
    // borderBottomColor: "#333",
    // shadowColor: "black"
  },
});
