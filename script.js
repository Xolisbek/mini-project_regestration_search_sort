let p = createElem("p");
p.textContent = "Iltimos Regestration yoki Search tugmalaridan birini bosing!";
p.className = "noSelect";
p.setAttribute("id", "noSelect");
document.body.appendChild(p);
// qaysi qisim tanlanganini aniqlash -----------------------------------------------
let onclickCountReg = 1;
let onclickCountSear = 1;
function select(val) {
  if (val == "reg") {
    document.getElementById("regestration").style.color = "red";
    document.getElementById("search").style.color = "black";
    document.getElementById("noSelect").style.display = "none";
    createInterface("reg");
  } else if (val == "search") {
    window.document.getElementById("regestration").style.color = "black";
    window.document.getElementById("search").style.color = "red";
    document.getElementById("noSelect").style.display = "none";
    createInterface("search");
  }
}
// funksiya ichida ishlatiladigan o`zgaruvchilar
let form,
  nameInp,
  surName,
  ageInp,
  phonNumber,
  submit,
  userWarningMessage,
  create_searchSectionDiv = false,
  selectFilter,
  searchInp;
// tanlangan interface ni yasash va ular orasidagi almashinuvni nazoratga olish-----
function createInterface(sel) {
  if (sel == "reg") {
    if (onclickCountReg == 1) {
      // create form tag -------------------------------
      form = createElem("form");
      form.className = "form";
      form.setAttribute("id", "form");
      form.setAttribute("onsubmit", "submitForm();return false"); // onsubmit attributini qo`shish
      document.body.appendChild(form);
      // create h4 title tag
      let title = createElem("h4");
      title.textContent = "Regestration";
      title.className = "title";
      form.appendChild(title);
      // create name input -----------------------------
      nameInp = createElem("input");
      nameInp.setAttribute("type", "text");
      nameInp.setAttribute("required", ""); //Submitdan oldin ma`lumot kiritilganligini tekshiradi
      nameInp.setAttribute("placeholder", "Ism...");
      nameInp.setAttribute("maxlength", "15");
      nameInp.setAttribute("pattern", "[A-Za-z]{1,}");
      nameInp.setAttribute("title", "Iltimos faqat harif kiriting!");
      nameInp.className = "name";
      form.appendChild(nameInp);
      // create surName input --------------------------
      surName = createElem("input");
      surName.setAttribute("type", "text");
      surName.setAttribute("required", ""); //Submitdan oldin ma`lumot kiritilganligini tekshiradi
      surName.setAttribute("placeholder", "Familiya...");
      surName.setAttribute("maxlength", "15");
      surName.setAttribute("pattern", "[A-Za-z]{1,}");
      surName.setAttribute("title", "Iltimos faqat harif kiriting!");
      surName.className = "surName";
      form.appendChild(surName);
      // create age input ------------------------------
      ageInp = createElem("input");
      ageInp.setAttribute("type", "number");
      ageInp.setAttribute("required", ""); //Submit dan oldin ma`lumot borligini tekshiradi
      ageInp.setAttribute("placeholder", "Yosh...");
      ageInp.setAttribute("min", "1"); // minimum kiritilishi mumkin bo`lgan son
      ageInp.setAttribute("max", "100"); // maximum kiritilishi mumkin bo`lgan son
      ageInp.setAttribute(
        "title",
        "Iltimos 1 va 100 oralig`idagi sonni kiriting!"
      );
      ageInp.className = "age";
      form.appendChild(ageInp);
      // create phonNumber input -----------------------
      phonNumber = createElem("input");
      phonNumber.setAttribute("type", "tel");
      phonNumber.setAttribute("required", "");
      phonNumber.setAttribute(
        "placeholder",
        "Telefon raqam  +998901234567 formatda"
      );
      phonNumber.setAttribute(
        "pattern",
        "^[+]{1}[99]{2}[8]{1}[0-9]{9}$"
      ); /* telefo`n raqamni formatini tekshirish */
      phonNumber.setAttribute(
        "title",
        "Iltimos raqamingizni +998901234567 ko`rinishida kiriting!"
      );
      phonNumber.className = "phon";
      form.appendChild(phonNumber);
      // create submit input ---------------------------
      submit = createElem("input");
      submit.setAttribute("type", "submit");
      submit.setAttribute("value", "Submit");
      submit.className = "submit";
      form.appendChild(submit);
    } else if (onclickCountSear >= onclickCountReg && onclickCountSear != 1) {
      // search tugmasi bosilganda yashirilgan fo`rmani yana ko`rinadigan qilish
      document.getElementById("form").style.display = "block";
      // search bosilganda ro`yxatga olinganlar jadvalini yana ko`rinadigan qilish
      if (document.getElementById("tableDiv") != null) {
        document.getElementById("tableDiv").style.display = "block";
        /*
        tepadagi shartda tableDiv id siga ega element tanlanga,agar submit bosilsagina bu element yasaladi va body tagi ichida hosil bo`ladi.Aks holda mavjud bo`lmaydi va tepadagi
        document.getElementById("tableDiv") qilib tanlash null qiymatini qaytaradi.Shuning uchun ham null ga tekshirilgan
         */
      }
    }
    // searchTableDiv ning qiymatini regestration qismiga o`tganda yashirish
    if (document.getElementById("searchTableDiv") !== null) {
      document.getElementById("searchTableDiv").style.display = "none";
    }
    // massivda ma`lumot yo`qligi haqida ogohlantiruvchi xabarni yashirish
    if (userWarningMessage != undefined) {
      document.getElementById("warningMessage").style.display = "none";
    }
    // regestration qismida searchSectionDiv ni yashirish
    if (create_searchSectionDiv) {
      document.getElementById("searchSectionDiv").style.display = "none";
    }
    onclickCountReg++;
  } else if (sel == "search") {
    if (onclickCountReg >= onclickCountSear && onclickCountReg != 1) {
      // search bosilganda regestration formasini yashirish
      document.getElementById("form").style.display = "none";
      // search bosilganda ro`yxatga olinganlar jadvalini yashirish
      if (document.getElementById("tableDiv") != null) {
        document.getElementById("tableDiv").style.display = "none";
      }
      // regestration qismiga o`tganda yashirilgan searchSectionDiv ni, search qismida ko`rinadigan qilish
      if (create_searchSectionDiv) {
        document.getElementById("searchSectionDiv").style.display = "block";
      }
    }
    // rgestration qismiga o`tganda yashirilgan searchTableDiv ni ko`rinadigan qilish
    if (document.getElementById("searchTableDiv") != null) {
      document.getElementById("searchTableDiv").style.display = "block";
    }
    if (dataArr.length == 0) {
      if (form != undefined)
        // agar ma`lumot kiritilmagan bo`lsa regestration fo`rmasini yashirish
        document.getElementById("form").style.display = "none";
      if (onclickCountSear == 1) {
        userWarningMessage = createElem("p");
        userWarningMessage.className = "warningMessage";
        userWarningMessage.setAttribute("id", "warningMessage");
        userWarningMessage.textContent =
          "Siz ro`yxatga hech kimni qo`shmagansiz,regestration bo`limiga o`tib ro`yxatni shakillantiring!";
        document.body.appendChild(userWarningMessage);
      } else document.getElementById("warningMessage").style.display = "block";
    } else {
      /* Agar ma`lumot kiritilib.ro`yxat shakillantirilgan bo`lsa quyidagilar bajariladi */
      // 1-Yasalgan ma`lumotlarni o`rab turuvchi divni yasash
      if (!create_searchSectionDiv /*searchSection yasalmagan bo`lsa degani*/) {
        create_searchSectionDiv = true; // searchSectionDiv yasalganini bildiradi
        // searchSectionDiv - searchSection ni o`rab turuvchi umumiy divni yasash
        let searchSectionDiv = createElem("div");
        searchSectionDiv.className = "searchSectionDiv";
        searchSectionDiv.setAttribute("id", "searchSectionDiv");
        document.body.appendChild(searchSectionDiv);
        // Search input ni yasash
        searchInp = createElem("input");
        searchInp.setAttribute("type", "text");
        searchInp.setAttribute("placeholder", "Search");
        searchInp.className = "searchInp";
        searchSectionDiv.appendChild(searchInp);
        // ma`lumotlarni filtirlash turini tanlash uchun select tagi ni yasash
        selectFilter = createElem("select");
        selectFilter.className = "selectFilter";
        selectFilter.setAttribute("id", "selectFilter");
        searchSectionDiv.appendChild(selectFilter);
        // select tagi ni ichidagi  option taglarini yasash
        // 1-optonni yasash
        let optionFilter1 = createElem("option");
        optionFilter1.textContent = "unsorted";
        optionFilter1.setAttribute("value", "unsorted");
        // optionFilter1.setAttribute("disabled", "");// tanlanmaydigan qilib qo`yish
        optionFilter1.setAttribute("selected", "");
        selectFilter.appendChild(optionFilter1);
        // 2-optionni yasash
        let optionFilter2 = createElem("option");
        optionFilter2.textContent = "search by name";
        optionFilter2.setAttribute("value", "name");
        selectFilter.appendChild(optionFilter2);
        // 3-optionni yasash
        let optionFilter3 = createElem("option");
        optionFilter3.textContent = "search by surName";
        optionFilter3.setAttribute("value", "surName");
        selectFilter.appendChild(optionFilter3);
        // 4-optionni yasash
        let optionFilter4 = createElem("option");
        optionFilter4.textContent = "search by age";
        optionFilter4.setAttribute("value", "age");
        selectFilter.appendChild(optionFilter4);
      }
      // ma`lumotlarni search bo`limiga yuborish
      searchOrFilter({
        arr: dataArr,
        search: "",
        sort: "unsorted",
      });
    }
    onclickCountSear++;
  }
  // Agar searchSectionDiv mavjud bo`lsa(ya`ni yasalgan bo`lsa) quyidagilar bajariladi
  if (create_searchSectionDiv) {
    let reg, resultArr;
    /* bu inputning qiymati har safat o`zgarganda ishga tushadi */
    searchInp.addEventListener("input", (e) => {
      if (searchInp.value == "") {
        searchOrFilter({
          arr: dataArr,
          search: searchInp.value,
          sort: selectFilter.value,
        });
      } else {
        reg = new RegExp(searchInp.value, "gi");
        resultArr = dataArr.filter((elemObj) => {
          reg.lastIndex = 0; /* har safar qidiruvni ko`rsatilag texning 0-index dan boshlaydi */
          return reg.test(elemObj.name) || reg.test(elemObj.surName);
        });
        searchOrFilter({
          arr: resultArr,
          search: searchInp.value,
          sort: selectFilter.value,
        });
      }
    });
    /* bu selectning qiymati har safat o`zgarganda ishga tushadi*/
    selectFilter.addEventListener("input", (e) => {
      if (searchInp.value == "") {
        // unsorted tanlansa massivni quyidagicha saralaydi
        if (selectFilter.value == "unsorted") {
          dataArr.sort((a, b) => {
            return a.id - b.id;
          });
        } else if (selectFilter.value == "name") {
          dataArr.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
        } else if (selectFilter.value == "surName") {
          dataArr.sort((a, b) => {
            if (a.surName < b.surName) return -1;
            if (a.surName > b.surName) return 1;
            return 0;
          });
        } else if (selectFilter.value == "age") {
          dataArr.sort((a, b) => {
            return a.age - b.age;
          });
        }
        searchOrFilter({
          arr: dataArr,
          search: searchInp.value,
          sort: selectFilter.value,
        });
      } else {
        // unsorted tanlansa massivni quyidagicha saralaydi
        if (selectFilter.value == "unsorted") {
          resultArr.sort((a, b) => {
            return a.id - b.id;
          });
        } else if (selectFilter.value == "name") {
          resultArr.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
        } else if (selectFilter.value == "surName") {
          resultArr.sort((a, b) => {
            if (a.surName < b.surName) return -1;
            if (a.surName > b.surName) return 1;
            return 0;
          });
        } else if (selectFilter.value == "age") {
          resultArr.sort((a, b) => {
            return a.age - b.age;
          });
        }
        searchOrFilter({
          arr: resultArr,
          search: searchInp.value,
          sort: selectFilter.value,
        });
      }
    });
  }
}
