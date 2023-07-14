module.exports.emailIsValid = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}           
module.exports.passwordIsValid = function (password) {
    return password.length >= 6
}

module.exports.generateOTP = function () {
    // generate a 4 digit otp
    return Math.floor(1000 + Math.random() * 9000);
}
