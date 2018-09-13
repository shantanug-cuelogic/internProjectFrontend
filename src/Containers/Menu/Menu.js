import React from 'react';
import PropTypes, { element } from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import SummaryGrid from '../../Components/Grids/Summary Grid/Summary Grid';
import { StickyContainer, Sticky } from 'react-sticky';



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
    width: '100%',
    position: 'relative',
    minHeight: 200,
    marginTop:"7%"
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
});

class FloatingActionButtonZoom extends React.Component {
  state = {
    value: 0,
    abc : ['a','b','c','d']
  };

  componentDidMount(){
    
      
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  

  render() {
    const { classes, theme } = this.props;

    var contain = this.state.abc.map((element,isd) =>(
        <SummaryGrid
        key={isd}
        title={"The Burger Builder App"}
        summary={"This is summary for the burger builder app"}
        views={"Views : "+element }
        click={this.editorHandler}
    />
      ))

    return (
      <div className={classes.root}>
       
       <AppBar position="static" color="primary">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            fullWidth
          >
            <Tab label="Recently Updated" />
            <Tab label="New" />
            <Tab label="Most Liked" />
          </Tabs>
        </AppBar>
              
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
                {contain}
           </TabContainer>
          <TabContainer dir={theme.direction}>
          
                <SummaryGrid
                    title={"The Burger Builder App"}
                    summary={"This is summary for the burger builder app"}
                    views={"Views :12212121"}
                    onClick={this.editorHandler}
                />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            
          <SummaryGrid
                    title={"The Burger Builder App"}
                    summary={"This is summary for the burger builder app"}
                    views={"Views :12212121"}
                    onClick={this.editorHandler}
                />
          </TabContainer>
        </SwipeableViews>

      </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
