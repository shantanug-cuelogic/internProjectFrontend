import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper, List, Drawer, Divider, ListItem } from '@material-ui/core';
import Profile from '../Profile/Profile';

const drawerWidth = 340;
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '10%'
    },
    paper: {
        height: 240,
        width: 200,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    drawerPaper: {
        zIndex:1,
        width: drawerWidth,
      },
      ProfileContainer : {
          marginTop:'10%'
      }  
});

class DashBoard extends React.Component {
    state = {
        spacing: '16',
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <div>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                <div className={classes.ProfileContainer}>
                <Profile />
                </div>
                 
                    
                <Divider />
                {/* <List>{otherMailFolderListItems}</List> */}
                </Drawer>
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo}
                        justify="flex-end"
                        spacing={16}
                    >

                        <Grid item >
                            <Paper className={classes.paper} />
                        </Grid>
                        <Grid item >
                            <Paper className={classes.paper} />
                        </Grid>
                        <Grid item >
                            <Paper className={classes.paper} />
                        </Grid>
                        <Grid item >
                            <Paper className={classes.paper} />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            </div >

        )
    }
}

export default withStyles(styles)(DashBoard);