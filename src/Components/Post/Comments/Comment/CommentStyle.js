const style = theme =>({
    CommentContainer: {
        marginBottom: '5%',
        padding: '3%'

    },
    Comments: {
        paddingLeft: '3%',
        paddingRight: '3%',
        height: 'auto'
    },
    UserName: {
        float: 'left',
        marginTop: 10,
        color: 'black',
       marginLeft:20
    },
    DeleteButton: {
        float: 'right',
        ...theme.typography.button,
        color:'red',
        cursor: 'pointer',
        paddingTop:'2px',
        paddingBottom:'2px',
    },
    AllComments:{
        marginLeft:35,
        marginRight:35
    }

})

export default style;