import React from 'react';
import Slider from "react-slick";
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import PopularPosts from '../PopularPosts/PopularPosts';
import style from './CarouselStyle';

class Carousel extends React.Component {
    render() {
        const { classes } = this.props;

        const settings = {
            className: "center",
            centerMode: false,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1,
            speed: 2000,
            dots: true,
            autoplay: true,
            autoplaySpeed: 6000,
            pauseOnHover: true,
            adaptiveHeight: true,

        };
        return (

            <div className={classes.Container}  >
                <Typography variant="display1"  > Most Popular ... </Typography>
                <Paper>
                    <div style={{ overflow: 'hidden' }}>
                        <Slider {...settings} className={classes.CarouselContainer}  >
                            <PopularPosts />
                        </Slider>
                    </div>
                </Paper>

            </div>

        )

    }


}

export default withStyles(style)(Carousel);