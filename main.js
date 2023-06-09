const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const productos = [
    {
        id: 1,
        nombre: "Pesas 2kg",
        precio: 2500,
        img: "img/pesas 2kg.jpg",
        cantidad: 1, 
    },
    {
        id: 2,
        nombre: "Cinta de correr",
        precio: 350000,
        img: "img/cinta correr.jpg",
        cantidad: 1, 
    },
    {
        id: 3,
        nombre: "Proteina ultra whey",
        precio: 7500,
        img: "img/Ultra Whey Protein 21 (Frutilla) - Polvo - 750 Grs. (1,6 Lbs.) - Satur.jpg",
        cantidad: 1, 
    },
    {
        id: 4,
        nombre: "Disco agarre plastico 10kg",
        precio: 8000,
        img: "img/disco bsfit c agarre plastico 10kg.jpg",
        cantidad: 1, 
    },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    console.log(data);
};

getProducts();

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        <p>Cantidad: ${product.cantidad}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar"

    content.append(comprar);

    comprar.addEventListener("click", () =>{

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    
    if (repeat){
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        })
    }else {
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    }
    console.log(carrito);
    carritoCounter();
    saveLocal();
    });
});

verCarrito.addEventListener("click", () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
        `;
    modalContainer.append(carritoContent);
    });

    const total = carrito.reduce ((acc, mas) => acc + mas.precio, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total compra: ${total} $`;
    modalContainer.append(totalCompra);
});

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

