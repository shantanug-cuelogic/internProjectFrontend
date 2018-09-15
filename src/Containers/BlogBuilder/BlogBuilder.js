import React from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import Menu from '../Menu/Menu';
import { withStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
const style = {
    Container :{
        marginTop:'10%'
    }
}

class BlogBuilder extends React.Component {


    render() {
const {classes} = this.props;
        return (
            <div className={classes.Container}>
                <Paper><Carousel /> </Paper>
                <Paper><Menu /></Paper>
            </div>
        );
    }
}

export default withStyles(style)(BlogBuilder);