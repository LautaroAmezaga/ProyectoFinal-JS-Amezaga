const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class = "modal-header-tittle">Carrito</h1>
    `
    modalContainer.append(modalHeader)

    const modalbutton = document.createElement("h1")
    modalbutton.innerText = "x"
    modalbutton.className = "modal-header-button"

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalbutton)

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML= `
            <img src ="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio}$</p>
            <span class = "restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class = "sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class = "delete-product"> ❌ </span>
        `
        
        modalContainer.append(carritoContent)
        
        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click",()=>{
            if(product.cantidad !== 1){
                product.cantidad--
            }
            saveLocal()
            pintarCarrito()
        })
        
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () =>{
            product.cantidad++,
            saveLocal()
            pintarCarrito()
        })

        let eliminar = carritoContent.querySelector(".delete-product")

        eliminar.addEventListener("click", ()=>{

            Toastify({
                text: "Producto Eliminado",
                duration: 1000,
                close: false,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                  background: "linear-gradient(to right, #BCD991, #11A0D9)",
                  borderRadius: "2rem",
                  textTransform:"uppercase",
                  fontSize:"0.75rem" 
                },
                offset: {
                    x: "0rem", 
                    y: "5rem" 
                  },
                onClick: function(){} // Callback after click
              }).showToast();

            eliminarProducto(product.id);
        })
    })

    const totalContainer = document.createElement("div");
    totalContainer.className = "total-container";

    const total = carrito.reduce ((acc,el) => acc + el.precio * el.cantidad,0)

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $${total}`;
    totalContainer.append(totalBuying);

    const emptyCartButton = document.createElement("button");
    emptyCartButton.innerText = "Vaciar carrito";
    emptyCartButton.className = "empty-cart-button";
    emptyCartButton.addEventListener("click", () => {

        Swal.fire({
            title: '¿Estas seguro?',
            icon: 'question',
            html: 'Se van a borrar todos tus productos',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                saveLocal();
                carritoCounter();
                pintarCarrito();
            }
        });
    });
    totalContainer.append(emptyCartButton);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    buyButton.className = "buy-button";
    buyButton.addEventListener("click", () => {
        console.log("Comprar click boton");
    });
    totalContainer.append(buyButton);

    modalContainer.append(totalContainer);
}
verCarrito.addEventListener("click", pintarCarrito)


const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id)

    console.log(foundId);

    carrito = carrito.filter((carritoId) =>{
        return carritoId !== foundId
    })
    carritoCounter()
    saveLocal()
    pintarCarrito()
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

carritoCounter();
