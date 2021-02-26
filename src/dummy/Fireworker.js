import React from 'react';
import firework from '../dummy/firework';

class Fireworker extends React.Component{
    constructor(props){
        super(props);
        this.fw= React.createRef();
    }
    componentDidMount(){
        this.firework= new firework(this.fw.current);
    }
    render(){
        return (
            <canvas className="fireworks" ref={this.fw}></canvas>
        );
    }
}
export default Fireworker;