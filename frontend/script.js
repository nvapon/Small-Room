const room = document.getElementById("room");
const GRID_SIZE = 6;

let selectedItem = null;

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

const items = [
    {id: "bed", w: 3, h: 2 },
    {id: "desk", w: 3, h: 1 },
    {id: "chair", w: 1, h: 1 },
    {id: "plant", w: 1, h: 1 },
    {id: "trash", w: 1, h: 1 },
    {id: "lamp", w: 1, h: 1 },
];

const itemsContainer = document.getElementById("item");

items.forEach(item => { //for loop
    const el = document.createElement("div");
    el.classList.add("item", item.id);
    el.textContent = item.id;

    el.style.width = `${item.w * 60}px`;
    el.style.height = `${item.h * 60}px`;

    el.addEventListener("click", () => {
        selectItem(item,el);
    });

    itemsContainer.appendChild(el);
});

function selectItem(item, element){
    selectedItem = item;

    document.querySelectorAll(".item").forEach(i => { //ทุกelementบนหน้าเว็บที่มีclass item
        i.classList.remove("selected"); //ลบอันเก่าให้หมดก่อน //เดิมมี2class .item.selected
    });

    element.classList.add("selected"); //เลือกอันใหม่

    console.log("Selected:", item.id);
}