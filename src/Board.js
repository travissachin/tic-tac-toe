import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import tileData from './dummy/tile';
import Square from './Square';
import Firework from './dummy/firework';



const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100vh",
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "50%",
    },
    paper: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "#8aacc8",
        color: "white"
    },
    square: {
        minWidth: "100%",
        minHeight: "100%"
    },
    canvas: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        display: "block"
        // textAlign: center
    },
    hidden: {
        display: "none"
    }
});
class Board extends React.Component {


    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.handler = this.handler.bind(this);
        this.state = {
            el: null,
            matrix: {
                o: [],
                x: [],
            },
            winner: false
        };
        this.value = null;
        this.firework = null;

        this.fw = React.createRef();
    }
    componentDidMount() {
        this.firework = new Firework(this.fw.current);
    }
    handler(data, id) {
        this.setState({
            el: data,
            winner: false
        }, () => {
            this.state.matrix[data == 'o' ? 'o' : 'x'].push(id);
            if (this.state.matrix.o.length >= 3) {
                if (this.diff("o")) {
                    this.setState({
                        winner: true
                    });
                    this.winner("O");
                    // this.clear();
                }
            }
            if (this.state.matrix.x.length >= 3) {
                if (this.diff("x")) {
                    this.setState({
                        winner: true
                    });
                    this.winner("X");
                    // this.clear();
                }
            }
        });
    }
    winner = (win) => {
        alert(win + " Won");
        this.firework.autoClick();
        this.firework.setCanvasSize();
        setTimeout(() => {
            var r = window.confirm("One more time?");
            if (r == true) {
                this.clear();
            }
        }, 3000);

        // window.addEventListener('resize', this.firework.setCanvasSize, false);


    }
    diff(obj) {
        let correct = {
            r1: { value: [1, 2, 3], count: 0 },
            r2: { value: [4, 5, 6], count: 0 },
            r3: { value: [7, 8, 9], count: 0 },
            c1: { value: [1, 4, 7], count: 0 },
            c2: { value: [2, 5, 8], count: 0 },
            c3: { value: [3, 6, 9], count: 0 },
            d1: { value: [3, 5, 7], count: 0 },
            d2: { value: [1, 5, 9], count: 0 },

        };
        var result = false;
        let matrix = this.state.matrix[obj];
        Object.keys(correct).forEach(c => {
            let arr = correct[c].value;
            arr.forEach(r => {
                if (matrix.includes(r)) correct[c].count += 1;
            });
            if (correct[c].count == 3) {
                result = true;
                return false;
            }

        });

        return result;
    }
    clear() {
        this.state.matrix.o = [];
        this.state.matrix.x = [];
        this.setState({
            el: null,
            winner: false
        });
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {tileData.map((tile, i) => (
                        <GridListTile key={tile.img} cols={tile.cols || 1} className={classes.gridList}>
                            {/* <img src={tile.img} alt={tile.title} /> */}
                            <Paper className={classes.paper}>
                                <Square handler={this.handler} className={classes.square} el={this.state.el} id={i + 1} />
                            </Paper>
                        </GridListTile>
                    ))}
                </GridList>
                <canvas className="fireworks" ref={this.fw} className={this.state.winner ? classes.canvas : classes.hidden}></canvas>
            </div>
        );
    }
    play(e) {
        let next = this.state.el == 'o' || this.state.el == null ? 'x' : 'o';
    }
}

export default withStyles(styles)(Board)