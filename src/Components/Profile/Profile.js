import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';



const styles =  themes => ({
paper :{
    height:200,
    width:200
},

ProfileContainer : {
    margin:'10%'
},

ProfileAvatar : {
    marginTop:'',
    marginLeft:25,
    height:150,
    width:150
},

ProfileInformation:{
    height:30,
    borderRadius:30,
    
},
Divider : {
    margin:10
}

});

const profile = (props) => {
    const {classes} = props;
    return(
        <div className={classes.ProfileContainer }>
            <Grid 
            container
            justify="center"
            >
                <Grid item style = {{marginBottom:20}}>
                    <Paper className={classes.paper}>
                        <Avatar src="burger-logo.png" className={classes.ProfileAvatar} />
                    </Paper>
                </Grid>
            </Grid>
            <Divider className={classes.Divider} />
            <Typography variant="display2" > Shantanu Gade</Typography>
            <Divider className={classes.Divider} />
            <Typography variant="display1" >No of Post: 99 </Typography>
            <Divider className={classes.Divider} />
            <Typography variant="title" > shantanu.gade@cuelogic.com</Typography>
            <Divider className={classes.Divider} />
            { props.auth ? <Button color="primary" variant="contained"> Edit</Button> :null}
            
        </div>
    )

}

export default  withStyles(styles)(profile);