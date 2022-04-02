export default class AI {
    static COL = 8;
    static COLXCOL = this.COL * this.COL;


    static getEffectArray(map, number, turn) {
        let list = [];
        let x = (number % this.COL) | 0;
        let y = (number / this.COL) | 0;
        let target = [];
        if (map[number] !== 0) {
            return list;
        }
        for (let x_inc = -1; x_inc <= 1; x_inc++) {
            for (let y_inc = -1; y_inc <= 1; y_inc++) {
                if (x_inc === 0 && y_inc === 0) {
                    continue;
                }
                target = [];
                L: for (let _x = x + x_inc, _y = y + y_inc; _x >= 0 & _y >= 0 && _x < this.COL && _y < this.COL; _x = _x + x_inc, _y = _y + y_inc) {
                    if (map[_y * this.COL + _x] * turn > 0) {
                        list = list.concat(target);
                        break L;
                    } else if (map[_y * this.COL + _x] == 0) {
                        break L;
                    } else {
                        target.push(_y * this.COL + _x);
                    }
                }
            }
        }
        return list;
    }

    static canPut(map, number, turn) {
        let x = (number % this.COL) | 0;
        let y = (number / this.COL) | 0;
        let target = [];
        if (map[number] != 0) {
            return false;
        }
        for (let x_inc = -1; x_inc <= 1; x_inc++) {
            for (let y_inc = -1; y_inc <= 1; y_inc++) {
                if (x_inc === 0 && y_inc === 0) {
                    continue;
                }
                target = [];
                L: for (let _x = x + x_inc, _y = y + y_inc; _x >= 0 & _y >= 0 && _x < this.COL && _y < this.COL; _x = _x + x_inc, _y = _y + y_inc) {
                    if (map[_y * this.COL + _x] * turn > 0) {
                        if (target.length > 0) {
                            return true;
                        }
                        break L;
                    } else if (map[_y * this.COL + _x] == 0) {
                        break L;
                    } else {
                        target.push(_y * this.COL + _x);
                    }
                }
            }
        }
        return false;
    }

    static canPutPlayer(map, turn) {
        let _map = map.concat();
        for (let i = 0; i < this.COLXCOL; i++) {
            if (this.canPut(_map, i, turn) == true) {
                return true;
            }
        }
        return false;
    }

    static canPutAll(map) {
        let _map = map.concat();
        for (let i = 0; i < this.COLXCOL; i++) {
            if (this.canPut(_map, i, 1) == true) {
                return true;
            }
        }
        for (let i = 0; i < this.COLXCOL; i++) {
            if (this.canPut(_map, i, -1) == true) {
                return true;
            }
        }
        return false;
    }

    static getNodeList(map, turn) {
        let node_list = [];
        for (let i = 0; i < this.COLXCOL; i++) {
            if (this.canPut(map, i, turn)) {
                node_list.push(i);
            }
        }
        return node_list;
    }

    static putMap(map, number, turn) {
        let effectArray = this.getEffectArray(map, number, turn);
        let _map = map.concat();
        _map[number] = turn;
        for (let i = 0; i < effectArray.length; i++) {
            let _number = effectArray[i] | 0;
            switch (_map[_number]) {
                case 1:
                    _map[_number] = -1;
                    break;
                case -1:
                    _map[_number] = +1;
                    break;
            }
        }
        return _map;
    }


    static evalMap(map) {
        let ev = 0;
        for (let i = 0; i < this.COLXCOL; i++) {
            switch (map[i]) {
                case 1:
                    ev += 1;
                    break;
                case -1:
                    ev += -1;
                    break;
            }
        }
        return ev;
    }

    static isEnd(map) {
        for (let i = 0; i < this.COLXCOL; i++) {
            if (map[i] == 0) {
                return false;
            }
        }
        return true;
    }

    static getWinner(map) {
        if (!this.isEnd(map)) {
            return 0;
        } else {
            return this.calcWinner(map);
        }
    }

    static calcWinner(map) {
        let score = 0;
        for (let i = 0; i < this.COLXCOL; i++) {
            if (map[i] < 0) {
                score += -1;
            } else if (map[i] > 0) {
                score += 1;
            }
        }
        if (score > 0) {
            return 1;
        } else if (score < 0) {
            return -1;
        } else {
            return 0;
        }
    }

    static deepThinkAllAB(map, turn, depth, a, b) {
        let best_score = turn * 999 * -1 | 0;
        let besthand;
        if (depth === 0) {
            best_score = this.evalMap(map) | 0;
            return [besthand, best_score];
        }
        let nodeList = this.getNodeList(map, turn);
        for (let i = 0; i < nodeList.length; i++) {
            let hand = nodeList[i];
            let _map = this.putMap(map, hand, turn);
            if (this.isEnd(_map)) {
                if (this.getWinner(_map) === turn) {
                    return [hand, 999 * turn];
                } else {
                    if (besthand === void 0) {
                        best_score = 999 * turn * -1 | 0;
                        besthand = hand;
                    }
                    continue;
                }
            }
            let sc = this.deepThinkAllAB(_map, turn * -1, depth - 1, b, a)[1] | 0;
            if (besthand === void 0) {
                best_score = sc;
                besthand = hand;
            }
            if (turn === 1 && sc > best_score) {
                best_score = sc;
                besthand = hand;
            } else if (turn === -1 && sc < best_score) {
                best_score = sc;
                besthand = hand;
            }
            if (turn === 1 && a < best_score || turn === -1 && a > best_score) {
                a = best_score;
            }
            if (turn === 1 && b <= best_score || turn === -1 && b >= best_score) {
                break;
            }
        }
        return [besthand, best_score];
    }

    static thinkAI(map, turn_player, depth) {
        return this.deepThinkAllAB(map, turn_player, depth, 999 * turn_player * -1, 999 * turn_player);
    }
}