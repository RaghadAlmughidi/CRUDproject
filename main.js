let title = document.getElementById('title');
let price = document.getElementById('price')
let taxes = document.getElementById('taxes');

let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let btnTotal = document.getElementById('btnTotal');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btnCreate = document.getElementById('btnCreate');
let search = document.getElementById('search');
let btnSearchByTitle = document.getElementById('btnSearchByTitle');
let btnDeleteAll = document.getElementById('btnDeleteAll');


//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value; //+ befor variable for convert string to number
        btnTotal.innerHTML = 'total: ' + result;
    }
}


//===========createpoduct=================



//for saving data
let dataProduct;
if (localStorage.products != null) {
    dataProduct = JSON.parse(localStorage.products) //reconvert string to list to show up as list
} else {
    dataProduct = []
}


btnCreate.onclick = function() {
    let product = { //create object to orgnize
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        btnTotal: btnTotal.innerHTML,
        count: count.value,
        category: category.value,

    }
    dataProduct.push(product) //save obj in list
    localStorage.setItem('products', JSON.stringify(dataProduct)) //storage data when reload never delete----json.stringfy=>convers list to sting brcaus local storage only exccept string
    clearData();
    ShowData();
}

//==========clear input====================
function clearData() { //clear data after create it
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    btnTotal.innerHTML = '';
    count.value = '';
    category.value = '';
}
//============read table===============
function ShowData() { //show table data by loop in content
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table +=
            `<tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].btnTotal}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" class="btn">Update</button></td>
            <td><button id="delete" onclick="deleteOneProduct(${i})" class="btn">Delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    //==============delete all btn=============
    let deleteAllBtn = document.getElementById('deleteAllbtn')
    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML = ` <button class = "btn full-width" onclick="deleteAll()"> Delete All </button>`
    } else {
        deleteAllBtn.innerHTML = '';
    }

}
//==========dlete on priduct=======
function deleteOneProduct(i) {
    dataProduct.splice(i, 1); //delt item from list

    localStorage.products = JSON.stringify(dataProduct); //reshow localstorage after delete
    ShowData(); //show table age after delete
}
//==============delete all function=============
function deleteAll() {
    localStorage.clear(); //clear all storag
    dataProduct.splice(0); //clear list from index 0 to end list
    ShowData();
}


ShowData();