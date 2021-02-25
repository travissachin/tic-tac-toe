import React from "react";
import anime from 'animejs/lib/anime.es.js';
import '../src/css/style.css';

class Animator extends React.Component {

    componentDidMount() {

        let el = this.myRef.current;
        console.log(el);
        anime({
            targets: [el],
            translateX: 250,
            loop: true
          });
    }

    componentDidUpdate() {



    }
    constructor(props) {
        super(props);

        this.myRef = React.createRef();
    }
    render() {
        return (
            <div ref={this.myRef} className="square">
              
            </div>
        );
    }

}
export default Animator;