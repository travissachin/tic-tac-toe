import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import anime from 'animejs/lib/anime.es.js';
import { ReactComponent as LetterO } from './svg/letter-o.svg';
import { ReactComponent as LetterX } from './svg/letter-x.svg';

const styles = (theme) => ({
    el: {
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
    componentDidUpdate(prevProps) {
        if (this.props.el === null && prevProps.el !== null) {
            console.log(this.props.el, prevProps.el);
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
            //     translateX: path('x'),
            //     translateY: path('y'),
            //     rotate: path('angle'),
            //     easing: 'linear',
            //     duration: 2000,
            //     loop: true
            //   });
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