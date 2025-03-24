const { ModuleService } = require("../../services");

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

    const module = await ModuleService.getModuleByLabel(label);

    if (module) {
      return res.status(403).json({
        status: 403,
        message: "Module already exists",
        result: null
      });
    }

    const newModule = await ModuleService.createModule({
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

async function getModule(req, res) {
  try {
    const module = await ModuleService.listAllModules();
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

async function getOneModule(req, res) {
  try {
    const { label } = req.body;
    const module = await ModuleService.getModuleByLabel(label);
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

module.exports = { addModule, getOneModule, getModule };
