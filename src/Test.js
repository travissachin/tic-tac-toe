import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import tileData from './dummy/tile';

import Square from './Square';


const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "45%",
        height: "100%",
    },
    paper: {
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#80ced6",
        justifyContent: "center",
        alignItems: "center"
    },
    square: {
        minWidth: "100%",
        minHeight: "100%"
    }
});
class Test extends React.Component {


    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.handler = this.handler.bind(this);
        this.state = {
            el: null,
            matrix: {
                o: [],
                x: [],
            }
        };
        this.value = null;
    }
    handler(data, id) {
        this.setState({
            el: data
        }, () => {
            this.state.matrix[data == 'o' ? 'o' : 'x'].push(id);
            if (this.state.matrix.o.length >= 3) {
                if (this.diff("o")) {
                    // alert('O wins');
                    this.clear();
                }
            }
            if (this.state.matrix.x.length >= 3) {
                if (this.diff("x")) {
                    alert('X wins');
                    this.clear();
                }
            }
        });



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
            el: null
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
            </div>
        );
    }
    play(e) {
        let next = this.state.el == 'o' || this.state.el == null ? 'x' : 'o';
    }
}

export default withStyles(styles)(Test)