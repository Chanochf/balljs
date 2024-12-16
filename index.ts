

/**
 * Get the chosen values from the user and prpare for sending to server
 */
const get_values = () => {
  let points = sliders.get_data();
  let pos: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("position")
  );
  let position = pos.value;
  let data: {
    position: string;
    twoPercent: string;
    threePercent: string;
    points: string;
  } = {
    position: position,
    twoPercent: points[0],
    threePercent: points[1],
    points: points[2],
  };
  return data;
};

const fetch_data = async () => {
  const headers = new Headers();
  let values = get_values();

  const data = await fetch("https://nbaserver-q21u.onrender.com/api/filter", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });
  return await data.json();
};

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
      let slider: HTMLInputElement = <HTMLInputElement>this.sliders[i];
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

  get_data: function () {
    let data: string[] = [];
    for (let i = 0; i < this.sliders.length; i += 2) {
      const element: HTMLInputElement = <HTMLInputElement>this.sliders[i];
      data.push(element.value);
    }
    return data;
  },
};

function display_data(data: [{}]) {
  let container = document.getElementById("container")!;
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

function init_add_player() {
  var elements = document.getElementsByClassName("add_button");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", add_player);
  }
}
function add_player(event: Event) {
  const table = document.getElementsByTagName("table");
  const plyer_num: HTMLInputElement = <HTMLInputElement>event.target;
  const player = table[0].rows[+plyer_num.value + 1];
  displey_plyer(player);
}

function displey_plyer(plyer: HTMLTableRowElement) {
  const position: string = plyer.cells[4].innerHTML;
  const pos_in_team = document.getElementById(position)!;
  pos_in_team.innerHTML = plyer.cells[2].innerHTML;
  pos_in_team.style.padding = "5%";
}
sliders.init();
const submit_button = document.getElementById("submitBtn")!;

submit_button.addEventListener("click", async (event) => {
  event.preventDefault();
  const res = await fetch_data();
  console.log(res[0]);
  display_data(res);
  init_add_player();
});
