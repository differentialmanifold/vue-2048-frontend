import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

var Board = function () {
};

Board.prototype.init = function () {
    return axios.get('/init');
}

Board.prototype.move = function (direction) {
    // 0 -> left, 1 -> up, 2 -> right, 3 -> down
    debugger;
    return axios.get('/step/' + direction);
};

Board.prototype.matrix = function () {
    var matrix = [];
    for (var i = 0; i < Board.size; i++) {
        matrix[i] = [];
        for (var j = 0; j < Board.size; j++) {
            var title = this.cells[i][j];
            matrix[i][j] = title.value;
        }
    }
    return matrix;
}

Board.prototype.step = function (action) {
    var result = {};
    this.move(action);

    var reward = 0;
    var done = false;

    if (this.won) {
        reward = 1;
        done = true;
    } else if (this.hasLost()) {
        reward = -1;
        done = true;
    } else if(!this.hasChanged){
        reward = -0.1;
    }

    result['matrix'] = this.matrix();
    result['reward'] = reward;
    result['done'] = done;
    return result;
}

Board.prototype.stepInit = function () {
    var result = {};

    result['matrix'] = this.matrix();
    result['reward'] = 0;
    result['done'] = false;

    return result;
}

export { Board }
