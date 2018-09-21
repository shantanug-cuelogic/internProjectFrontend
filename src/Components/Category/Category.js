import React from "react";
import { withStyles } from '@material-ui/core/styles';
import SubHeader from '../Layout/SubHeader/SubHeader';

const styles = {
    PostContainer : {
 marginTop:'10%'
    },
    
}

class Category extends React.Component {
    render() {
        const {classes} = this.props;
        return(
            <div>
                <SubHeader className={classes.SubHeaderContainer} /> 
                <div className={classes.PostContainer}>
                
                <div>{ this.props.match.params.id}</div>
            </div>
            </div>
            
            
        )
    }
}

export default withStyles(styles)(Category);