import React from 'react';

import UserStatistics from '../../../Components/Dashboard/UserStatistics';
import ViewStatistics from '../../../Components/Dashboard/ViewStatistics';
import FollowerStatistics from '../../../Components/Dashboard/FollowerStatistics';
import FeedbackStatistics from '../../../Components/Dashboard/FeedbackStatistics';
import RecentActivity from '../../../Components/Dashboard/RecentActivity'; 
import Messages from '../../../Components/Dashboard/Messages'; 


// import {

// } from '@material-ui/core';

class UserDashboard extends React.Component {

    render () {
        return(
            <div>
            
                <UserStatistics />
                <ViewStatistics />
                <FollowerStatistics />
                <FeedbackStatistics />
                < RecentActivity />
                <Messages />
            </div>

        );
    }

}
export default UserDashboard ;