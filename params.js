import { Dimensions } from "react-native"

export const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, // Proporção de cabeçalho = 15%, o resto 85%
    difficultLevel:0.1,
    
    
    //Calcular quantidade de colunas disponiveis de acordo com o bloco
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width/this.blockSize)
    },
    //Calcular quantidade de linhas disponiveis de acordo com o bloco
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight/this.blockSize)
    }
}