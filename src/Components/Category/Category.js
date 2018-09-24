import React from "react";
import { withStyles } from '@material-ui/core/styles';
import SubHeader from '../Layout/SubHeader/SubHeader';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import CategoryGrid from '../Grids/Category Grid/CategoryGrid';
import {Grid} from '@material-ui/core';
import { withRouter } from 'react-router'



const styles = {
    PostContainer : {
 marginTop:'10%'
    },
    
    
}

class Category extends React.Component {

    componentDidMount() {
        
        axios.get('/post/category/'+this.props.match.params.id)
        .then((response)=>{
        
            if(response.data.success) {
                   
                this.props.categoryFetchPostReducer(response.data.result);
            }
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    // componentDidUpdate() {
    //     axios.get('/post/category/'+this.props.match.params.id)
    //     .then((response)=>{
        
    //         if(response.data.success) {
                   
    //             this.props.categoryFetchPostReducer(response.data.result);
    //         }
            
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }

render() {


    let posts =null ;
    if(this.props.categoryPosts.length === 0 ) {
        posts = <p>NO POST AVAILABLE FOR CURRENT CATEGORY</p>
    }
    else {
        posts =  this.props.categoryPosts.map((post,index)=>{
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
     
    
        const {classes} = this.props;
        return(
            <div className={classes.Container}>
                <SubHeader className={classes.SubHeaderContainer} /> 
                <div className={classes.PostContainer}>
                
                {/* <div>{ this.props.match.params.id}</div> */}
               
                <Grid container
                direction="row" 
                spacing={24}
                justify="center" >
                {posts}
                </Grid>
                
                
               
               
            </div>
            </div>
            
            
        )
    }
}

const mapStateToProps = state =>{
    return {
        categoryPosts: state.categoryPostReducer.categoryPosts
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        
        categoryFetchPostReducer : (posts) => dispatch({
            type: actionTypes.FETCH_POST_CATEGORY,
            categoryPosts : posts
        })

    }
}

export default withRouter (connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Category)));