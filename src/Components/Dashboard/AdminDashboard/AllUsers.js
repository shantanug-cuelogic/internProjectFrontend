import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PostIcon from '@material-ui/icons/Receipt';
import { NavLink } from "react-router-dom";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import FolderIcon from '@material-ui/icons/Folder';

import axios from 'axios';

const styles = theme => ({
    root: {
        width: '100%',
   
        maxWidth: 700,
        height:400,
        overflow:'scroll',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10
    },
});

class AllPosts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            AllUsers: [],
            postId: null,
            open: false
        }

        axios.get('/allusers')
            .then((response) => {

                if (response.data.success) {
                    this.setState({
                        AllUsers: [...response.data.result]
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleDelete = (id, index) => {
        axios.put('/deleteuser',{
            authToken: this.props.authToken,
            userIdtoDelete : id
        })
        .then((response)=>{
            console.log(response.data);
            if(response.data.success) {
                let updatedUsers = this.state.AllUsers;
                updatedUsers.splice(index,1);
                this.setState({
                    AllUsers : [...updatedUsers]
                });
                this.props.handleOpenSnackBar("User Deleted");
            }
            else {
                this.props.handleOpenSnackBar("Something went wrong please try again later");
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    render() {

        const { classes } = this.props;

        console.log(this.state.AllUsers);

        let allUsers = null;
        if (this.state.AllUsers.length !== 0) {
            allUsers = this.state.AllUsers.map((element, index) => {
                let name = `${element.firstName}  ${element.LastName}`
                return (
                    <div key={index} >
                        <ListItem>

                            <ListItemAvatar>
                                <Avatar src={element.profileImage}>

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                            //   secondary={element.lastName}
                            />

                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete" onClick={()=>this.handleDelete(element.userId , index)} >
                                    <DeleteIcon />
                                </IconButton>

                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>

                )
            })
        }

         return (
            <div className={classes.root}>

                <List component="nav">
                    {allUsers}
                </List>
                {/* {postHistoryModal} */}

            </div>
        );
    }



}

const mapStateToProps = state => {
    return {
        authToken: state.authReducer.authToken
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AllPosts));