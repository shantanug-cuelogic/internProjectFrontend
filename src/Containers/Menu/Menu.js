import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import axios from 'axios';
import SummaryGrid from '../../Components/Grids/Summary Grid/Summary Grid';
import { Divider } from '@material-ui/core';

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

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '80%',
    position: 'relative',
    minHeight: 200,
    marginTop:"7%",
    marginLeft:'10%',
    marginRight:'10%',
  
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
  header : {
    position: 'sticky' ,
    top: '63px',
     

  }
});

class FloatingActionButtonZoom extends React.Component {
  state = {
    value: 0,
    recentlyUpdated :[],
    new:[],
    mostLiked:[]
  };
  componentDidMount(){
    axios.get('/post/recent')
    .then((response) =>{
          this.setState({
        new:response.data.result
      })

    })
    .catch((error) => {
      console.log(error)
    });

    axios.get('/post/recentupdated')
    .then((response) =>{
      this.setState({
        recentlyUpdated : response.data.result
      })
    })
    .catch((error) => {
      console.log(error)
    });


    
    axios.get('/post/mostliked')
    .then((response) =>{
      this.setState({
        mostLiked : response.data.result
      })

    })
    .catch((error) => {
      console.log(error)
    })


  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  

  render() {
    const { classes, theme } = this.props;


   
    const newPosts = this.state.new.map((element, index) => (
      <div key={index}>
      <SummaryGrid
          
          title={element.title}
          summary={element.postContent}
          views={"Views : "+element.views }
          likes ={"Likes"+element.likes}
          postId={element.postId}
          postDate={element.postDate}
      />
      <Divider />
      </div> 
    ));
    const mostLikedPosts =this.state.mostLiked.map((element , index) => (
      <div key={index}>
      <SummaryGrid
          
          title={element.title}
          summary={element.postContent}
          views={"Views : "+element.views }
          likes ={"Likes"+element.likes}
          postId={element.postId}
          postDate={element.postDate}
      />
      <Divider />
      </div> 
    ));

    const recentlyUpdatedPosts =this.state.recentlyUpdated.map((element , index) => (
      <div key={index}>
      <SummaryGrid
          
          title={element.title}
          summary={element.postContent}
          views={"Views : "+element.views }
          likes ={"Likes :"+element.likes}
          postId={element.postId}
          postDate={element.postDate}
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
            <Tab label="New" />
            <Tab label="Recently Updated" />
            <Tab label="Most Liked" />
          </Tabs>
        </AppBar>
       
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {newPosts}
           </TabContainer>
          <TabContainer dir={theme.direction}>
          {recentlyUpdatedPosts}
                
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {mostLikedPosts}
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
