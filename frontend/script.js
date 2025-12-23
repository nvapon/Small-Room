const room = document.getElementById("room");
const GRID_SIZE = 6;
const occupied = new Set();

let selectedItem = null;

for(let y=0; y<GRID_SIZE; y++){
    for(let x=0; x<GRID_SIZE; x++){
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.dataset.x = x; //data-x = x บนhtml //datasetเก็บเป็นstring
        cell.dataset.y = y; //data-y = y
        cell.textContent = `${x},${y}`;

        room.appendChild(cell);

        cell.addEventListener("mouseenter", () => {
            showPreview(cell);
        });

        cell.addEventListener("mouseleave", () => {
            clearPreview();
        });
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

function showPreview(cell) {
    if(!selectedItem) return;

    clearPreview();

    const startX = Number(cell.dataset.x); //แปลงstringเป็นตัวเลข
    const startY = Number(cell.dataset.y);

    let valid = true;
    const previewCells = [];

    for(let y=0; y<selectedItem.h; y++){ //รันครบ2forloopแล้วrenderทีเดียว->เห็นหลายcell showพร้อมกัน single thread
        for(let x=0; x<selectedItem.w; x++){
            const tx = startX + x;
            const ty = startY + y;

            const target = document.querySelector( //ค้นหา element จาก “เงื่อนไข” document.querySelector('.cell[data-x="3"][data-y="2"]')
                `.cell[data-x="${tx}"][data-y="${ty}"]` //f'{}..{}..' ใช้blacktick เมื่อมีการแทรกตัวแปรในstr
            );

            if(!target || occupied.has(`${tx},${ty}`)){
                valid = false;
                continue;
            }

            previewCells.push(target);
        }
    }

    previewCells.forEach( c => {
        c.classList.add(valid ? "preview" : "invalid");
    });
}

function clearPreview(){
    document.querySelectorAll(".cell.preview", ".cell.invalid").forEach(c => {
        c.classList.remove("preview", "invalid");
    });
}