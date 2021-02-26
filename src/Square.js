import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import anime from 'animejs/lib/anime.es.js';
import { ReactComponent as LetterO } from './svg/letter-o.svg';
import { ReactComponent as LetterX } from './svg/letter-x.svg';

import Firework from './dummy/firework';
const styles = (theme) => ({
    el: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    svg: {
        width: 100,
        height: 100,

    }
});
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: null
        });
        this.myRef = React.createRef();
        this.update = this.update.bind(this);

    }
    componentDidMount() {
        // this.firework= new Firework(this.myRef.current);


    }
    componentDidUpdate(prevProps) {
        if (this.props.el === null && prevProps.el !== null) {
            this.setState({
                data: null
            });
        }
    }
    update = () => {
        this.setState({
            data: this.props.el === 'o' ? 'x' : 'o' || 'o'
        }, () => {
            let el = this.myRef.current;
            // anime({
            //     targets: el,
            //     translateX: 50,
            //     endDelay: 50,
            //     direction: 'alternate',
            //     loop: true
            //   });
            anime({
                targets: el,
                translateX: {
                    value: '*=2.5', // 100px * 2.5 = '250px'
                    duration: 1000
                },
                width: {
                    value: '-=20px', // 28 - 20 = '8px'
                    duration: 1800,
                    easing: 'easeInOutSine'
                },
                rotate: {
                    value: '+=2turn', // 0 + 2 = '2turn'
                    duration: 1800,
                    easing: 'easeInOutSine'
                },
                direction: 'alternate',
                loop: true
            })
            this.props.handler(this.state.data, this.props.id);
        });
    }
    render() {
        const { classes } = this.props;
        let letter = null;
        if (this.state.data) {
            letter = this.state.data === 'o' ? <LetterO className={classes.svg} /> : <LetterX className={classes.svg} />;
        }
        return (
            <div onClick={this.update} className={classes.el} ref={this.myRef}>
                { letter === undefined ? '' : letter}
            </div>

        );
    }
}
export default withStyles(styles)(Square);