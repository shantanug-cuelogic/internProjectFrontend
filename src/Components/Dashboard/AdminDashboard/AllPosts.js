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
import PostHistoryIcon from '@material-ui/icons/ListAlt';
import PostHistoryModal from './PostHistoryModal';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/Actions/actionTypes';

import axios from 'axios';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 300,

        backgroundColor: theme.palette.background.paper,
        marginTop: 10
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

        axios.get('/post/')
            .then((response) => {

                if (response.data.success) {
                    this.setState({
                        AllPosts: [...response.data.result]
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleDelete = (id, index) => {

        let allPosts = [...this.state.AllPosts];
        axios.post('/post/delete', {
            authToken: this.props.authToken,
            postIdtoDelete: id
        })
            .then((response) => {

                if (response.data.success) {

                    this.props.handleOpenSnackBar("Post Deleted Succesfully")
                    allPosts.splice(index, 1);
                    this.setState({
                        AllPosts: [...allPosts]
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handlePostHistory = (postId) => {
        this.setState({
            postId: postId,
            open: true
        })
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

                )
            })
        }

        let postHistoryModal = null;
        if(this.state.open) {
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