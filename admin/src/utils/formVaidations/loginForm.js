import validator from 'validator';

const validateForm = (email, password) => {
    var result = {
        email:false,
        password:false,
        errorMessage:{
            emailError:'',
            passwordError:''
        }
    }
    if(email.length > 0){
        if(validator.isEmail(email)){
            if(password.length > 0){
                return result;
            }
            else{
                result.password = true;
                result.errorMessage.passwordError = "Password is required"
                return result;
            }   
        }else{
            if(password.length > 0){
                result.errorMessage.emailError = "Email is invalid"
                result.email = true;
                return result;
            }else{
                result.errorMessage.emailError = "Email is invalid"
                result.errorMessage.passwordError = "Password is required"
                result.email = true;
                result.password = true;
                return result;
            }
        }
    }else{
        if(password.length > 0){
            result.errorMessage.emailError = "Email is required"
            result.email = true;
            return result;
        }else{
            result.errorMessage.emailError = "Email is required"
            result.errorMessage.passwordError = "Password is required"
            result.email = true;
            result.password = true;
            return result;
        }
    }
};

export default validateForm;