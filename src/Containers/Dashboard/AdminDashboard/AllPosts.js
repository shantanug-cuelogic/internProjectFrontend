import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@material-ui/core';
import PostIcon from '@material-ui/icons/Receipt';
import { NavLink } from "react-router-dom";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import PostHistoryModal from './PostHistoryModal';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';
import PostService from '../../../Services/PostService';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 700,
        height: 400,
        overflow: 'scroll',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10,
        border: '2px'
    },
});

class AllPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            AllPosts: [],
            postId: null,
            open: false
        }
    }
    componentDidMount = async () => {
        const allPostResponse = await PostService.getAllPosts();
        if (allPostResponse.success) {
            this.setState({
                AllPosts: [...allPostResponse.result]
            });
        }
    }

    handleDelete = async (id, index) => {
        let allPosts = [...this.state.AllPosts];
        const deletePostResponse = await PostService.deletePost(id);
        if (deletePostResponse.success) {
            this.props.handleOpenSnackBar("Post Deleted Succesfully")
            allPosts.splice(index, 1);
            this.setState({
                AllPosts: [...allPosts]
            });
        }
    }

    handlePostHistory = (postId) => {
        this.setState({
            postId: postId,
            open: true
        });
    }
    render() {
        const { classes } = this.props;
        let allPosts = null;
        if (this.state.AllPosts.length !== 0) {
            allPosts = this.state.AllPosts.map((element, index) => {
                let url = `/post/${element.postId}`
                return (
                    <div key={index} >
                        <ListItem button>
                            <NavLink to={url} style={{ textDecoration: 'none' }}  >
                                <ListItemIcon  >
                                    <PostIcon />
                                </ListItemIcon>
                                <ListItemText primary={element.title} style={{ display: 'inline' }} />
                            </NavLink>
                            <ListItemSecondaryAction>
                                <PostHistoryModal postId={element.postId} />
                                <IconButton aria-label="Delete" onClick={() => this.handleDelete(element.postId, index)} >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                );
            });
        }
        let postHistoryModal = null;
        if (this.state.open) {
            postHistoryModal = <PostHistoryModal postId={this.state.postId} />
        }
        return (
            <div className={classes.root}>
                <List component="nav">
                    {allPosts}
                </List>
                {postHistoryModal}
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