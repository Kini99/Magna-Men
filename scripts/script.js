// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// /products
// /users


// let hiiUserEl = document.getElementById("hii-user");
// hiiUserEl.addEventListener("mousemove", () => {
// })

// hiiUserEl.addEventListener("mouseleave", () => {
//     document.querySelector(".login-signup-popup").style.visibility = "hidden";
// })

function openHiiUser(){
    document.querySelector(".login-signup-popup").style.visibility = "visible";
}
function closeHiiUser(){
    document.querySelector(".login-signup-popup").style.visibility = "hidden";
}


function dropFilters(elemnt){
    let abc = document.querySelector(`#${elemnt.id} .filter-table-container`);
    abc.style.visibility = "visible"
    abc.style.opacity = "1"
}
function closeDrpedFilter(elemnt){
    let abc = document.querySelector(`#${elemnt.id} .filter-table-container`);
    abc.style.visibility = "hidden"
    abc.style.opacity = "0"
}