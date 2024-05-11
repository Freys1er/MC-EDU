let data;
let type;
let img;
function preload() {
  data = loadTable(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSqO6wEp3tGkgN6ZAeu9pDOpSH-sFzMFTuKoaI5jylx_fJLa1RoQeofu_ej1RqCFQVc53D8AWy7RU2/pub?gid=2092612853&single=true&output=csv",
    "header",
    "csv"
  );
  font = loadFont("Font.ttf");
}
let servers;
let s = 1;
let font;
let open = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  data = data.getArray();

  type = createInput();
  type.size(width - width / 20, height / 15);
  type.position(width / 40, height / 2, width - width / 20, height / 15);
  type.style("background-color", color(0, 0, 0, 0));
  type.style("border-color", color(0, 0, 0, 0));
  type.style("color", color(0, 0, 0, 0));
  type.hide();
  //https://docs.google.com/forms/d/e/1FAIpQLSfMFMj3Tdk1qvYIIeoJ3CkXI8YVU9UTYpESBHbLxX2uE8AxQw/viewform?usp=pp_url&entry.853013094=The_Data

  servers = {
    names: [],
    urls: [],
    users: [],
    dates: [],
    status: [],
    reasons:[]
  };

  for (let i = 0; i < data.length; i++) {
    let row = {
      date: data[i][0],
      user: data[i][1],
      mode: data[i][2].split("|")[0],
      info: data[i][2].split("|")[1],
    };

    if (row.mode === "RENAME SERVER") {
      if (servers.users.indexOf(row.user) > -1) {
        servers.reasons[servers.users.indexOf(row.user)].push("");
        servers.names[servers.users.indexOf(row.user)] = row.info;
        servers.dates[servers.users.indexOf(row.user)].push([row.date]);
        servers.status[servers.users.indexOf(row.user)].push(["RENAME"]);
      } else {
        servers.reasons.push([]);
        servers.names.push(row.info);
        servers.urls.push("");
        servers.users.push(row.user);
        servers.dates.push([row.date]);
        servers.status.push(["RENAME"]);
      }
    }
    if (row.mode === "ENTER URL") {
      if (servers.users.indexOf(row.user) > -1) {
        servers.reasons[servers.users.indexOf(row.user)].push("");
        servers.urls[servers.users.indexOf(row.user)] = row.info;
        servers.dates[servers.users.indexOf(row.user)].push(row.date);
        servers.status[servers.users.indexOf(row.user)].push(["START"]);
      } else {
        servers.reasons.push([]);
        servers.names.push("");
        servers.urls.push(row.url);
        servers.users.push(row.user);
        servers.dates.push([row.date]);
        servers.status.push("START");
      }
    }
    if (row.mode === "STOP SERVER") {
      if (servers.users.indexOf(row.user) > -1) {
        servers.reasons[servers.users.indexOf(row.user)].push(row.info);
        servers.dates[servers.users.indexOf(row.user)].push(row.date);
        servers.status[servers.users.indexOf(row.user)].push(["STOP"]);
      } else {
        servers.reasons.push([raw.info]);
        servers.names.push("");
        servers.urls.push(row.url);
        servers.users.push(row.user);
        servers.data.push([row.date]);
        servers.status.push("STOP");
      }
    }
  }

  s = min([width, height]) / 500;

  print(servers);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  type.size(width - width / 20, height / 15);
  type.position(width / 40, height / 2, width - width / 20, height / 15);
  type.style("background-color", color(0, 0, 0, 0));
  type.style("border-color", color(0, 0, 0, 0));
  type.style("color", color(0, 0, 0, 0));
  type.hide();

  s = min([width, height]) / 500;
}
let information = 0;
let scroll = 0;
function mouseWheel(event) {
  scroll -= event.delta;
  information -= event.delta;
}
function mouseDragged() {
  scroll -= pmouseY - mouseY;
  information -= pmouseY - mouseY;
}
function formatMilliseconds(milliseconds) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600) - 1;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Construct the formatted string
  const formattedString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return formattedString;
}

let choosen = [];
let setting = "ENTER URL";

function showurls() {
  background(41, 30, 21);
  fill(255);
  textAlign(CENTER, CENTER);

  fill(20, 15, 10);
  rect(0, height / 6, width, height - height / 5);

  //Controls
  if (choosen.length > 1) {
    fill(70);
    stroke(150, 255, 150);
    strokeWeight(8);
    rect(width / 20, height - height / 9, width - width / 10, height / 13);

    noStroke();
    fill(255);
    textSize(s * 22);
    textAlign(CENTER, CENTER);
    text(
      "JOIN",
      width / 20,
      height - height / 9,
      width - width / 10,
      height / 13
    );
    fill(255, 0, 0);
    if (
      button(
        width / 20,
        height - height / 9,
        width - width / 10,
        height / 13
      ) &&
      mouseIsPressed &&
      open
    ) {
      window.open(servers.urls[servers.users.indexOf(choosen)]);
      open = false;
    }
    if (!mouseIsPressed){
      open=true;
    }
  } else {
    fill(70);
    stroke(100);
    strokeWeight(8);
    rect(width / 20, height - height / 9, width - width / 10, height / 13);

    noStroke();
    fill(255);
    textSize(s * 22);
    textAlign(CENTER, CENTER);
    text(
      "JOIN",
      width / 20,
      height - height / 9,
      width - width / 10,
      height / 13
    );
  }
  push();
  if (scroll > 0) {
    scroll = 0;
  }
  if (scroll < -height / 5 + (servers.names.length * height) / 6) {
    scroll = -height / 5 + (servers.names.length * height) / 6;
  }
  translate(0, scroll);

  textSize(35);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  for (let i = 0; i < servers.users.length; i++) {
    fill(0);
    stroke(255);
    if (choosen === servers.users[i]) {
      strokeWeight(10);
    } else {
      strokeWeight(3);
    }
    for (let j = 0; j < servers.dates[i].length; j++) {
      message = servers.status[i][j];
      if (message.indexOf("RENAME") === -1) {
        if (message.indexOf("START") > -1) {
          stroke(0, 200, 0);
          message = "STARTED AT";
        }
        if (message.indexOf("STOP") > -1) {
          stroke(200, 0, 0);
          message = "STOPPED AT";
        }

        server.info = message + " " + servers.dates[i][j];
      }
    }
    rect(width / 40, height / 5 + (i * height) / 6, width * 0.95, height / 7);

    textAlign(LEFT, TOP);
    noStroke();
    fill(255);
    textSize(s * 30);
    text(servers.names[i], width / 24, height / 4.7 + (i * height) / 6);
    textAlign(LEFT, BOTTOM);
    textSize(s * 20);
    fill(150);
    if (width > height) {
      text(servers.users[i], width / 24, height / 3 + (i * height) / 6);
      textAlign(RIGHT, BOTTOM);
      text(server.info, (width / 100) * 95, height / 3 + (i * height) / 6);
      text(servers.reasons[i][servers.reasons.length], width / 100*95, height / 3.8 + (i * height) / 6);
    } else {
      text(servers.users[i], width / 24, height / 3 + (i * height) / 6);
      text(server.info, width / 24, height / 3.3 + (i * height) / 6);
    }

    textSize(s * 22);
    fill(255);
    if (
      button(
        width / 40,
        height / 5 + (i * height) / 6,
        width * 0.95,
        height / 8
      ) &&
      mouseIsPressed
    ) {
      choosen = servers.users[i];
      information =
        height -
        height / 3.5 -
        (servers.dates[servers.users.indexOf(choosen)].length * height) / 20;
    }else if (mouseIsPressed && mouseY<height/3*2){
      choosen = "";
    }
  }
  pop();
  type.hide();
  
  if (choosen.length>1){
    
  }
}

function button(x, y, w, h) {
  return mouseX > x && mouseY > y && mouseX < x + w && mouseY < y + h;
}
let server = {
  name: "",
  url: "",
  stage: 0,
};
let incorrect = false;
function create() {
  background(17, 13, 29);

  fill(255, 255, 255, 20);
  rect(0, height / 6, width, height - height / 5);

  textAlign(CENTER, CENTER);
  textSize(s * 40);

  fill(0);
  stroke(255);
  strokeWeight(5);
  if (incorrect) {
    stroke(255, 0, 0);
  }
  if (button(width / 40, height / 2, width - width / 20, height / 15)) {
    strokeWeight(10);
  }
  rect(width / 40, height / 2, width - width / 5, height / 15, 10);

  strokeWeight(5);
  stroke(255, 0, 0);
  rect(width / 20 + width - width / 5, height / 2, width / 8, height / 15, 10);
  noStroke();

  textSize(s * 17);
  fill(255, 0, 0);
  text(
    "SUBMIT",
    width / 20 + width - width / 5,
    height / 2,
    width / 8,
    height / 15
  );
  if (incorrect) {
    text("Invalid URL, please try again", width / 2, height / 5);
  }

  fill(255);
  textAlign(LEFT, CENTER);
  if (type.value() === "") {
    text(setting, width / 20, height / 2, width - width / 20, height / 15);
  } else {
    text(type.value(), width / 20, height / 2, width - width / 20, height / 15);
  }

  type.show();

  if (
    key === "Enter" ||
    (button(
      width / 20 + width - width / 5,
      height / 2,
      width / 8,
      height / 15
    ) &&
      mouseIsPressed)
  ) {
    if (
      (setting === "ENTER URL" &&
        type.value().indexOf("https://education.minecraft.net/joinworld/") >
          -1) ||
      setting !== "ENTER URL"
    ) {
      window.location.replace(
        "https://docs.google.com/forms/d/e/1FAIpQLSfMFMj3Tdk1qvYIIeoJ3CkXI8YVU9UTYpESBHbLxX2uE8AxQw/viewform?usp=pp_url&entry.853013094=" +
          setting +
          "|" +
          type.value()
      );
      stage = "INFO";
    } else {
      incorrect = true;
    }
  }

  fill(0);
  rect(0, (height / 10) * 8, width, height);

  fill(70);
  stroke(100, 255, 100);
  strokeWeight(5);
  rect(width / 20, height - height / 9, width / 4, height / 13);
  stroke(150, 150, 255);
  rect(width / 20 + width / 3, height - height / 9, width / 4, height / 13);
  stroke(255, 100, 100);
  rect(
    width / 20 + (width / 3) * 2,
    height - height / 9,
    width / 4,
    height / 13
  );

  noStroke();
  textSize(s * 20);
  fill(255);
  textAlign(CENTER, CENTER);
  text("NAME", width / 20, height - height / 9, width / 4, height / 13);
  text(
    "URL",
    width / 20 + width / 3,
    height - height / 9,
    width / 4,
    height / 13
  );
  text(
    "STOP",
    width / 20 + (width / 3) * 2,
    height - height / 9,
    width / 4,
    height / 13
  );
  if (mouseIsPressed) {
    if (button(width / 20, height - height / 9, width / 4, height / 13)) {
      setting = "RENAME SERVER";
    }
    if (
      button(
        width / 20 + width / 3,
        height - height / 9,
        width / 4,
        height / 13
      )
    ) {
      setting = "ENTER URL";
    }
    if (
      button(
        width / 20 + (width / 3) * 2,
        height - height / 9,
        width / 4,
        height / 13
      )
    ) {
      setting = "STOP SERVER";
    }
  }
}

function view(){
  
  
  
}

let stage = "INFO";
function draw() {
  textFont(font);
  if (stage === "INFO") {
    showurls();
  }
  if (stage === "ADMIN") {
    create();
  }
  if (stage === "VIEW"){
    view();
  }
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(s * 20);

  if (stage === "INFO") {
    text("MULTIPLAYER SERVERS", width / 2, height / 10);

    if (
      button(width/4,height/11,width/2,height/20) &&
      mouseIsPressed && open
    ) {
      stage = "ADMIN";
      open = false;
    }
  }
  if (stage === "ADMIN") {
    text("ADMIN CONTROLS", width / 2, height / 10);
    if (
      button(width/4,height/11,width/2,height/20) &&
      mouseIsPressed && open
    ) {
      stage = "INFO";
      open = false;
    }
  }
  if (mouseIsPressed) {
    hold++;
  } else {
    hold = 0;
    open = true;
  }
}
