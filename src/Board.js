import React, {Component} from 'react';
import Boxes from './Boxes.js'

class Board extends Component{
    constructor(props){
        super(props)
            this.state={
                boxes:[ "🎁", "🎁", "🎁", "🎁", "🎁", "🎁", "🎁", "🎁", "🎁"],
                checked: false,
                winningBox: null,
                losingBox: null,
                counters: 6,
                gameWinning: false,
                gameLosing: false
        }
    }

    componentDidMount = () => {
        const {boxes} = this.state
        let winner = Math.floor(Math.random()*boxes.length)
        let loser = Math.floor(Math.random()*boxes.length)
        if (winner === loser){
            loser = Math.floor(Math.random()*boxes.length)
        }
        this.setState ({winningBox: winner, losingBox: loser})
        console.log(winner, loser)
    }

    boxLocation = (index) =>{
        const {winningBox, losingBox, boxes} = this.state

        if( index === winningBox){
            boxes[index] = "😸"
            this.setState({
                boxes: boxes,
                gameWinning: true
            })
            window.setTimeout(function(){window.location.reload()}, 200);
            window.setTimeout(function(){alert("You found it!")}, 200);

        } else if (index === losingBox){
            boxes[index] = "🐕"
            this.setState ({
                boxes : boxes,
                gameLosing: true
            })
            window.setTimeout(function(){window.location.reload()}, 200);
            window.setTimeout(function(){alert("You got chased!")}, 200);
        } else {
            boxes[index] = "X"
            this.setState({
                boxes : boxes
            })
        }
    }

    checkCounter = () => {
        let newCount = this.state.counters- 1
        if (newCount < 0){
            this.setState ({
                gameOver: true
            })
            alert("You failed!")
            window.setTimeout(function(){window.location.reload()}, 200);
        } else {
            this.setState({counters: newCount})
        }
    }


    restartGame = () => {
        window.location.reload();
    }


    render(){
      // eslint-disable-next-line
        let {boxes, winningBox} = this.state
        let square = boxes.map((value, index)=> {
            return (
                <Boxes
                value = {value}
                index = {index}
                key = {index}
                boxLocation = {this.boxLocation}
                checkCounter = {this.checkCounter}
                />
            )
        })

        return(
            <div id= "container">
            <h2> Find your cat! </h2>
            <h3> Don't get chased by the dog! </h3>
            <br />
                {!this.state.gameWinning&& !this.state.gameLosing &&
                    <div id="gamebox">
                    {square}
                </div>}
                {this.state.gameWinning&&
                    <div id="gameOn">
                    <img id="dogWin" src="https://i.pinimg.com/originals/25/ea/64/25ea6471cfdc1d807ff46752cbc53598.gif"  alt="GIF"/>
                </div>}
                {this.state.gameLosing &&
                    <div id="gameOff">
                    <img id="dogLose" src="https://i.makeagif.com/media/3-03-2014/dDpSe0.gif" alt="GIF" />
                </div>}
            <h1>Boxes Left : {this.state.counters}</h1>
            <button onClick = {this.restartGame}> Restart Game </button>
            </div>

        )
    }
}


export default Board;
