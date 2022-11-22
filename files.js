const fs = require('fs/promises')
const path = require('path')

const login = fs.readFile(path.join(__dirname, 'res/pages/login.html'))
const register = fs.readFile(path.join(__dirname, 'res/pages/register.html'))
const home = fs.readFile(path.join(__dirname, 'res/pages/index.html'))
const task = fs.readFile(path.join(__dirname, 'res/pages/task.html'))

module.exports = {login, register, home, task}