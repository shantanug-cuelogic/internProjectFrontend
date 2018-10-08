import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import { Divider,AppBar,Tabs,Tab,Typography, } from '@material-ui/core';
import axios from 'axios';
import SummaryGrid from '../../Components/Grids/Summary Grid/Summary Grid';
import styles from './MenuStyle';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


class FloatingActionButtonZoom extends React.Component {
  state = {
    value: 0,
    posts: []
  };
  componentDidMount() {
    axios.get('/post/recent')
      .then((response) => {
        this.setState({
          posts: response.data.result
        })

      })
      .catch((error) => {
        console.log(error)
      });

  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handlePostCategory = (category) => {
    axios.get(`/post/${category}`)
      .then((response) => {
        this.setState({
          posts: response.data.result
        })
      })
      .catch((error) => {
        console.log(error)
      });

  }


  render() {
    const { classes, theme } = this.props;



    const posts = this.state.posts.map((element, index) => (
      <div key={index}>
        <SummaryGrid

          title={element.title}
          summary={element.postContent}
          views={"Views : " + element.views}
          likes={"Likes" + element.likes}
          postId={element.postId}
          postDate={element.postDate}
          thumbnail={element.thumbnail}
        />
        <Divider />
      </div>
    ));
    return (
      <div className={classes.root}>
        <div className={classes.StickyHeader}>
          <AppBar position="static" color="primary" className={classes.header}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              fullWidth
            >
              <Tab label="New" onClick={() => this.handlePostCategory('recent')} />
              <Tab label="Recently Updated" onClick={() => this.handlePostCategory('recentupdated')} />
              <Tab label="Most Liked" onClick={() => this.handlePostCategory('mostliked')} />
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction} >
              {posts}
            </TabContainer>
            <TabContainer dir={theme.direction} >
              {posts}

            </TabContainer>
            <TabContainer dir={theme.direction} s>
              {posts}
            </TabContainer>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};



export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
