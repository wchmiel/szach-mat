//------------------------------------------------------------
// All auth validators goes here
//------------------------------------------------------------

/*jshint esversion: 6 */


const validatorObj = {

  ValidateUserSignupData: function(userData) {
    if (userData.nick) {
      if(this.validateEmail(userData.email)) {
        if (this.passwordLengthValidator(userData.password)) {
          return { valid: true };
        } else {
          return { valid: false, error_type: 'password', error_mess: "Password is too short.", error: {}};
        }
      } else {
        return { valid: false, error_type: 'email', error_mess: "Email is not correct.", error: {}};
      }
    } else {
      return { valid: false, error_type: 'nick', error_mess: "User Nick is empty.", error: {}};
    }
  },

  validateEmail: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  passwordLengthValidator: function(pass) {
    return (pass.length < 6) ? false : true;
  }
};

module.exports = validatorObj;
