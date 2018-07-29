import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

var Board = function () {
};

Board.prototype.init = function () {
    return axios.get('/init');
}

Board.prototype.move = function (direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    return axios.get('/step/' + direction);
};

Board.prototype.automove = function () {
    return axios.get('/autostep');
}

export { Board }
