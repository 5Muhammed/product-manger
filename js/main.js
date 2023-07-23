var productNameInput = document.getElementById("prdocutName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescritptionInput = document.getElementById("productDescription");
var updateButton = document.getElementById("updateButton");
var addButton = document.getElementById("addButton");
var indexOfUpdate = 0;
var allProducts = [];

if (localStorage.getItem("products") != null) {
  allProducts = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescritptionInput.value,
  };
  allProducts.push(product);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayProducts();
  clearData();
}

function displayProducts() {
  carton = ``;
  for (var i = 0; i < allProducts.length; i++) {
    carton += `<tr class = "text-center">
      <td>${allProducts[i].name}</td>
      <td>${allProducts[i].price}</td>
      <td>${allProducts[i].category}</td>
      <td>${allProducts[i].description}</td>
      <td>
        <button class = "update-button btn btn-sm btn-outline-warning" 
            id = "updateButton" onclick = "setData(${i})">Update</button>
        <button class = "delete-button btn btn-sm btn-outline-danger" 
            id = "updateButton"onclick = "deletProducts(${i})">Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("tabelBody").innerHTML = carton;
}

function deletProducts(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayProducts();
}

function searchProduct() {
  var term = document.getElementById("searchInput").value;
  carton = ``;
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())) {
      carton += `
          <tr class = "text-center">
          <td>${allProducts[i].name}</td>
          <td>${allProducts[i].price}</td>
          <td>${allProducts[i].category}</td>
          <td>${allProducts[i].description}</td>
          <td>
            <button class = "update-button btn btn-sm btn-outline-warning" 
                id = "setData(${i})">Update</button>
            <button class = "delete-button btn btn-sm btn-outline-danger" 
                id = "updateButton"onclick = "deletProducts(${i})">Delete</button>
          </td>
        </tr>`;
    }
  }
  document.getElementById("tabelBody").innerHTML = carton;
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescritptionInput.value,
  };
  allProducts.splice(indexOfUpdate, 1, product);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayProducts();
  addButton.classList.remove("d-none");
  updateButton.classList.add("d-none");
  clearData();
}

function setData(index) {
  productNameInput.value = allProducts[index].name;
  productPriceInput.value = allProducts[index].price;
  productCategoryInput.value = allProducts[index].category;
  productDescritptionInput.value = allProducts[index].description;
  indexOfUpdate = index;
  addButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
}

function clearData() {
  productNameInput.value = "";
  productPriceInput.value = "";
  (productCategoryInput.value = ""), (productDescritptionInput.value = "");
}
