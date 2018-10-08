import green from '@material-ui/core/colors/green';

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '80%',
      position: 'relative',
      minHeight: 200,
      marginTop: "7%",
      marginLeft: '10%',
      marginRight: '10%',
  
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
    header: {
      position: 'sticky',
      top: '63px',
  
  
    },
  
  });

  export default styles;