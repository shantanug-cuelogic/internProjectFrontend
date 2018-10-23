import asyncImport from './asyncImport';

class asyncImports {

   asyncBlogBuilder = asyncImport(() => {
    return import('../Containers/BlogBuilder/BlogBuilder');
  });
  
   asyncSignIn = asyncImport(() => {
    return import('../Components/Sign In/Sign In');
  });
  
  
   asyncSignUp = asyncImport(() => {
    return import('../Components/Sign Up/Sign Up');
  });
  
  
   asyncPost = asyncImport(() => {
    return import('../Containers/Post/Post');
  });
  
  
   asyncProfile = asyncImport(() => {
    return import('../Components/Profile/Profile');
  });
  
  
   asyncEditor = asyncImport(() => {
    return import('../Containers/Editor/Editor');
  });
  
  
   asyncDrafts = asyncImport(() => {
    return import('../Components/Drafts/Drafts');
  });
  
  
   asyncDraftEditor = asyncImport(() => {
    return import('../Containers/Editor/DraftEditor');
  });
  
  
   asyncEditPost = asyncImport(() => {
    return import('../Containers/Post/EditPost');
  });
  
   asyncDashboard = asyncImport(() => {
    return import('../Containers/Dashboard/Dashboard');
  });
  
   asyncCategory = asyncImport(() => {
    return import('../Containers/Category/Category');
  });
  
   asyncSearchPost = asyncImport(() => {
    return import('../Components/SearchPost/SearchPost');
  });
  
   asyncAuthorProfile = asyncImport(() => {
    return import('../Containers/AuthorProfile/AuthorProfile');
  });
  
  
   asyncForgotPassword = asyncImport(() => {
    return import('../Components/ForgotPassword/ForgotPassword');
  });
  
   asyncPasswordRecover = asyncImport(() => {
    return import('../Components/PasswordRecover/PasswordRecover');
  });
   asyncUpdateProfile = asyncImport(() => {
    return import('../Components/UpdateProfile/UpdateProfile');
  });

}

export default new asyncImports();