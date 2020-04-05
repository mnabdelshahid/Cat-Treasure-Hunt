import React, {Component} from 'react';

class Boxes extends Component{
    constructor(props){
        super()
    }

    handleClick = (index) => {
        this.props.boxLocation(this.props.index)
        this.props.checkCounter(this.props.counter)
    }

    render(){
        return(
            <div>
            <button class = "Boxes" onClick = {this.handleClick}> {this.props.value} </button>
            </div>
        )
    }
}

export default Boxes;
