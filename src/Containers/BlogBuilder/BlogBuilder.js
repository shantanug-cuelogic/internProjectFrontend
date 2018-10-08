import React from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import Menu from '../../Components/Menu/Menu';
import { Paper } from '@material-ui/core';
import SubHeader from '../../Components/Layout/SubHeader/SubHeader';

class BlogBuilder extends React.Component {
    render() {
        return (
            <div >
                <SubHeader />
                <Carousel />
                <Paper><Menu /></Paper>
            </div>
        );
    }
}

export default BlogBuilder;