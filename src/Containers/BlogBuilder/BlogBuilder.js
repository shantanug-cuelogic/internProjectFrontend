import React, { NavLink } from 'react';
import Carousel from '../../Components/Carousel/Carousel';
import SummaryGrid from '../../Components/Grids/Summary Grid/Summary Grid';
import classes from './BlogBuilder.css'


class BlogBuilder extends React.Component {

    editorHandler = () => {
        
    }

    render() {
        return (
            <div className={classes.Container}>
                <Carousel />
                <SummaryGrid
                    title={"The Burger Builder App"}
                    summary={"This is summary for the burger builder app"}
                    views={"Views :12212121"}
                    onClick={this.editorHandler}
                />


            </div>

        );
    }
}

export default BlogBuilder;