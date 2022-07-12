/**
 * @author MaZiXiao
 * @date 2022-07-11 15:42
 */
const checkEmail = (rule, value, callback) => {
    function isEmail(email) {
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return reg.test(email)
    }

    if (!isEmail(value)) {
        callback(new Error('Please enter your email again'));
    } else {
        callback();
    }
}
export default {
    username: [
        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
    ],
    password: [
        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
        {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
    ],
    code: [
        {required: true, message: 'Please fill in the code', trigger: 'blur'}
    ],
    email: [
        {validator: checkEmail, trigger: 'blur', required: true,}
    ],
    name: [
        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
    ],
    remark: [
        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
    ]
}
