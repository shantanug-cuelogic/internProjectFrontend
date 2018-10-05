import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Receipt';
import DraftsIcon from '@material-ui/icons/Face';
import Allposts from './AllPosts';
import AllUsers from './AllUsers';
import { Scrollbars } from 'react-custom-scrollbars';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    marginLeft: 570,
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,

  },
});

class AdminDashboard extends React.Component {

  state = {
    showAllPosts: false,
    showAllUsers: false
  }

  handleAllPosts = () => {
    let currentState = this.state.showAllPosts;
    this.setState({
      showAllPosts: !currentState,
      showAllUsers:false
    });
  }

  handleAllUsers = () => {
    let currentState = this.state.showAllUsers;
    this.setState({
      showAllUsers: !currentState,
      showAllPosts:false
    });
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.handleAllPosts} >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
          <Divider />
          <ListItem button onClick={this.handleAllUsers} >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
        {/* <Scrollbars> */}
        {this.state.showAllPosts ? <Allposts /> : null}
        {this.state.showAllUsers ? <AllUsers /> : null}
        {/* </Scrollbars> */}

      </div>
    )
  }

}

export default withStyles(styles)(AdminDashboard);