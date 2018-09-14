import React, { NavLink } from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import { StickyContainer, Sticky } from 'react-sticky';

import Menu from '../Menu/Menu';
import Paper from '@material-ui/core/Paper';

import classes from './BlogBuilder.css'


class BlogBuilder extends React.Component {

    editorHandler = () => {

    }

    render() {
        return (
            <div className={classes.Container}>
                <Carousel />
                
                <Menu />
                
                
            </div>
        );
    }
}

export default BlogBuilder;