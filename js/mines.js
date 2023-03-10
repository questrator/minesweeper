document.addEventListener("DOMContentLoaded", setConfig);
const cols = document.querySelector("[name='cols']");
const rows = document.querySelector("[name='rows']");
cols.addEventListener("change", setDiffLabel);
rows.addEventListener("change", setDiffLabel);
const difficulty = document.querySelector("#difficulty");
const diffLabel = document.querySelector("[for='difficulty']");
difficulty.addEventListener("change", setDiffLabel)
const start = document.querySelector("#start");
start.addEventListener("click", clearConfig);
start.addEventListener("click", setConfig);

const mineField = document.querySelector(".mines_field");

mineField.addEventListener("click", checkCell);

const config = {
    rows: null,
    cols: null,
    difficulty: null,
    firstCell: null,
    mines: null,
    nums: null,
    map: null,
};
console.log(config);

function clearConfig(event) {
        for (let key in config) {
            config[key] = null;
        }
}

function setConfig() {
    checkLimits();
    setRows();
    setCols();
    setDifficulty();
    setDiffLabel();
    setCells();
}

function checkLimits() {
    if (cols.value < 8) cols.value = 8;
    else if (cols.value > 40) cols.value = 40;
    if (rows.value < 8) rows.value = 8;
    else if (rows.value > 30) rows.value = 30;
}

function setRows() {
    config.rows = Number(document.querySelector("input[name='rows']").value);
}

function setCols() {
    config.cols = Number(document.querySelector("input[name='cols']").value);
}

function setDiffLabel() {
    const diffs = {
        10: "easy",
        15: "medium",
        20: "hard"
    }
    diffLabel.textContent = `${diffs[difficulty.value]} [${getMinesN()} mines]`;
}

function setDifficulty() {
    config.difficulty = Number(document.querySelector("input[name='difficulty']").value);
}

function getMinesN() {
    checkLimits();
    return Math.floor(rows.value * cols.value * difficulty.value / 100);
}

function setCells() {
    mineField.replaceChildren();
    mineField.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
    mineField.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
    for (let i = 0; i < config.rows * config.cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("mines_cell");
        cell.dataset.x = i % config.cols;
        cell.dataset.y = Math.trunc(i / config.rows);
        mineField.appendChild(cell);
    }
}

function checkCell(event) {
    if (!config.firstCell) {
        config.firstCell = `${event.target.dataset.x}/${event.target.dataset.y}`;
    }
    console.log(config.firstCell);
}