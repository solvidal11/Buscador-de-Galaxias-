document.getElementById("btnBuscar").addEventListener("click", async () => {
    const query = document.getElementById("inputBuscar").value.trim();
    if (!query) return alert("Por favor, ingrese un término de búsqueda.");

    // Realizar la solicitud a la API de la NASA con el término de búsqueda
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.collection.items);
    } catch (error) {
        console.error("Error al obtener los datos de la NASA:", error);
    }
});

// Función para mostrar los resultados en el contenedor
function displayResults(items) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";  // Limpiar resultados anteriores

    // Crear una fila de Bootstrap para contener las tarjetas
    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-3 g-4"; // Filas con 3 columnas en pantallas medianas y superiores

    // Iterar sobre los resultados y crear tarjetas para cada elemento
    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : "";  // Obtener la URL de la imagen

        // Crear el HTML de la tarjeta
        const card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description || "Sin descripción disponible"}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${new Date(date_created).toLocaleDateString()}</small>
                    </div>
                </div>
            </div>
        `;

        // Agregar la tarjeta a la fila
        row.insertAdjacentHTML("beforeend", card);
    });

    // Agregar la fila completa al contenedor
    contenedor.appendChild(row);
}

