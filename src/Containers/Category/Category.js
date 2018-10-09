import React from "react";
import { withStyles } from '@material-ui/core/styles';
import SubHeader from '../../Components/Layout/SubHeader/SubHeader';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import { withRouter } from 'react-router'
import CategoryService from '../../Services/CategoryService';
import CategoryPosts from '../../Components/CategoryPosts/CategoryPosts';

const styles = {
    PostContainer: {
        marginTop: '10%'
    }
}

class Category extends React.PureComponent {
    componentDidMount = async () => {
        let categoryPostResponse = await CategoryService.getCategoryPosts(this.props.match.params.id);
        if (categoryPostResponse.success) {
            this.props.categoryFetchPostReducer(categoryPostResponse.result);
        }
    }
    componentWillReceiveProps = async (nextProps) => {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            let categoryPostResponse = await CategoryService.getCategoryPosts(nextProps.match.params.id);
            if (categoryPostResponse.success) {
                this.props.categoryFetchPostReducer(categoryPostResponse.result);
            }
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.Container}>
                <SubHeader className={classes.SubHeaderContainer} />
                <div className={classes.PostContainer}>
                    <CategoryPosts />
                </div>
            </div>
        );
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
export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(Category)));