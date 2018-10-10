import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import PopularPosts from '../PopularPosts/PopularPosts';
import style from './CarouselStyle';

class Carousel extends React.Component {
    render() {
        const { classes } = this.props;


        return (

            <div className={classes.Container}  >
                <Typography variant="display1"  > Most Popular ... </Typography>
                <Paper>
                    <div style={{ overflow: 'hidden' }}>
                        <PopularPosts />
                    </div>
                </Paper>

            </div>

        )

    }


}

export default withStyles(style)(Carousel);