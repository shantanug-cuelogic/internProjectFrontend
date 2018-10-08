import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
    Paper,
    Drawer,
    Divider,
    Typography,
    Button,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Avatar,
    Grid

} from '@material-ui/core';


const drawerWidth = 340;
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
    control: {
        padding: theme.spacing.unit * 2,
    },
    HeaderContainer: {
        marginTop: '7%',
        marginLeft: '30%'
    },
    drawerPaper: {
        zIndex: 1,
        width: drawerWidth,
        overflow: 'hidden'
    },
    ProfileContainer: {
        marginTop: '15%',
        overflowY: 'scroll'

    },
    Icons: {
        padding: '0%'
    },
    RecentActivityContainer: {
        height: 300,
        marginTop: 20,
        marginLeft: 333
    },
    RecentActivity: {
        height: 230,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        overflow: 'scroll'
    },
    RecentActivities: {
        fontSize: 20,
        color: '#262626'
    },
    PieChartContainer: {
        marginLeft: 333,
        marginTop: 20
    }
});






class UserStatistics extends React.Component {
    render() {
        const { classes } = this.props;

        return(
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
        likes : state.dashboardReducer.likes,
        posts : state.dashboardReducer.posts,
        views : state.dashboardReducer.views,
        comments : state.dashboardReducer.comments,
 
    }
}
export default connect(mapStateToProps)(withStyles(styles)(UserStatistics));