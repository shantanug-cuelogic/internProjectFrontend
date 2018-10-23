import asyncImports from '../Utility/asyncImports';


export const routes = [
    {
        path: '/',
        component: asyncImports.asyncBlogBuilder,
        exact:true,
        auth:false
    },
    {
        path: '/signin',
        component: asyncImports.asyncSignIn,
        exact:true,
        auth:false
    },
    {
        path: '/signup',
        component: asyncImports.asyncSignUp,
        exact:true,
        auth:false
    },
    {
        path: '/post/:id',
        component:asyncImports.asyncPost,
        exact:true,
        auth:false
    },
    {
        path: '/editor',
        component:asyncImports.asyncEditor,
        exact:true,
        auth:false
    },
    {
        path: '/profile',
        component:asyncImports.asyncProfile,
        exact:true,
        auth:false
    },
    {
        path: '/createpost',
        component:asyncImports.asyncEditor,
        exact:true,
        auth:false
    },
    {
        path: '/dashboard',
        component:asyncImports.asyncDashboard,
        exact:true,
        auth:false
    },
    {
        path: '/updateprofile',
        component: asyncImports.asyncUpdateProfile,
        exact:true,
        auth:false
    },
    {
        path: '/drafts',
        component: asyncImports.asyncDrafts,
        exact:true,
        auth:false
    },
    {
        path: '/drafteditor/:id',
        component: asyncImports.asyncDraftEditor,
        exact:true,
        auth:false
    },
    {
        path: '/category/:id',
        component:asyncImports.asyncCategory,
        exact:true,
        auth:false
    },
    {
        path: '/search',
        component: asyncImports.asyncSearchPost,
        exact:true,
        auth:false
    },
    {
        path: '/authorprofile/:userId',
        component: asyncImports.asyncAuthorProfile,
        exact:true,
        auth:false
    },
    {
        path: '/forgotpassword',
        component: asyncImports.asyncForgotPassword,
        exact:true,
        auth:false
    },
    {
        path: '/recoverpassword/:authToken',
        component:asyncImports.asyncPasswordRecover,
        exact:true,
        auth:false
    },
];