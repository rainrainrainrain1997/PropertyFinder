//@flow

import React,{Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    Text,
    Button,
} from 'react-native';

export default class UnknownPlaces extends Component {





    render() {
        return (
            <Game />
        );
    }


}

function Square(props) {
    return (
        <View  style={styles.square}>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPress}>
                <Text style={styles.item} >{props.value}</Text>
            </TouchableOpacity>
        </View>


    );
}

class Board extends React.Component {


    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onPress={() => this.props.onPress(i)}
            />
        );
    }

    render() {
        return (
            <View style={styles.board}>
                <View style={styles.boardRow}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </View>
                <View style={styles.boardRow}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </View>
                <View style={styles.boardRow}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </View>
            </View>
        );
    }
}

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(""),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <View style={styles.singleInfo}
                    key = {move}>
                    <Button onPress = {() => this.jumpTo(move)}
                            title={desc}
                    ></Button>
                </View>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <View style={styles.container}>
                <View style={styles.playGround}>
                    <Board
                        squares = {current.squares}
                        onPress = {(i) => this.handleClick(i)}
                    />
                </View>
                <View style={styles.gameInfo}>
                    <Text style={{fontSize: 24}}>{status}</Text>
                    {moves}
                </View>
            </View>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i< lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}



const styles = StyleSheet.create({
   container:{
       flex: 1,
       alignItems:'center',
       justifyContent:'center',
       flexDirection: 'row',
   },
    description:{
       fontSize: 44,
       color:'purple',
    },

    square: {
        backgroundColor: '#E6E6FA',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        lineHeight: 34,
        height: 54,
        padding: 0,
        width: 54,

    },

    button:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },

    item:{
        fontSize: 44,
        color:'black',
    },

    playGround: {
        flex: 1,
        alignItems:'flex-end',
        justifyContent:'center',
    },

    board: {
        height:162 ,
        width: 162,
        flexDirection:'column',
        marginRight: 10,
    },

    boardRow: {
        width: 162,
        height: 54,
        flexDirection: 'row',
    },

    gameInfo: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    singleInfo:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
    },

});

