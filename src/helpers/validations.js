const errorServer = {
    status: 500,
    statusText: "error",
    text: "Error interno del servidor",
  };
  
  const orderList = {
    status: 400,
    statusText: "error",
    text: "El parametro de ordenamiento no es valido",
  };
  
  const numberValidate = {
    status: 400,
    statusText: "error",
    text: "El Numero de paginas no es numerico",
  };
  
  const priceIsNotNumericError = {
    status: 400,
    statusText: "error",
    text: "El filtro de precio min no es numerico",
  };
  
  const category = {
    status: 400,
    statusText: "error",
    text: "La categoria ingresada no es valida",
  };
  
  const metalError = {
    status: 400,
    statusText: "error",
    text: "El metal ingresado no es valido",
  };
  
  const filtersNotFoundError = {
    status: 400,
    statusText: "error",
    text: "No ha ingresado ningun filtro",
  };
  
  module.exports = {
    errorServer,
    numberValidate,
    orderList,
    priceIsNotNumericError,
    category,
    metalError,
    filtersNotFoundError,
  };
  