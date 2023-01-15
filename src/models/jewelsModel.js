const { pool, format } = require("../helpers/connectionDb");
const {
  errorServer,
  orderList,
  numberValidate,
  filtersNotFoundError,
  metalError,
  priceIsNotNumericError,
  category,
} = require("../helpers/validations");

const getJewels = async ({ limits = 6, order_by = "stock_ASC", page = 1 }) => {
  if (isNaN(page)) {
    throw numberValidate;
  }
  if (!order_by.match(/^(stock|precio)_(ASC|DESC)$/i)) {
    throw orderList;
  }
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits;
  const formattedQuery = format(
    "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limits,
    offset
  );
  try {
    const { rows: inventario } = await pool.query(formattedQuery);
    return inventario;
  } catch (error) {
    console.error(error);
    throw errorServer;
  }
};

const getJewelsForFilters = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  if (!precio_max && !precio_min && !categoria && !metal) {
    throw filtersNotFoundError;
  }
  if (precio_max && isNaN(precio_max)) {
    throw priceIsNotNumericError;
  }
  if (precio_min && isNaN(precio_min)) {
    throw priceIsNotNumericError;
  }
  if (categoria && !categoria.match(/^(anillo|aros|collar)$/i)) {
    throw category;
  }
  if (metal && !metal.match(/^(oro|plata)$/i)) {
    throw metalError;
  }
  try {
    let filtros = [];
    const values = [];
    const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor);
      const { length } = filtros;
      filtros.push(`${campo} ${comparador} $${length + 1}`);
    };
    if (precio_max) agregarFiltro("precio", "<=", precio_max);
    if (precio_min) agregarFiltro("precio", ">=", precio_min);
    if (categoria) agregarFiltro("categoria", "=", categoria);
    if (metal) agregarFiltro("metal", "=", metal);
    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;
    }
    const { rows: joyas } = await pool.query(consulta, values);
    return joyas;
  } catch (error) {
    console.error(error);
    throw errorServer;
  }
};

module.exports = {
  getJewels,
  getJewelsForFilters,
};
