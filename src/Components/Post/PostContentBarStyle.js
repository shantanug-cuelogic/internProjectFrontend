const style = theme => ({

    root : {
        marginTop:'10%'
    },

    AuthorContainer: {
      
        height: 70
    },

    AuthorAvatar: {
        height: 70,
        width: 70,

    },

    AuthorInfo: {
        height: 70,
        display: 'inline'
    },

    HeaderContainer: {

        height: '70px',
        paddingTop: '3%'
    },

    PostContainer: {

        padding: '3%'
    },
    EditButtonContainer: {
        marginTop: '2%',
        position: 'sticky',
        top: '63px',
        zIndex: 1000,
        paddingLeft: '3%',
        paddingRight: '3%'

    },
    EditButton: {
        padding: '2%',
        display: 'inline'
    },
    CommentContainer: {
        marginBottom: '5%',
        padding: '3%',
        marginTop: '5%'

    },
    Comments: {
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    UserName: {
        float: 'left',
        marginTop: 40,
        color: 'black',
        marginLeft: 30
    },
    PostCommentButton: {
        marginBottom: '3%'
    },
    AllCommentsContainer: {
        paddingTop: '3%',
        paddingBottom: '3%',
    },
    TitleContainer: {
        marginTop: '10%',
        padding: '5%'
    },
    myDynamicContent: {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%',
        paddingBottom: '3%'
    },
    LikeButton: {

    },
    DeleteButton: {

        marginLeft: "20px"
    },
    SigninLinkContainer: {
        padding: 20
    },
    RatingContainer : {
        display:'inline',
        fontSize:24
    }
});
export default style;