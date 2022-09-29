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


//createpoduct



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
        btnTotal: btnTotal.innerHTML,
        count: count.value,
        category: category.value,

    }
    dataProduct.push(product) //save obj in list
    localStorage.setItem('products', JSON.stringify(dataProduct)) //storage data when reload never delete----json.stringfy=>convers list to sting brcaus local storage only exccept string
    console.log(dataProduct)
}