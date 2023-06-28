module.exports.emailIsValid = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}           
module.exports.passwordIsValid = function (password) {
    return password.length >= 6
}