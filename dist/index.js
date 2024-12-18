"use strict";
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
const fetch_data = async () => {
    const headers = new Headers();
    let values = get_values();
    try {
        const data = await fetch("https://nbaserver-q21u.onrender.com/api/filter", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values),
        });
        return await data.json();
    }
    catch (err) {
        document.querySelector(".player_search").innerHTML = err.message;
    }
};
/**
 * Represent the points selection
 */
const sliders = {
    array_sliders: [
        document.getElementById("point_range"),
        document.getElementById("point_range_lable"),
        document.getElementById("2_point"),
        document.getElementById("2_point_lable"),
        document.getElementById("3_point"),
        document.getElementById("3_point_lable"),
    ],
    init: function () {
        for (let i = 0; i < this.array_sliders.length; i += 2) {
            let slider = this.array_sliders[i];
            let lable = this.array_sliders[i + 1];
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
        for (let i = 0; i < this.array_sliders.length; i += 2) {
            const element = this.array_sliders[i];
            data.push(element.value);
        }
        return data;
    },
};
/**
 * Orgnize the data from the server and displey in position
 */
function display_data(data) {
    const container = document.getElementById("container");
    document.body.appendChild(container); //?
    container.innerHTML = ""; //?
    const table = document.createElement("table");
    const cols = Object.keys(data[0]);
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const ths = document.createElement("th");
    tr.appendChild(ths);
    cols.forEach((item, index) => {
        if (index == 0 ||
            index == 10 ||
            index == 3 ||
            index == 4 ||
            index == 5 ||
            index == 7)
            return;
        const th = document.createElement("th");
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
        button.style.backgroundColor = "brown";
        button.style.color = "rgb(136, 116, 87)";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.value = i.toString();
        i++;
        tdb.appendChild(button);
        tr.appendChild(tdb);
        // Loop through the values and create table cells
        vals.forEach((elem, index) => {
            if (index == 0 ||
                index == 10 ||
                index == 3 ||
                index == 4 ||
                index == 5 ||
                index == 7)
                return;
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
    let pos = (document.getElementById("position"));
    const position = pos.value;
    const pos_in_team = document.getElementById(position);
    pos_in_team.innerHTML = `${plyer.cells[1].innerHTML}\n${plyer.cells[2].innerHTML}\n`;
    pos_in_team.style.padding = "5%";
}
function myMove() {
    const elem = document.getElementById("myAnimation");
    if (!elem) {
        console.error("Element not found");
        return;
    }
    var id = undefined;
    var pos = 0;
    clearInterval(id);
    var direction = 1;
    id = setInterval(frame, 10);
    function frame() {
        if (direction == 0) {
            pos -= 3;
            elem.style.bottom = pos + "px";
            if (pos <= 0)
                direction = 1;
        }
        else {
            pos += 3;
            elem.style.bottom = pos + "px";
            if (pos >= 350)
                direction = 0;
        }
    }
}
sliders.init();
const submit_button = document.getElementById("submitBtn");
myMove();
submit_button.addEventListener("click", async (event) => {
    event.preventDefault();
    const res = await fetch_data();
    display_data(res);
    init_add_player();
});
