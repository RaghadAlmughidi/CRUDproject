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
let searchByCategory = document.getElementById('searchByCategory');
let btnDeleteAll = document.getElementById('btnDeleteAll');
let mood = 'create'
let tmp; //tmprory variable totake data from update() to create()


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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        btnTotal: btnTotal.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    if (mood === 'create') {
        //======== creat product whith spicifec count
        if (product.count > 1) {
            for (let i = 0; i < product.count; i++) {
                dataProduct.push(product)
            }
        } else { dataProduct.push(product) }
    } else {
        dataProduct[tmp] = product
        btnTotal.innerHTML = '';
        mood = 'create'
        btnCreate.innerHTML = 'Create';
        count.style.display = 'block'


    }

    //save obj in list
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
    getTotal();
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
            <td><button id="update" onclick="updateDate(${i})" class="btn">Update</button></td>
            <td><button id="delete" onclick="deleteOneProduct(${i})" class="btn">Delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    //==============delete all btn=============
    let deleteAllBtn = document.getElementById('deleteAllbtn')
    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML = ` <button class = "btn full-width" onclick="deleteAll()"> Delete All (${dataProduct.length}) </button>`
    }

}
//==========delete one priduct===============
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
//==============update data=================
function updateDate(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    btnCreate.innerHTML = 'Update'
    mood = 'update';
    tmp = i //let i are visable for all function GLOBAL
    scroll({
        top: 0,
        behavior: "smooth"
    })


}


//================search========================
let searchMood = 'title';

function getSearchMood(id) {
    if (id == 'btnSearchByTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'search by ' + searchMood
    search.focus()
}



function searchData(value) {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == 'title') {


            if (dataProduct[i].title.includes(value)) {
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
                <td><button id="update" onclick="updateDate(${i})" class="btn">Update</button></td>
                <td><button id="delete" onclick="deleteOneProduct(${i})" class="btn">Delete</button></td>
            </tr>`
            }


        } else {

            if (dataProduct[i].category.includes(value)) {
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
                <td><button id="update" onclick="updateDate(${i})" class="btn">Update</button></td>
                <td><button id="delete" onclick="deleteOneProduct(${i})" class="btn">Delete</button></td>
            </tr>`
            }

        }
    }
    document.getElementById('tbody').innerHTML = table;
}
ShowData();