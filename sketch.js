let data;
let type;
function preload() {
  data = loadTable(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRSqO6wEp3tGkgN6ZAeu9pDOpSH-sFzMFTuKoaI5jylx_fJLa1RoQeofu_ej1RqCFQVc53D8AWy7RU2/pub?gid=2092612853&single=true&output=csv",
    "header",
    "csv"
  );
}
let show = [];
let open = true;
let s = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  data = data.getArray();
  print(data);

  type = createInput();
  type.size(width - 10, height - 10);
  type.position(0, 0);
  type.style("background-color", color(0, 0, 0, 0));
  type.style("border-color", color(0, 0, 0, 0));
  type.style("color", color(0, 0, 0, 0));
  type.hide();
  //https://docs.google.com/forms/d/e/1FAIpQLSfMFMj3Tdk1qvYIIeoJ3CkXI8YVU9UTYpESBHbLxX2uE8AxQw/viewform?usp=pp_url&entry.853013094=The_Data

  let inactive = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][2].split("|")[1] === "Inactive") {
      inactive.push(data[i][2].split("|")[0]);
    } else {
      show.push({
        user: data[i][1],
        date: new Date(data[i][0]),
        url: data[i][2].split("|")[1],
        name: data[i][2].split("|")[0],
      });
    }
  }
  for (let i = 0; i < inactive.length; i++) {
    for (let j = 0; j < show.length; j++) {
      if (show[j].name + show[j].user === inactive[i]) {
        show.splice(j, 1);
      }
    }
  }

  s = min([width, height]) / 500;

  print(show);
}
let scroll = 0;
function mouseWheel(event) {
  scroll -= event.delta;
}
function mouseDragged() {
  scroll -= pmouseY - mouseY;
}
function formatMilliseconds(milliseconds) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Construct the formatted string
  const formattedString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return formattedString;
}

let tried = [];

function showurls() {
  push();
  if (scroll > 0) {
    scroll = 0;
  }
  translate(0, scroll);
  background(6, 3, 12);

  textSize(35);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  for (let i = 0; i < show.length; i++) {
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = color(180, 120, 255);
    fill(17, 13, 29);
    stroke(61, 40, 86);
    strokeWeight(3);
    rect(
      width / 40,
      height / 5 + (i * height) / 2.6,
      width * 0.95,
      height / 3.1,
      10
    );

    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(255);
    fill(0);
    if (tried.indexOf(i) === -1) {
      stroke(255);
    } else {
      stroke(255, 0, 0);
    }
    strokeWeight(3);
    rect(
      width / 15,
      height / 2.3 + (i * height) / 2.6,
      width - (width / 15) * 2,
      height / 15,
      10
    );

    drawingContext.shadowColor = color(0);
    noStroke();
    fill(255);
    textSize(s * 60);
    text(show[i].name, width / 2, height / 3.5 + (i * height) / 2.6);
    textSize(s * 20);
    text("Age", width / 4, height / 2.65 + (i * height) / 2.6);
    text("Admin", (width / 4) * 3, height / 2.65 + (i * height) / 2.6);

    textSize(s * 25);
    text(
      formatMilliseconds(new Date() - show[i].date),
      width / 4,
      height / 2.5 + (i * height) / 2.6
    );
    text(show[i].user, (width / 4) * 3, height / 2.5 + (i * height) / 2.6);
    textSize(s * 22);
    if (tried.indexOf(i) === -1) {
      fill(255);
    } else {
      fill(255, 0, 0);
    }
    if (tried.indexOf(i) === -1) {
      text(
        "JOIN SERVER",
        width / 15,
        height / 2.3 + (i * height) / 2.6,
        width - (width / 15) * 2,
        height / 15
      );
    } else {
      text(
        "REPORT AS INACTIVE",
        width / 15,
        height / 2.3 + (i * height) / 2.6,
        width - (width / 15) * 2,
        height / 15
      );
    }

    if (
      button(
        width / 15,
        height / 2.3 + (i * height) / 2.6 + scroll,
        width - (width / 15) * 2,
        height / 15
      ) &&
      hold > 0 &&
      hold < 5 &&
      !mouseIsPressed &&
      open
    ) {
      if (tried.indexOf(i) === -1) {
        window.open(show[i].url);
        tried.push(i);
      } else {
        window.open(
          "https://docs.google.com/forms/d/e/1FAIpQLSfMFMj3Tdk1qvYIIeoJ3CkXI8YVU9UTYpESBHbLxX2uE8AxQw/viewform?usp=pp_url&entry.853013094=" +
            show[i].name +
            show[i].user +
            "|Inactive"
        );
      }
      open = false;
    }
    if (!mouseIsPressed) {
      open = true;
    }
  }
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color(255);

  strokeWeight(3);
  fill(0);
  stroke(255);
  rect(width / 40, height / 60, width - (width / 40) * 2, height / 15, 10);
  rect(
    width / 40,
    height / 60 + height / 13,
    width - (width / 40) * 2,
    height / 15,
    10
  );

  drawingContext.shadowColor = color(0);
  noStroke();
  fill(255);
  textSize(s * 25);
  textAlign(CENTER, CENTER);
  text(
    "UPLOAD SERVER",
    width / 40,
    height / 60,
    width - (width / 40) * 2,
    height / 15
  );
  text(
    "DOWNLOAD MINECRAFT EDU",
    width / 40,
    height / 60 + height / 13,
    width - (width / 40) * 2,
    height / 15
  );
  pop();

  if (
    button(
      width / 40,
      height / 60 + scroll,
      width - (width / 40) * 2,
      height / 15
    ) &&
    mouseIsPressed
  ) {
    stage = "CREATE";
  }
  if (
    button(
      width / 40,
      height / 60 + height / 13 + scroll,
      width - (width / 40) * 2,
      height / 15
    ) &&
    mouseIsPressed &&
    open
  ) {
    window.open("https://education.minecraft.net/en-us/get-started/download");
    open = false;
  }
  type.hide();
}
function button(x, y, w, h) {
  return mouseX > x && mouseY > y && mouseX < x + width && mouseY < y + h;
}
let server = {
  name: "",
  url: "",
  stage: 0,
};
let incorrect = false;
function create() {
  background(17, 13, 29);

  textAlign(CENTER, CENTER);
  stroke(255);
  fill(255);
  textSize(s * 40);

  fill(0);
  if (server.stage === 0) {
    strokeWeight(10);
  } else {
    strokeWeight(2);
  }
  rect(width / 40, (height / 5) * 2, width - width / 20, height / 15, 10);
  if (server.stage === 1) {
    strokeWeight(10);
  } else {
    strokeWeight(2);
  }
  if (incorrect) {
    stroke(255, 0, 0);
  }
  rect(width / 40, (height / 5) * 3, width - width / 20, height / 15, 10);

  if (
    button(width / 40, (height / 5) * 2, width - width / 20, height / 15) &&
    mouseIsPressed
  ) {
    server.stage = 0;
  }

  if (
    button(width / 40, (height / 5) * 3, width - width / 20, height / 15) &&
    mouseIsPressed
  ) {
    server.stage = 1;
  }

  stroke(255, 0, 0);
  rect(width / 2.4, (height / 5) * 4, width - width / 1.2, height / 15, 10);
  noStroke();
  
  textSize(s*20);
  fill(255, 0, 0);
  text(
    "SUBMIT",
    width / 2.4,
    (height / 5) * 4,
    width - width / 1.2,
    height / 15
  );
  if (incorrect) {
    text("Invalid URL, please try again", width / 2, height / 5);
  }

  fill(255);
  text(
    server.name,
    width / 40,
    (height / 5) * 2,
    width - width / 20,
    height / 15
  );
  text(
    server.url,
    width / 40,
    (height / 5) * 3,
    width - width / 20,
    height / 15
  );

  if (server.name === "") {
    text(
      "Name the server",
      width / 40,
      (height / 5) * 2,
      width - width / 20,
      height / 15,
      10
    );
  }
  if (server.url === "") {
    text(
      "Enter URL",
      width / 40,
      (height / 5) * 3,
      width - width / 20,
      height / 15,
      10
    );
  }

  type.show();
  if (server.stage === 0) {
    server.name = type.value();
  } else {
    server.url = type.value();
  }

  if (
    key === "Enter" ||
    (button(width / 2.4, (height / 5) * 4, width - width / 1.2, height / 15) &&
      mouseIsPressed &&
      server.stage === 0)
  ) {
    server.stage = 1;
    type.value("");
  }

  if (
    key === "Enter" ||
    (button(width / 2.4, (height / 5) * 4, width - width / 1.2, height / 15) &&
      mouseIsPressed &&
      server.stage === 1)
  ) {
    if (server.url.indexOf("https://education.minecraft.net/joinworld/") > -1) {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSfMFMj3Tdk1qvYIIeoJ3CkXI8YVU9UTYpESBHbLxX2uE8AxQw/viewform?usp=pp_url&entry.853013094=" +
          server.name +
          "|" +
          server.url
      );
      type.value("");
      stage = "INFO";
    } else {
      incorrect = true;
    }
  }
}

let stage = "INFO";
function draw() {
  if (stage === "INFO") {
    showurls();
  }
  if (stage === "CREATE") {
    create();
  }

  if (mouseIsPressed) {
    hold++;
  } else {
    hold = 0;
  }
}
