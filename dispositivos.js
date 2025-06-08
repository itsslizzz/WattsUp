let productos = [];

async function cargarDatos() {
  const res = await fetch("productos_consumo.json");
  productos = await res.json();

  const marcas = [...new Set(productos.map(p => p.marca))];
  const marcaSelect = document.getElementById("marca");
  marcas.forEach(m => {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m;
    marcaSelect.appendChild(option);
  });

  renderLista();
}

function filtrarProductos() {
  const marca = document.getElementById("marca").value;
  const productoSelect = document.getElementById("producto");
  productoSelect.innerHTML = "";

  const filtrados = productos.filter(p => p.marca === marca);
  filtrados.forEach(p => {
    const option = document.createElement("option");
    option.value = JSON.stringify(p);
    option.textContent = p.nombre;
    productoSelect.appendChild(option);
  });
}

function agregarDispositivo() {
  const select = document.getElementById("producto");
  const seleccionado = select.value;
  if (!seleccionado) return;
  const dispositivos = JSON.parse(localStorage.getItem("misDispositivos") || "[]");
  const nuevo = JSON.parse(seleccionado);
  dispositivos.push(nuevo);
  localStorage.setItem("misDispositivos", JSON.stringify(dispositivos));
  renderLista();
}

function eliminarDispositivo(index) {
  const dispositivos = JSON.parse(localStorage.getItem("misDispositivos") || "[]");
  dispositivos.splice(index, 1);
  localStorage.setItem("misDispositivos", JSON.stringify(dispositivos));
  renderLista();
}

function renderLista() {
  const lista = document.getElementById("lista");
  if (!lista) return;
  const dispositivos = JSON.parse(localStorage.getItem("misDispositivos") || "[]");
  lista.innerHTML = "";
  dispositivos.forEach((d, i) => {
    const li = document.createElement("li");
    li.textContent = d.nombre + " (" + d.consumo_por_hora + " kWh) ";

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => eliminarDispositivo(i);

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

window.onload = cargarDatos;
