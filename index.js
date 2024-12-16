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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
/**
 * Get the chosen values from the user and prpare for sending to server
 */
var get_values = function () {
    var points = sliders.get_data();
    var pos = (document.getElementById("position"));
    var position = pos.value;
    var data = {
        position: position,
        twoPercent: points[0],
        threePercent: points[1],
        points: points[2],
    };
    return data;
};
/**
 * Fetch the data from server
 */
var fetch_data = function () { return __awaiter(_this, void 0, void 0, function () {
    var headers, values, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                headers = new Headers();
                values = get_values();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("https://nbaserver-q21u.onrender.com/api/filter", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(values),
                    })];
            case 2:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                err_1 = _a.sent();
                document.querySelector(".player_search").innerHTML = err_1.message;
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Represent the points selection
 */
var sliders = {
    sliders: [
        document.getElementById("point_range"),
        document.getElementById("point_range_lable"),
        document.getElementById("2_point"),
        document.getElementById("2_point_lable"),
        document.getElementById("3_point"),
        document.getElementById("3_point_lable"),
    ],
    init: function () {
        var _loop_1 = function (i) {
            var slider = this_1.sliders[i];
            var lable = this_1.sliders[i + 1];
            if (slider && lable) {
                lable.innerHTML = slider.value;
                slider.oninput = function () {
                    if (slider) {
                        lable.innerHTML = slider.value;
                    }
                };
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.sliders.length; i += 2) {
            _loop_1(i);
        }
    },
    /**
     * Get the selected data fron the user choises
     */
    get_data: function () {
        var data = [];
        for (var i = 0; i < this.sliders.length; i += 2) {
            var element = this.sliders[i];
            data.push(element.value);
        }
        return data;
    },
};
/**
 * Orgnize the data from the server and displey in position
 */
function display_data(data) {
    var container = document.getElementById("container");
    document.body.appendChild(container);
    container.innerHTML = "";
    var table = document.createElement("table");
    var cols = Object.keys(data[0]);
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var ths = document.createElement("th");
    tr.appendChild(ths);
    cols.forEach(function (item) {
        var th = document.createElement("th");
        th.innerText = item;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.append(tr);
    var i = 0;
    data.forEach(function (item) {
        var tr = document.createElement("tr");
        // Get the values of the current object in the JSON data
        var vals = Object.values(item);
        var tdb = document.createElement("td");
        var button = document.createElement("button");
        button.innerText = "add player";
        button.className = "add_button";
        button.value = i.toString();
        i++;
        tdb.appendChild(button);
        tr.appendChild(tdb);
        // Loop through the values and create table cells
        vals.forEach(function (elem) {
            var td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    container.appendChild(table);
}
/**
 * Init add player button
 */
function init_add_player() {
    var elements = document.getElementsByClassName("add_button");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", add_player);
    }
}
/**
 * add player to the team
 */
function add_player(event) {
    var table = document.getElementsByTagName("table");
    var plyer_num = event.target;
    var player = table[0].rows[+plyer_num.value + 1];
    displey_plyer(player);
}
/**
 * Display the player in the page
 */
function displey_plyer(plyer) {
    var position = plyer.cells[4].innerHTML;
    var pos_in_team = document.getElementById(position);
    pos_in_team.innerHTML = plyer.cells[2].innerHTML;
    pos_in_team.style.padding = "5%";
}
var id = undefined;
function myMove() {
    var elem = document.getElementById("myAnimation");
    var pos = 0;
    var direction = 1
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (!direction) {
            pos -=3
            elem.style.bottom = pos + 'px';
            if(pos <= 0)
                direction = 1
        }
        else {
            pos+=3;
            elem.style.bottom = pos + 'px';
            if (pos >=350)
                direction = 0
        }
    }
}
sliders.init();
myMove()
var submit_button = document.getElementById("submitBtn");
submit_button.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                return [4 /*yield*/, fetch_data()];
            case 1:
                res = _a.sent();
                console.log(res[0]);
                display_data(res);
                init_add_player();
                return [2 /*return*/];
        }
    });
}); });
