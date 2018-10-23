import validator from 'validator';

class Validations {

  signUpValidation = (firstName, lastName, email, password, repeatPassword) => {
    if (firstName.length === 0) {
      return 'First Name is Empty';
    }
    else {
      if (lastName.length === 0) {
        return 'Last Name is Empty';
      }
      else {
        if (email.length === 0) {
          return "Email cannot be Empty";
        }
        else {
          if (password.length === 0) {
            return 'Password cannot be empty';
          }
          else {
            if (!validator.isEmail(email)) {
              return 'Enter Valid Email Id';
            }
            else {
              if (password === repeatPassword) {
                return true;
              }
              else {
                return 'Password doest not Match';
              }
            }
          }
        }
      }
    }
  }

  signInValidation = (email, password) => {
    if (email.length === 0) {
      return "Email cannot be Empty";
    }
    else {
      if (password.length === 0) {
        return 'Password cannot be empty';
      }
      else {
        return true;
      }
    }
  }

  createPostValidation = (postTitle, category, image, postContent) => {
    if (validator.isEmpty(postTitle)) {
      return 'Post Title Cannot Be Empty';
    }
    else {

      if (validator.isEmpty(category)) {
        return 'Please Select Category ';
      }
      else {
        if (image === undefined) {
          return 'Thumbnail Cannot Be Empty';
        }

        else {
          if (validator.isEmpty(postContent)) {
            return 'Post Content Cannot Be Empty';
          }
          else {
            return true;
          }
        }
      }
    }
  }

  draftPostEditor = (postTitle, category, postContent) => {
    if (validator.isEmpty(postTitle)) {
      return 'Post Title Cannot Be Empty';
    }
    else {

      if (validator.isEmpty(category)) {
        return 'Please Select Category ';
      }
      else {
        if (validator.isEmpty(postContent)) {
          return 'Post Content Cannot Be Empty';
        }
        else {
          return true;
        }
      }
    }
  }

  passwordRecovery = (password, confirmpassword) => {
    if (validator.isEmpty(password)) {
      return "Password Cannot Be Empty";
    }
    else {
      if (validator.isEmpty(confirmpassword)) {
        return "Password Cannot Be Empty";
      }
      else {
        if (password !== confirmpassword) {
          return "Password does not match"
        }
        else {
          return true
        }
      }
    }
  }

  forgetPassword = (username) => {
    if (validator.isEmpty(username)) {
      return "Username Cannot be Empty";
    }
    else {
      if (!validator.isEmail(username)) {
        return "Enter Valid Email";
      }
      else {
        return true;
      }
    }
  }
}




export default new Validations(); 