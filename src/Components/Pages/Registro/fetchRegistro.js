const registerAPI = async (user, pass, dpto, ciudad) => {
  try {
    const response = await fetch(
      `https://babytracker.develotion.com/usuarios.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: user,
          password: pass,
          idDepartamento: dpto,
          idCiudad: ciudad,
        }),
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
      const data = await response.json();
      return Promise.reject({
        message: data.mensage,
        status: response.status,
      });
    }
  } catch (error) {
    return Promise.reject({
      message: "Ha ocurrido un error",
    });
  }
};

export { registerAPI };
