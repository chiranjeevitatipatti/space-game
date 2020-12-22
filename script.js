"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var rectOf = function (el) {
    return el.getBoundingClientRect();
};
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1));
};
var checkCollision = function (r1, r2) {
    return !!(r2.width &&
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height);
};
var Observer = /** @class */ (function () {
    function Observer() {
        var _this = this;
        this.observerList = [];
        this.subscribe = function () {
            var _a;
            var fn = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fn[_i] = arguments[_i];
            }
            (_a = _this.observerList).push.apply(_a, fn);
        };
        this.unsubscribe = function (fnToRemove) {
            _this.observerList.filter(function (fn) { return fn !== fnToRemove; });
        };
        this.notify = function (context) {
            _this.observerList.forEach(function (fn) { return fn(context); });
        };
    }
    return Observer;
}());
var State = /** @class */ (function () {
    function State(difficulty) {
        var _this = this;
        this.isPaused = true;
        this.gameIsOver = false;
        this.difficulty = 'normal';
        this.speed = {
            easy: 1250,
            normal: 750,
            hard: 250
        };
        this.togglePause = function () {
            _this.isPaused = !_this.isPaused;
        };
        this.setPause = function (bool) {
            _this.isPaused = bool;
        };
        this.endGame = function () {
            _this.setPause(true);
            _this.gameIsOver = true;
            loadGameOverModal();
        };
        this.difficulty = difficulty;
    }
    return State;
}());
// prettier-ignore
var LEFT_ARROW = 37, RIGHT_ARROW = 39, DOWN_ARROW = 40, SPACE_BAR = 32, SHIP_WIDTH = 90, SHIP_HEIGHT = 50, BULLET_WIDTH = 6, COLUMN_LENGTH = 10, ROW_LENGTH = 5;
// prettier-ignore
var player, invaders, state, controls, deathObserver, container, columns, btnGroup, earth, score, livesList;
var center = (SHIP_WIDTH / 2) - (BULLET_WIDTH / 2); // prettier-ignore
var onKeydown = function (e) {
    if (!state.isPaused) {
        if (e.keyCode === LEFT_ARROW)
            player.moveLeft();
        if (e.keyCode === RIGHT_ARROW)
            player.moveRight();
        if (e.keyCode === DOWN_ARROW)
            player.stopMoving();
        if (e.keyCode === SPACE_BAR)
            player.fire();
    }
};
var loadStartMenu = function () {
    document.body.innerHTML = "\n        <div id=\"menu\">\n            <div class=\"menu__gif\"></div>\n            <h1 class=\"menu__title\">\n                Space Invaders\n            </h1>\n            <div class=\"menu__difficulty-container\">\n                <h3 class=\"difficulty__title\">Select difficulty</h3>\n                <ul class=\"menu__difficulty-list\">\n                    <li class=\"menu__difficulty\">\n                        <a data-mode=\"easy\">Easy</a>\n                    </li>\n                    <li class=\"menu__difficulty\">\n                        <a data-mode=\"normal\">Normal</a>\n                    </li>\n                    <li class=\"menu__difficulty\">\n                        <a data-mode=\"hard\">Hard</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ";
    __spreadArrays(document.getElementsByClassName('menu__difficulty')).forEach(function (node) {
        return node.addEventListener('click', function (e) {
            var mode = e.target.dataset.mode;
            loadNewGame(mode);
        });
    });
};
var loadEnvironment = function () {
    document.body.innerHTML = "\n        <div id=\"container\">\n            <div id=\"header\">\n                <div id=\"btn-group\"></div>\n                <div id=\"score\">\n                    <span>SCORE:</span>&nbsp;<span id=\"score-count\">0</span>\n                </div>\n                <div id=\"lives\">\n                    <span>LIVES:</span>\n                    <ul id=\"lives-list\"></ul>\n                </div>\n            </div>\n\n            <div id=\"earth\">\n                <ul id=\"invader-column-list\">\n                    " + "<li class=\"invader-column\"></li>".repeat(10) + "\n                </ul>\n                <div id=\"player-zone\"></div>\n            </div>\n        </div>\n    ";
    columns = document.getElementsByClassName('invader-column'); // prettier-ignore
    container = document.getElementById('container');
    btnGroup = document.getElementById('btn-group');
    earth = document.getElementById('earth');
    score = document.getElementById('score-count');
    livesList = document.getElementById('lives-list');
};
var loadGameOverModal = function () {
    container.innerHTML += "\n            <div id=\"modal\" class=\"modal\">\n                <div class=\"modal__inner\">\n                    <h1 class=\"modal__title\">GAME OVER!</h1>\n                    <button id=\"play-again-btn\" class=\"btn\">\n                        PLAY AGAIN\n                    </button>\n                    <button id=\"main-menu-btn\" class=\"btn\">\n                        MAIN MENU\n                    </button>\n                </div>\n            </div>\n        ";
    document.getElementById('play-again-btn').addEventListener('click', controls.reset);
    document.getElementById('main-menu-btn').addEventListener('click', loadStartMenu);
};
var PlayerBullet = /** @class */ (function () {
    function PlayerBullet(x, y, bullets) {
        var _this = this;
        this.node = document.createElement('div');
        this.remove = function () {
            _this.bullets.splice(_this.bullets.indexOf(_this), 1);
            _this.node.remove();
        };
        this.checkForHitOnInvader = function () {
            var rect1 = rectOf(_this.node);
            var invader;
            for (var i in invaders.matrix) {
                for (var j in invaders.matrix) {
                    invader = invaders.matrix[i][j];
                    var rect2 = invader ? rectOf(invader.element()) : null;
                    // prettier-ignore
                    if (invader && checkCollision(rect1, rect2)) {
                        _this.remove();
                        player.scorePoints();
                        invaders.removeInvader(invader);
                    }
                    if (_this.node.offsetTop <= -earth.offsetHeight) {
                        _this.remove();
                    }
                }
            }
        };
        this.update = function () {
            if (!state.isPaused) {
                _this.node.style.top = _this.node.offsetTop - 10 + "px";
                _this.checkForHitOnInvader();
            }
            requestAnimationFrame(_this.update);
        };
        this.element = function () {
            return _this.node;
        };
        this.node.className = 'bullet';
        this.node.style.cssText = "bottom: " + SHIP_HEIGHT + "; left: " + (x + center) + "px"; // prettier-ignore
        this.bullets = bullets;
    }
    return PlayerBullet;
}());
var Player = /** @class */ (function () {
    function Player() {
        var _this = this;
        this.livesCount = 3;
        this.scoreCount = 0;
        this.x = 500;
        this.moveID = 0;
        this.node = document.createElement('div');
        this.bullets = [];
        this.bullet = null;
        this.onCoolDown = false;
        this.die = function () {
            if (livesList.lastElementChild) {
                livesList.removeChild(livesList.lastElementChild);
                _this.livesCount--;
                _this.node.remove();
            }
            if (!_this.livesCount) {
                state.endGame();
            }
        };
        this.moveLeft = function () {
            _this.stopMoving();
            if (_this.node.offsetLeft > 0 && !state.isPaused) {
                _this.node.style.left = (_this.x -= 5) + "px";
                _this.moveID = requestAnimationFrame(_this.moveLeft);
            }
        };
        this.moveRight = function () {
            _this.stopMoving();
            if (_this.node.offsetLeft < 1010 && !state.isPaused) {
                _this.node.style.left = (_this.x += 5) + "px";
                _this.moveID = requestAnimationFrame(_this.moveRight);
            }
        };
        this.stopMoving = function () {
            if (_this.moveID)
                cancelAnimationFrame(_this.moveID);
        };
        this.scorePoints = function () { return __awaiter(_this, void 0, Promise, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 10)) return [3 /*break*/, 4];
                        this.scoreCount++;
                        score.textContent = this.scoreCount.toString();
                        return [4 /*yield*/, sleep(25)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fire = function () {
            var _a = rectOf(_this.node), x = _a.x, y = _a.y;
            _this.bullet = new PlayerBullet(x, y, _this.bullets);
            _this.bullets.push(_this.bullet);
            _this.update();
        };
        this.update = function () {
            if (_this.bullet && !_this.onCoolDown) {
                _this.node.appendChild(_this.bullet.element());
                _this.bullet.update();
                _this.onCoolDown = true;
                sleep(150).then(function () { return (_this.onCoolDown = false); });
            }
        };
        this.element = function () {
            return _this.node;
        };
        // prettier-ignore
        this.render = function () {
            livesList.innerHTML = '<div class="life"></div>'.repeat(_this.livesCount);
            document.getElementById('player-zone').appendChild(_this.node);
        };
        this.node.id = 'player';
        deathObserver.subscribe(this.die);
    }
    return Player;
}());
var InvaderBullet = /** @class */ (function () {
    function InvaderBullet(x, y, bullets) {
        var _this = this;
        this.node = document.createElement('div');
        this.remove = function () {
            _this.bullets.splice(_this.bullets.indexOf(_this), 1);
            _this.node.remove();
        };
        this.checkForHitOnPlayer = function () {
            if (player.element()) {
                if (checkCollision(rectOf(_this.node), rectOf(player.element()))) {
                    _this.remove();
                    deathObserver.notify();
                }
                if (_this.y >= earth.offsetHeight + SHIP_HEIGHT) {
                    _this.remove();
                }
            }
        };
        this.update = function () {
            if (!state.isPaused) {
                _this.node.style.top = (_this.y += 10) + "px";
                _this.checkForHitOnPlayer();
            }
            requestAnimationFrame(_this.update);
        };
        this.element = function () {
            return _this.node;
        };
        this.node.className = 'bullet';
        this.node.style.cssText = "top: " + (y + SHIP_HEIGHT) + "px; left: " + (x + center) + "px"; // prettier-ignore
        this.bullets = bullets;
        this.x = x;
        this.y = y;
        deathObserver.subscribe(this.remove);
    }
    return InvaderBullet;
}());
var Invader = /** @class */ (function () {
    function Invader(numA, numB) {
        var _this = this;
        this.node = document.createElement('div');
        this.bullets = [];
        this.bullet = null;
        this.remove = function () {
            _this.element().remove();
        };
        this.fire = function () {
            var _a = rectOf(_this.node), x = _a.x, y = _a.y;
            _this.bullet = new InvaderBullet(x, y, _this.bullets);
            _this.bullets.push(_this.bullet);
            _this.update();
        };
        this.update = function () {
            if (_this.bullet) {
                _this.node.appendChild(_this.bullet.element());
                _this.bullet.update();
            }
        };
        this.element = function () {
            return _this.node;
        };
        this.node.className = 'invader';
        this.coordinates = [numA, numB];
    }
    return Invader;
}());
var intervals = {
    attack: null,
    moveDown: null
};
var createMatrix = function () {
    var matrix = [];
    var arr;
    for (var i = 0; i < COLUMN_LENGTH; i++) {
        arr = [];
        for (var j = 0; j < ROW_LENGTH; j++) {
            arr.push(new Invader(i, j));
        }
        matrix.push(arr);
    }
    return matrix;
};
var RIGHT = 'RIGHT';
var LEFT = 'LEFT';
var Invaders = /** @class */ (function () {
    function Invaders() {
        var _this = this;
        this.matrix = createMatrix();
        this.invaderElements = document.getElementById('invader-column-list'); // prettier-ignore
        this.direction = RIGHT;
        this.x = 0;
        this.y = 0;
        this.getDimensions = function () {
            return rectOf(_this.invaderElements);
        };
        this.checkWall = function () {
            var _a = _this.getDimensions(), right = _a.right, left = _a.left;
            if (right >= _this.earthDims.right)
                _this.direction = LEFT;
            if (left <= _this.earthDims.left)
                _this.direction = RIGHT;
        };
        this.moveRight = function () {
            _this.invaderElements.style.right = (_this.x -= 1) + "px";
            _this.checkWall();
        };
        this.moveLeft = function () {
            _this.invaderElements.style.right = (_this.x += 1) + "px";
            _this.checkWall();
        };
        this.moveDown = function () {
            if (!state.isPaused) {
                _this.invaderElements.style.top = (_this.y += SHIP_HEIGHT) + "px";
            }
        };
        this.updateMoving = function () {
            if (!state.isPaused) {
                if (_this.direction === RIGHT)
                    _this.moveRight();
                if (_this.direction === LEFT)
                    _this.moveLeft();
            }
            requestAnimationFrame(_this.updateMoving);
        };
        this.updateBottom = function () {
            return _this.matrix.map(function (column) {
                return column[column.length - 1];
            });
        };
        this.updateAttack = function () {
            if (!state.isPaused) {
                var bottomInvaders = _this.updateBottom();
                var idx = random(0, COLUMN_LENGTH - 1);
                if (bottomInvaders[idx]) {
                    bottomInvaders[idx].fire();
                }
            }
        };
        this.removeInvader = function (invader) {
            var _a = invader.coordinates, col = _a[0], row = _a[1];
            _this.matrix[col].splice(row, 1);
            invader.remove();
        };
        this.update = function () {
            _this.updateMoving();
            intervals.attack = setInterval(_this.updateAttack, state.speed[state.difficulty]);
            intervals.moveDown = setInterval(_this.moveDown, 10000);
        };
        this.render = function () {
            var cols = __spreadArrays(columns);
            var children;
            _this.matrix.forEach(function (invaders, i) {
                var _a;
                children = invaders.map(function (invader) {
                    return invader.element();
                });
                (_a = cols[i]).append.apply(_a, children);
            });
        };
        this.earthDims = rectOf(earth);
    }
    return Invaders;
}());
var Button = function (text, id) {
    var btn = document.createElement('button');
    if (id)
        btn.id = id;
    btn.textContent = text;
    btn.className = 'btn';
    return btn;
};
var decorateWide = function (btn) {
    btn.classList.add('btn--wide');
    return btn;
};
var Controls = /** @class */ (function () {
    function Controls() {
        var _this = this;
        this.resetBtn = Button('RESET');
        this.playBtn = Button('PLAY');
        this.pauseBtn = Button('PAUSE');
        this.startMenuBtn = Button('MENU');
        this.pause = function () {
            if (btnGroup.contains(_this.pauseBtn)) {
                state.setPause(true);
                btnGroup.appendChild(_this.playBtn);
                btnGroup.removeChild(_this.pauseBtn);
            }
        };
        this.play = function () {
            if (btnGroup.contains(_this.playBtn)) {
                state.setPause(false);
                btnGroup.appendChild(_this.pauseBtn);
                btnGroup.removeChild(_this.playBtn);
            }
            if (!document.contains(player.element()) && !state.gameIsOver) {
                player.render();
            }
        };
        this.reset = function () {
            if (intervals.attack !== null)
                clearInterval(intervals.attack);
            if (intervals.moveDown !== null)
                clearInterval(intervals.moveDown);
            loadNewGame(state.difficulty);
        };
        this.render = function () {
            btnGroup.append(_this.startMenuBtn, _this.resetBtn, _this.playBtn);
        };
        decorateWide(this.startMenuBtn);
        this.startMenuBtn.addEventListener('click', loadStartMenu);
        decorateWide(this.resetBtn);
        this.resetBtn.addEventListener('click', this.reset);
        decorateWide(this.playBtn);
        this.playBtn.addEventListener('click', this.play);
        decorateWide(this.pauseBtn);
        this.pauseBtn.addEventListener('click', this.pause);
        deathObserver.subscribe(this.pause);
    }
    return Controls;
}());
var loadNewGame = function (difficulty) {
    loadEnvironment();
    state = new State(difficulty);
    deathObserver = new Observer();
    controls = new Controls();
    controls.render();
    invaders = new Invaders();
    invaders.render();
    invaders.update();
    player = new Player();
    player.render();
    window.addEventListener('keydown', onKeydown);
    window.addEventListener('blur', controls.pause);
};
window.addEventListener('load', loadStartMenu);