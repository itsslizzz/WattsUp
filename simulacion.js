function cargarSimulacion() {
  const dispositivos = JSON.parse(localStorage.getItem("misDispositivos") || "[]");
  const lista = document.getElementById("seleccionables");
  lista.innerHTML = "";

  dispositivos.forEach((d, i) => {
    const li = document.createElement("li");
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = true;
    chk.dataset.index = i;
    chk.dataset.nombre = d.nombre;
    chk.dataset.consumo = d.consumo_por_hora;
    chk.onchange = calcularTotal;
    li.appendChild(chk);
    li.append(" " + d.nombre + " (" + d.consumo_por_hora + " KWh)");
    lista.appendChild(li);
  });

  calcularTotal();
}

function calcularTotal() {
  const checks = document.querySelectorAll("#seleccionables input[type=checkbox]:checked");
  let total = 0;
  let labels = [], data = [];

  checks.forEach(c => {
    const consumo = parseFloat(c.dataset.consumo) * 2 * 30; // 2 horas al día, 30 días
    total += consumo;
    labels.push(c.dataset.nombre);
    data.push(consumo.toFixed(1));
  });

  document.getElementById("consumoTotal").textContent = total.toFixed(1) + " KWh";

  const nivel = document.getElementById("nivel");
  const panel = document.getElementById("panelConsumo");

panel.classList.remove("panel-bajo", "panel-medio", "panel-alto");

if (total < 150) {
  nivel.textContent = "Consumo Bajo";
  panel.classList.add("panel-bajo");
} else if (total < 400) {
  nivel.textContent = "Consumo Medio";
  panel.classList.add("panel-medio");
} else {
  nivel.textContent = "Consumo Alto";
  panel.classList.add("panel-alto");
}


  const ctx = document.getElementById("grafica").getContext("2d");
  if (window.chart) window.chart.destroy();
  window.chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Consumo por producto en KWh',
        data: data
      }]
    }
  });
}

window.onload = cargarSimulacion;
