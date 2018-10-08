import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';

import {
    Paper,
    Divider,
    Typography
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
        let followers = null;

        if (this.props.followers.length === 0) {
            followers = <p>NO FOLLOWERS TO SHOW</p>
        }
        else {
            followers = this.props.followers.map((element, index) => {
                return (
                    <div key={index}>
                        <p className={classes.RecentActivities} > <b>{element.firstName}</b> followed you  on <i> {moment.unix(element.followTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></p>
                        <Divider />
                    </div>
                );
            });
        }

        return (
            <Paper className={classes.RecentActivityContainer} >
                <Typography variant="display1" >
                    Followers
                    </Typography>
                <Paper className={classes.RecentActivity} >
                    <Scrollbars>
                        {followers}
                    </Scrollbars>


                </Paper>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        followers: state.dashboardReducer.followers
    }
}

export default connect(mapStateToProps)(withStyles(styles)(FollowerStatistics));