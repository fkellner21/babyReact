const obtenerEventosAPI = async (userData) => {
  try {
    const response = await fetch(
      `https://babytracker.develotion.com/eventos.php?idUsuario=${userData.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: `${userData.apiKey}`,
          iduser: `${userData.id}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
      return Promise.reject({
        message: "Ha ocurrido un error",
        status: response.status,
      });
    }
  } catch (error) {
    return Promise.reject({
      message: "Ha ocurrido un error",
    });
  }
};

const eliminarEventoAPI = async (userData, idEvento) => {
  try {
    const response = await fetch(
      `https://babytracker.develotion.com/eventos.php?idEvento=${idEvento}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: `${userData.apiKey}`,
          iduser: `${userData.id}`,
        },
        body: JSON.stringify({
          idEvento: idEvento,
        }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
      return Promise.reject({
        message: "Ha ocurrido un error al eliminar el evento",
        status: response.status,
      });
    }
  } catch (error) {
    return Promise.reject({
      message: "Ha ocurrido un error al eliminar el evento",
    });
  }
};

export { obtenerEventosAPI, eliminarEventoAPI };
