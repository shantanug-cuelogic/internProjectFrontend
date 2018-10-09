import React from 'react';
import { Typography, Paper, Divider } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const style = theme => ({
    HeaderContainer: {
        height: '70px',
        paddingTop: '3%'
    },
    PostContainer: {
        padding: '3%'
    },
});


class PostContent extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper>
                    <div className={classes.HeaderContainer}>
                        <Typography variant="display2" color="textPrimary"> {this.props.postTitle} </Typography>
                    </div>
                    <Divider />
                    <div className={classes.PostContainer}>
                        <Typography variant="body2" >
                            <style jsx="true">
                                {`
                                    img {
                                    max-width : 100%
                                         }
                                `}
                            </style>
                            {ReactHtmlParser(this.props.postContent)}
                        </Typography>
                    </div>
                </Paper>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        postTitle: state.postReducer.postTitle,
        postContent: state.postReducer.postContent
    }
}

export default connect(mapStateToProps)(withStyles(style)(PostContent));