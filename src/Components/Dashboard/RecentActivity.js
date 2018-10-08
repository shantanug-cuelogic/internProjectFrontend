import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';

import {
    Paper,
    Divider,
    Typography,
} from '@material-ui/core';

const styles = theme => ({
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

});

class FollowerStatistics extends React.Component {
    render() {
const { classes } = this.props;
     

let recentactivity = null;

if (this.props.recentActivity.length === 0) {
    recentactivity = <p>NO RECENT ACTIVITY TO SHOW</p>
}
else {
    recentactivity = this.props.recentActivity.map((element, index) => {
        return (
            <div key={index}>
                <p className={classes.RecentActivities} >You  {element.activityType} <b> {element.title}</b> on <i> {moment.unix(element.activityTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></p>
                <Divider />
            </div>
        );
    });
}


        return(
            <Paper className={classes.RecentActivityContainer} >
                            <Typography variant="display1" >
                                Recent Activity
                    </Typography>
                            <Scrollbars >
                                <Paper className={classes.RecentActivity} >

                                    {recentactivity}
                                </Paper>
                            </Scrollbars>
                        </Paper>
        );
    }
}

const mapStateToProps =  state => {
    return {
        recentActivity : state.dashboardReducer.recentActivity
    }
}

export default connect(mapStateToProps)(withStyles(styles)(FollowerStatistics));