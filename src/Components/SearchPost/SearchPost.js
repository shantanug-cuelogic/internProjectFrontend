import React from "react";
import { withStyles } from '@material-ui/core/styles';
import SubHeader from '../Layout/SubHeader/SubHeader';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/Actions/actionTypes';
import {
    Button,
    MenuItem,
    FormControl,
    Select,
    Divider
} from '@material-ui/core';
import { withRouter } from 'react-router';
import styles from './SearchPostStyle';
import SearchResult from './SearchResult/SearchResult';
import PostService from '../../Services/PostService';
class SearchPost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchByFilter: false,
            filterName: null,
            open: false,
            filterOpen: false,
            filterValue: null,
            searchResult: []
        };
    }

    componentDidMount() {
        this.setState({
            searchResult: [...this.props.location.state.searchResult]
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleFilterOpen = () => {
        this.setState({ filterOpen: true });
    };

    handleFilterClose = () => {
        this.setState({ filterOpen: false });
    };

    handleFilter = async () => {

        if (this.state.filterName === null || this.state.filterValue === null) {
            this.props.handleOpenSnackBar("Enter both the filter fields");
        }
        else {
            const filterResponse = await PostService.getPostsByFilter(this.state.filterName, this.state.filterValue);
            if (filterResponse.success) {
                this.setState({
                    searchResult: [...filterResponse.result]
                });
            }
            else {
                this.setState({
                    searchResult: []
                });
                this.props.handleOpenSnackBar(filterResponse.message)
            }
        }
    }
    handleOpenFilters = async () => {
        const allPostResponse = await PostService.getAllPosts();
        if (allPostResponse.success) {
            this.setState({
                searchByFilter: true,
                searchResult: [...allPostResponse.result]
            });
        }
    }

    render() {
        const { classes } = this.props;
        let filter = [];
        if (this.state.filterName === 'year') {
            filter = [<MenuItem value="2017">2017</MenuItem>,
            <MenuItem value="2018">2018</MenuItem>,
            <MenuItem value="2019">2019</MenuItem>
            ]
        }
        else if (this.state.filterName === 'month') {
            filter = [
                <MenuItem value={1}>Jan</MenuItem>,
                <MenuItem value={2}>Feb</MenuItem>,
                <MenuItem value={3}>March</MenuItem>,
                <MenuItem value={4}>April</MenuItem>,
                <MenuItem value={5}>May</MenuItem>,
                <MenuItem value={6}>June</MenuItem>,
                <MenuItem value={7}>July</MenuItem>,
                <MenuItem value={8}>August</MenuItem>,
                <MenuItem value={9}>September</MenuItem>,
                <MenuItem value={10}>October</MenuItem>,
                <MenuItem value={11}>November</MenuItem>,
                <MenuItem value={12}>December</MenuItem>,
            ]
        }
        else if (this.state.filterName === 'day') {

            for (let i = 1; i < 32; i++) {
                filter.push(<MenuItem value={i} >{i}</MenuItem>);
            }
        }
        return (
            <div className={classes.Container}>
                <SubHeader className={classes.SubHeaderContainer} />
                <div className={classes.PostContainer}>
                    {this.state.searchByFilter ?
                        <div className={classes.FilterContainer} >
                            <form autoComplete="off" style={{ display: 'inline' }}>
                                <FormControl>
                                    <Select
                                        style={{ width: 200 }}
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        onOpen={this.handleOpen}
                                        value={this.state.filterName}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'filterName',
                                        }}
                                    >
                                        <MenuItem value="year">Year</MenuItem>
                                        <MenuItem value="month">Month</MenuItem>
                                        <MenuItem value="day">Day</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                            {this.state.filterName === null ? null :
                                <form autoComplete="off" style={{ display: 'inline', marginLeft: 30 }} >
                                    <FormControl>
                                        <Select
                                            style={{ width: 200 }}
                                            open={this.state.filterOpen}
                                            onClose={this.handleFilterClose}
                                            onOpen={this.handleFilterOpen}
                                            value={this.state.filterValue}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'filterValue',
                                            }}
                                        >
                                            {filter}
                                        </Select>
                                    </FormControl>
                                </form>
                            }
                            <div style={{ marginTop: 20 }} >
                                <Button variant="outlined" color="primary" onClick={this.handleFilter} > SEARCH </Button>
                            </div>
                        </div>
                        : <Button variant="outlined" color="primary" onClick={this.handleOpenFilters} > Search By Filter </Button>}
                    <Divider style={{ marginBottom: 20 }} />
                    < SearchResult searchResult={this.state.searchResult} />
                </div>
            </div>
        );

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
        }),
        handleOpenSnackBar: (snackBarMessage) => dispatch({
            type: actionTypes.SNACKBAR_OPEN,
            snackBarMessage: snackBarMessage
        })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchPost)));