import React from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import Menu from '../Menu/Menu';
import { withStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
import SubHeader from '../../Components/Layout/SubHeader/SubHeader';
const style = {
    Container :{
     
    }
}

class BlogBuilder extends React.Component {


    render() {
const {classes} = this.props;
        return (
            <div className={classes.Container}>
                <SubHeader />
                <Carousel />
                <Paper><Menu /></Paper>
            </div>
        );
    }
}

export default withStyles(style)(BlogBuilder);