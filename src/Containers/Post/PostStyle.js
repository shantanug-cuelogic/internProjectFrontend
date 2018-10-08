const style = theme => ({

    root: {
        marginTop: '10%'
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

    RatingContainer: {
        display: 'inline',
        fontSize: 24
    }
});

export default style;