import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, IconButton } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import UserService from '../../../Services/UserService';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 700,
        height: 400,
        overflow: 'scroll',
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
    }
    componentDidMount = async () => {
        const allUserResponse = await UserService.getAllUser();
        if (allUserResponse.success) {
            this.setState({
                AllUsers: [...allUserResponse.result]
            });
        }
    }
    handleDelete = async (id, index) => {
        const deleteUserResponse = await UserService.deleteUser(id);
        if (deleteUserResponse.success) {
            let updatedUsers = this.state.AllUsers;
            updatedUsers.splice(index, 1);
            this.setState({
                AllUsers: [...updatedUsers]
            });
            this.props.handleOpenSnackBar("User Deleted");
        }
        else {
            this.props.handleOpenSnackBar("Something went wrong please try again later");
        }
    }
    render() {
        const { classes } = this.props;
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
                            />
                            <ListItemSecondaryAction>
                                {element.isAdmin === 1 ? null :
                                    <IconButton aria-label="Delete" onClick={() => this.handleDelete(element.userId, index)} >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                );
            });
        }

        return (
            <div className={classes.root}>
                <List component="nav">
                    {allUsers}
                </List>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authToken: state.authReducer.authToken,
        isAdmin: state.authReducer.isAdmin
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