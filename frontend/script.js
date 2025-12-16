const room = document.getElementById("room");
const GRID_SIZE = 6;

for(let y=0; y<GRID_SIZE; y++){
    for(let x=0; x<GRID_SIZE; x++){
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.textContent = `${x},${y}`;

        room.appendChild(cell);
    }
}