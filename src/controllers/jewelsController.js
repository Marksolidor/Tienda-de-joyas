//controllers goes here
const { getJewels, getJewelsForFilters } = require("../models/jewelsModel");

const getAllJewelsForFilters = async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventario = await getJewelsForFilters(queryStrings);
    res.json(inventario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllJewels = async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventario = await getJewels(queryStrings);
    const HATEOAS = await jewelsHATEOAS(inventario);
    res.json(HATEOAS);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const jewelsHATEOAS = (inventario) => {
  const results = inventario
    .map((m) => {
      return {
        name: m.nombre,
        href: `/inventario/filtros/${m.id}`,
      };
    })
    .slice(0, 6);
  const total = inventario.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

module.exports = { getAllJewels, getAllJewelsForFilters };
