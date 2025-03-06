const { Module } = require("../../models");

async function addModule(req, res) {
  try {
    const { label, description = "" } = req.body;

    if (!label) {
      return req.status(401).json({
        status: 501,
        message: "Label cannot be empty",
        result: null
      });
    }

    const module = await Module.findAll();

    const newModule = await module.create({
      label,
      description
    });

    if (!newModule) {
      return res.status(401).json({
        status: 401,
        message: "Something went wrong while creating module",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Added Module Successfully",
      result: newModule
    });
  } catch (err) {
    console.log("Something went wrong while adding Module", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while adding Module",
      result: err
    });
  }
}

module.exports = addModule