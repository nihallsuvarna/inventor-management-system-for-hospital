const { Module } = require("../../models");

async function getModule(req, res) {
  try {
    const { label } = req.body;
    const module = await Module.findOne({ where: { label } });
    if (!module) {
      return res.status(404).json({
        status: 404,
        message: "Module not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Module found",
      result: module
    });
  } catch (err) {
    console.log("Something went wrong while getting Module", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting Module",
      result: err
    });
  }
}

module.exports = getModule;
