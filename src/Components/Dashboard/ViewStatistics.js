import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
    Paper,
    Typography,

} from '@material-ui/core';
import ViewPieChart from '../ViewPieChart/ViewPieChart';

const styles = theme => ({
    PieChartContainer: {
        marginLeft: 333,
        marginTop: 20
    }
});


class ViewStatistics extends React.Component {
    render() {
        const { classes } = this.props;

        let viewStatistics = null;

        if (this.props.posts === 0) {
            viewStatistics = <p>YOU DONT HAVE ANY POSTS</p>
        }
        else if (this.props.views === 0) {
            viewStatistics = <p>YOUR POST DONT HAVE ANY VIEWS YET</p>
        }
        else {
            viewStatistics = <Paper>
                <ViewPieChart userId={this.props.userId} />
                <Typography variant="caption" > Views per post </Typography>
            </Paper>
        }

        return (

            <div className={classes.PieChartContainer} >
                <Paper  >
                    <Typography variant="display1" > Views Statistics </Typography>
                    {viewStatistics}
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        posts: state.dashboardReducer.posts,
        views: state.dashboardReducer.views,

    }
}

export default connect(mapStateToProps)(withStyles(styles)(ViewStatistics));