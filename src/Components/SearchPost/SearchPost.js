import React from "react";
import { withStyles } from '@material-ui/core/styles';
import SubHeader from '../Layout/SubHeader/SubHeader';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import CategoryGrid from '../Grids/Category Grid/CategoryGrid';
import { Grid } from '@material-ui/core';
import { withRouter } from 'react-router'
import SearchGrid from '../Grids/Category Grid/CategoryGrid';


const styles = {
    PostContainer: {
        marginTop: '10%'
    },


}

class SearchResult extends React.Component {


    render() {

  

        let posts =null ;
        if(this.props.location.state.searchResult.length === 0 ) {
            posts = <p>NO POST AVAILABLE FOR CURRENT CATEGORY</p>
        }
        else {
            posts = this.props.location.state.searchResult.map((post,index)=>{
                return (
                    <Grid item>
                    <CategoryGrid
                    key={index}
                    postTitle = {post.title}
                    postContent = {post.postContent}
                    postId={post.postId}
                    likes={post.likes}
                    views ={post.views}
                    thumbnail={post.thumbnail}
                    />
                    </Grid>
                );
            });
        }
     



        const { classes } = this.props;
        return (
            <div className={classes.Container}>
                <SubHeader className={classes.SubHeaderContainer} />
                <div className={classes.PostContainer}>

                    {/* <div>{ this.props.match.params.id}</div> */}

                    <Grid container
                        direction="row"
                        spacing={24}
                        justify="center" >  
                        {posts}
                        {/* {contents} */}
                    </Grid>




                </div>
            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        categoryPosts: state.categoryPostReducer.categoryPosts
    }
}

const mapDispatchToProps = dispatch => {
    return {

        categoryFetchPostReducer: (posts) => dispatch({
            type: actionTypes.FETCH_POST_CATEGORY,
            categoryPosts: posts
        })

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchResult)));