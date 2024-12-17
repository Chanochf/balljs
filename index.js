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
/**
 * Get the chosen values from the user and prpare for sending to server
 */
const get_values = () => {
    let points = sliders.get_data();
    let pos = (document.getElementById("position"));
    let position = pos.value;
    let data = {
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
const fetch_data = () => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers();
    let values = get_values();
    try {
        const data = yield fetch("https://nbaserver-q21u.onrender.com/api/filter", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values),
        });
        return yield data.json();
    }
    catch (err) {
        document.querySelector(".player_search").innerHTML = err.message;
    }
});
/**
 * Represent the points selection
 */
const sliders = {
    sliders: [
        document.getElementById("point_range"),
        document.getElementById("point_range_lable"),
        document.getElementById("2_point"),
        document.getElementById("2_point_lable"),
        document.getElementById("3_point"),
        document.getElementById("3_point_lable"),
    ],
    init: function () {
        for (let i = 0; i < this.sliders.length; i += 2) {
            let slider = this.sliders[i];
            let lable = this.sliders[i + 1];
            if (slider && lable) {
                lable.innerHTML = slider.value;
                slider.oninput = () => {
                    if (slider) {
                        lable.innerHTML = slider.value;
                    }
                };
            }
        }
    },
    /**
     * Get the selected data fron the user choises
     */
    get_data: function () {
        let data = [];
        for (let i = 0; i < this.sliders.length; i += 2) {
            const element = this.sliders[i];
            data.push(element.value);
        }
        return data;
    },
};
/**
 * Orgnize the data from the server and displey in position
 */
function display_data(data) {
    let container = document.getElementById("container");
    document.body.appendChild(container);
    container.innerHTML = "";
    let table = document.createElement("table");
    let cols = Object.keys(data[0]);
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let ths = document.createElement("th");
    tr.appendChild(ths);
    cols.forEach((item) => {
        let th = document.createElement("th");
        th.innerText = item;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.append(tr);
    let i = 0;
    data.forEach((item) => {
        let tr = document.createElement("tr");
        // Get the values of the current object in the JSON data
        let vals = Object.values(item);
        let tdb = document.createElement("td");
        let button = document.createElement("button");
        button.innerText = "add player";
        button.className = "add_button";
        button.value = i.toString();
        i++;
        tdb.appendChild(button);
        tr.appendChild(tdb);
        // Loop through the values and create table cells
        vals.forEach((elem) => {
            let td = document.createElement("td");
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
    const table = document.getElementsByTagName("table");
    const plyer_num = event.target;
    const player = table[0].rows[+plyer_num.value + 1];
    displey_plyer(player);
}
/**
 * Display the player in the page
 */
function displey_plyer(plyer) {
    const position = plyer.cells[4].innerHTML;
    const pos_in_team = document.getElementById(position);
    pos_in_team.innerHTML = `${plyer.cells[2].innerHTML}\n${plyer.cells[5].innerHTML}\n${plyer.cells[6].innerHTML}\n${plyer.cells[8].innerHTML}`;
    pos_in_team.style.padding = "5%";
}
var id = undefined;
function myMove() {
    var elem = document.getElementById("myAnimation");
    if (!elem) {
        console.error("Element not found");
        return;
    }
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        }
        else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}
sliders.init();
const submit_button = document.getElementById("submitBtn");
submit_button.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const res = yield fetch_data();
    console.log(res[0]);
    display_data(res);
    init_add_player();
}));
