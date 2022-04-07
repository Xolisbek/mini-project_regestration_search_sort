// element yasab beruvchi funksiya
let createElem = (elem) => {
  return document.createElement(elem);
};

// elementlarni ko`rsatilgan selectorlar orqali tanlab oluvchi funksiya
let selectElem = (elem) => {
  return document.querySelector(elem);
};
// kiritilgan ma`lumotlarni o`zida saqlaydigan massiv
let dataArr = [];
// massivdagi mavjud ma`lumotlarni chiqarib beruvchi funksiya
function createDateTable(arr, countId) {
  if (countId == 1) {
    // create .tableDiv tag
    let boxTableDiv = createElem("div");
    boxTableDiv.className = "tableDiv";
    boxTableDiv.setAttribute("id", "tableDiv");
    document.body.appendChild(boxTableDiv);
    // create table tag
    elemTable = createElem("table");
    elemTable.className = "regTable";
    boxTableDiv.appendChild(elemTable);
    // create tr tag in thead tag
    let elemTheadTr = createElem("tr");
    elemTheadTr.className = "theadTr thead";
    elemTable.appendChild(elemTheadTr);
    for (let indexArr of arr) {
      for (let key in indexArr) {
        let th = createElem("th");
        th.textContent = key;
        elemTheadTr.appendChild(th);
      }
    }
  }
  // create tr tag
  let elemTr = createElem("tr");
  elemTr.className = "trTag";
  elemTable.appendChild(elemTr);
  for (let key in dataArr[countId - 1]) {
    let elemTd = createElem("td");
    elemTd.textContent = dataArr[countId - 1][key];
    elemTr.appendChild(elemTd);
  }
}
let countId = 1; // jadvaldagi id ustuniga qiymat berish uchun
// formaga ma`lumotlar kiritilib Submit bosilgandagi jarayon------------------------
function submitForm(e) {
  dataArr.push({
    id: countId,
    name:
      nameInp.value.slice(0, 1).toUpperCase() +
      nameInp.value.slice(1).toLowerCase(),
    surName:
      surName.value.slice(0, 1).toUpperCase() +
      surName.value.slice(1).toLowerCase(),
    age: ageInp.value,
    phon: phonNumber.value,
  });
  createDateTable(dataArr, countId);
  countId++;
  nameInp.value = null;
  surName.value = null;
  ageInp.value = null;
  phonNumber.value = null;
}
// search va filterning natijasini chiqarish
let searchBoxTableDiv, searchElemTable, elemTheadTr;
function searchOrFilter(obj) {
  if (document.getElementById("searchTableDiv") != null) {
    // ----------- searchBoxTableDiv ni o`chirish
    document.getElementById("searchTableDiv").remove();
  }
  searchBoxTableDiv = createElem("div");
  searchBoxTableDiv.className = "tableDiv searchTableDiv";
  searchBoxTableDiv.setAttribute("id", "searchTableDiv");
  document.body.appendChild(searchBoxTableDiv);
  // create table tag
  searchElemTable = createElem("table");
  searchElemTable.className = "regTable";
  searchBoxTableDiv.appendChild(searchElemTable);
  // create tr tag in thead tag
  elemTheadTr = createElem("tr");
  elemTheadTr.className = "theadTr thead";
  searchElemTable.appendChild(elemTheadTr);
  obj.arr.forEach((elem, index) => {
    if (index == 0) {
      for (let key in elem) {
        let th = createElem("th");
        th.textContent = key;
        elemTheadTr.appendChild(th);
      }
    }
  });
  obj.arr.forEach((elem, index) => {
    let tr = createElem("tr");
    tr.className = "trTag";
    searchElemTable.appendChild(tr);
    for (key in elem /* bu elem o`zgaruvchisi obyekt */) {
      let td = createElem("td");
      td.textContent = elem[key];
      tr.appendChild(td);
    }
  });
}
