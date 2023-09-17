module.exports.emailIsValid = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}           
module.exports.passwordIsValid = function (password) {
    return password.length >= 6
}

module.exports.generateOTP = function () {
    // generate a 6 digit otp
    return Math.floor(100000 + Math.random() * 900000);
}
