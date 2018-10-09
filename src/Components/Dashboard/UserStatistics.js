import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
    Paper,
    Typography,
    Grid
} from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '2%'
    },
    paper: {
        height: 150,
        width: 200,
        backgroundColor: fade(theme.palette.primary.light, 0.25)
    },
    Icons: {
        padding: '0%'
    },

});
class UserStatistics extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container
                            justify="flex-end"
                            spacing={16}
                        >
                            <Grid item >
                                <Paper className={classes.paper} >
                                    <img src="/require/likeicon.jpg" alt="Like Icon" height="100px" className={classes.Icons}></img>
                                    <Typography variant="body2">
                                        Total No Of Likes : {this.props.likes}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                    <img src="/require/viewicon.jpg" alt="View Icon" height="100px" className={classes.Icons}></img>
                                    <Typography variant="body2">
                                        Total No Of Views : {this.props.views}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                    <img src="/require/posticon.jpg" alt="Post Icon" height="100px" className={classes.Icons}></img>
                                    <Typography variant="body2" >
                                        Total No Of Posts : {this.props.posts}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item >
                                <Paper className={classes.paper} >
                                    <img src="/require/commenticon.jpg" alt="Post Icon" height="100px" className={classes.Icons}></img>
                                    <Typography variant="body2" >
                                        Total No Of Comments : {this.props.comments}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        likes: state.dashboardReducer.likes,
        posts: state.dashboardReducer.posts,
        views: state.dashboardReducer.views,
        comments: state.dashboardReducer.comments,
    }
}
export default connect(mapStateToProps)(withStyles(styles)(UserStatistics));