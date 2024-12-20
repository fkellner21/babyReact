//cargar las categorias
export const fetchCategories = async (userData) => {
  try {
    const response = await fetch(
      `https://babytracker.develotion.com/categorias.php`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: userData.apiKey,
          iduser: userData.id,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data.categorias;
    } else {
      return Promise.reject({
        message: "Error al obtener las categorías",
        status: response.status,
      });
    }
  } catch (error) {
    return Promise.reject({
      message: error.message || "Ha ocurrido un error",
    });
  }
};
//guardart los nuevos eventos
export const saveEventAPI = async (eventData) => {
  try {
    const response = await fetch(
      "https://babytracker.develotion.com/eventos.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          iduser: eventData.idUsuario,
          apikey: eventData.apiKey,
        },
        body: JSON.stringify({
          idCategoria: eventData.category,
          idUsuario: eventData.idUsuario,
          detalle: eventData.details || "",
          fecha: eventData.dateTime,
        }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return Promise.reject({
        message: data.mensaje || "Error al agregar el evento",
        status: response.status,
      });
    }
  } catch (error) {
    return Promise.reject({
      message: error.message || "Ha ocurrido un error",
    });
  }
};
