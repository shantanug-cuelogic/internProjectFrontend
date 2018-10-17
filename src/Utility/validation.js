import validator from 'validator';

class Validations {

    signUpValidation = (firstName, lastName , email, password, repeatPassword) => {
        if (firstName.length === 0) {
           // this.props.handleOpenSnackBar('First Name is Empty');
            return 'First Name is Empty';
          }
          else {
            if (lastName.length === 0) {
            //  this.props.handleOpenSnackBar('Last Name is Empty');
              return 'Last Name is Empty';
            }
            else {
              if (email.length === 0) {
                //this.props.handleOpenSnackBar("Email cannot be Empty");
                return "Email cannot be Empty";
              }
              else {
                if (password.length === 0) {
                 // this.props.handleOpenSnackBar('Password cannot be empty');
                  return 'Password cannot be empty';
                }
                else {
                  if (!validator.isEmail(email)) {
                  //  this.props.handleOpenSnackBar('Enter Valid Email Id');
                    return 'Enter Valid Email Id';
                  }
                  else {
                    if (this.state.formData.password === this.state.formData.repeatPassword) {
                      return true;
                    }
                    else {
                     // this.props.handleOpenSnackBar('Password doest not Match')
                      return 'Password doest not Match';
                    }
                  }
                }
              }
            }
          }
    }


}
export default new Validations(); 