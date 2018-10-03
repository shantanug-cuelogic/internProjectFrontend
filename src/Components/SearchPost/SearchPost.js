import React from "react";
import { withStyles } from '@material-ui/core/styles';
import SubHeader from '../Layout/SubHeader/SubHeader';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import CategoryGrid from '../Grids/Category Grid/CategoryGrid';
import { Grid , Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { withRouter } from 'react-router'
;


const styles = theme => ( {
    PostContainer: {
        marginTop: '10%'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },

})

class SearchResult extends React.Component {

    state = {
        age: '',
        open: false,
      };    

    render() {

  
        console.log( this.props.location.state.searchResult);
        let posts =null ;
        if(this.props.location.state.searchResult.length === 0 ) {
            posts = <p>NO POST AVAILABLE FOR CURRENT CATEGORY</p>
        }
        else {
            posts = this.props.location.state.searchResult.map((post,index)=>{
                let link =  `/post/${post.postId}`
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
                    link ={link}
                    />
                    </Grid>
                );
            });
        }
        

     let form =   <form autoComplete="off">
     
        <FormControl>
          <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </form>




        const { classes } = this.props;
        return (
            <div className={classes.Container}>
                <SubHeader className={classes.SubHeaderContainer} />
                <div className={classes.PostContainer}>
                    {form}
               

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