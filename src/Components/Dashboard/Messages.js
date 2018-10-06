import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';

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

} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
     


let messages = null;

if (this.props.messages.length === 0) {
    messages = <p>NO MESSAGES TO SHOW</p>
}
else {
    messages = this.props.messages.map((element, index) => {
        return (
            <div key={index}>
                {/* <p className={classes.RecentActivities} > <b>{element.firstName}</b> : {element.feedback} <i> {moment.unix(element.feedbackTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></p>
                <Divider /> */}

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Avatar src={element.profileImage} ></Avatar>
                        <Typography variant="subheading" style={{marginLeft:20}} >{element.firstName} {element.lastName}</Typography>
                        <Typography variant="caption" style={{fontSize:10, marginLeft:20 }} ><i>{moment.unix(element.messageTimeStamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</i></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                          {element.message}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>
        );
    });
}



        return(
            <Paper className={classes.RecentActivityContainer} >
                            <Typography variant="display1" >
                                Messages
                    </Typography>
                            <Scrollbars >
                                <Paper className={classes.RecentActivity} >

                                    {messages}
                                </Paper>
                            </Scrollbars>
                        </Paper>
        );
    }
}

const mapStateToProps =  state => {
    return {
        messages : state.dashboardReducer.messages
    }
}

export default connect(mapStateToProps)(withStyles(styles)(FollowerStatistics));