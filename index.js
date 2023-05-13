
// call api
let productList = [];
let productPickedList = JSON.parse(localStorage.getItem("doan_cart")) || [];
document.getElementById("cart").innerHTML = productPickedList.length;

const getProducts = async () => {
  const data = await axios({
    method: "GET",
    url: "https://642828e6161067a83b0840da.mockapi.io/sp",
  });
  productList = [...data.data];
  return data.data;
};

const order = () => {
if (productPickedList.length === 0) {
   return Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
} else {
  Swal.fire({
    title: 'suscess!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
}
}

const calculateBill = () => {
  const totalBill = productPickedList.reduce((total, productPicked) => {
    return total + productPicked.count
  }, 0)
  document.getElementById('total').innerHTML = totalBill
}
// gọi hàm tính tổng khi vào website
calculateBill()

var removeItemPicked = (index) => {
  productPickedList.splice(index, 1)
  renderProductPickedList(productPickedList)
  localStorage.setItem('doan_cart', JSON.stringify(productPickedList))
  calculateBill()
  document.getElementById("cart").innerHTML = productPickedList.length;
}

var renderProductPickedList = (productPickedList) => {
  if (productPickedList.length === 0) {
    document.getElementById("modal-cart-content").innerHTML = `
      <p class="text-center">Bạn chưa thêm vào ghim!</p>
    `;
  } else {
    const htmlString = productPickedList.reduce((accHTML, productPicked, index) => {
      return (
        accHTML +
        `
        <div class="card myCard">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
              <div>
                <img src="${productPicked.img}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
              </div>
              <div class="ms-3">
                <h5> 
                  <a href="${productPicked.file}">${productPicked.name}</a>
                </h5>
                <p style="width: 300px;" class="text-truncate fst-italic myDesc">${productPicked.descr}</p>
              </div>
             
            </div>
            <div class="d-flex flex-row align-items-center">
              <div style="margin-right: 30px;">

              </div>
              <span style="color: red;" onclick='removeItemPicked(${index})'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      `
      );
    }, "");
    document.getElementById('modal-cart-content').innerHTML = htmlString
  }
};

renderProductPickedList(productPickedList);

let addToCart = (id) => {
  const itemPicked = productList.find((product) => product.id == id);
  productPickedList.push(itemPicked);
  localStorage.setItem("doan_cart", JSON.stringify(productPickedList));
  document.getElementById("cart").innerHTML = productPickedList.length;
  renderProductPickedList(productPickedList);
  console.log(productPickedList);
};

const renderProductList = () => {
  const htmlString = productList.reduce((accHTML, product) => {
    return (
      accHTML +
      `

<div style: "color:white">
<div class="card" style="width: 20rem; margin:1.3vw; background-color: rgba(250, 232, 210, 0.8);">
<img
src='${product.img}'
class="card-img-top flex-fill"
alt="..."
style='height: 300px;'
/>
<div class="card-body">
<h5 class="card-title">${product.name}</h5>
<p class="card-text">${product.descr}</p>
<a href="${product.file}" class="btn btn-primary">Chi tiết</a>
<button type="button" class="btn btn-dark" onclick="addToCart(${product.id})"><span style="margin-left: 8px;">Thêm vào ghim!</span></button>
</div>
</div>
</div>

    `
    );
  }, "");
  document.getElementById("product-list").innerHTML = htmlString;
};

getProducts().then((results) => {
  console.log(results);
  renderProductList();
});
