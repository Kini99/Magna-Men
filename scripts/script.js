// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `https://63f45eca3f99f5855dae29dc.mockapi.io`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// /products
// /users
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