var alertFirst   = document.getElementById("alertFirst");
var productNameInp = document.getElementById("productNameInp");
var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");
var updateIndex ;//undefind
var addBtn = document.getElementById("addBtn");




function validateProductName()
{
    var regex = /^[A-Z][a-z]{3,8}$/;
    if( regex.test(productNameInp.value) == true && productNameInp.value != "" ) 
    {
       productNameInp.classList.remove("is-invalid");
       productNameInp.classList.add("is-valid");
       alertFirst.classList.replace("d-block" , "d-none");

       addBtn.disabled = false;

       return true;
     }
   else
    {
        productNameInp.classList.add("is-invalid");
        productNameInp.classList.remove("is-valid");
        alertFirst.classList.replace("d-none" , "d-block");
        addBtn.disabled = true;

        return false;

    }

}

productNameInp.addEventListener("keyup" ,validateProductName  )


addBtn.addEventListener("click" , function(){


    if(addBtn.innerHTML == "add")
    {
        addProduct();
    }
    else
    {
        updateProducts();
    }
})

function updateProducts()
{
    var product =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value,
    }
    productsList[updateIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
    clearForm();

    addBtn.innerHTML ="add";

}




var productsList;//lma y3ml refresh hyfdaaa
if (localStorage.getItem("myProducts") == null)//zbon gdid malo4 7aga
{
    productsList = [];
}
else {
    productsList = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
    //productList malyaan bel7aga bta3 embar7
}
function addProduct() 
{
    if(validateProductName() == true)
    {

        var product =
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        productsList.push(product); 
        localStorage.setItem("myProducts", JSON.stringify(productsList));
        displayProducts();
        clearForm();
    }
    else
    {
        window.alert("Form Invalid")
    }



}

function displayProducts() {
    var cont = ``;

    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>`+ i + `</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td><button onclick='setData(`+i+`)'  class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}



function setData(index)
{
    updateIndex = index;//number
    //index => rakm el montag ely 3awz update
    productNameInp.value = productsList[index].name;
    productPriceInp.value = productsList[index].price;
    productCategoryInp.value = productsList[index].category;
    productDescInp.value = productsList[index].desc;

    addBtn.innerHTML ="update";

}

function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productDescInp.value = "";
    productCategoryInp.value = "";
}


function searchProducts(term) {
    var cartoona = ``;
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLowerCase().includes(term) == true
        || productsList[i].price.toLowerCase().includes(term) == true
        || productsList[i].category.toLowerCase().includes(term) == true) {
            cartoona += `<tr>
                    <td>`+ i + `</td>
                    <td>` + productsList[i].name + `</td>
                    <td>`+ productsList[i].price + `</td>
                    <td>`+ productsList[i].category + `</td>
                    <td>`+ productsList[i].desc + `</td>
                    <td><button class="btn btn-warning">update</button></td>
                    <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
                   
                  </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}



function deleteProduct(index) {
    productsList.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
}






