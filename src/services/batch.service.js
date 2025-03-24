const { Batch } = require("../models");

class BatchService {
  static async getBatchById(batchId) {
    const batch = await Batch.findOne({ where: { id: batchId } });
    return batch;
  }

  static async getBatchByItemId(itemId) {
    const batch = await Batch.findOne({ where: { item_id: itemId } });
    return batch;
  }

  static async getBatchByBatchId(batchId) {
    const batch = await Batch.findOne({ where: { batch_id: batchId } });
    return batch;
  }

  static async listAllBatches() {
    const batches = await Batch.findAll();
    return batches;
  }

  static async createBatch(batchData) {
    const batch = await Batch.create(batchData);
    return batch;
  }

  static async updateBatch(batchId, batchData) {
    const batch = await Batch.update(batchData, {
      where: { id: batchId }
    });
    return batch;
  }

  static async deleteBatch(batchId) {
    const batch = await Batch.destroy({
      where: { id: batchId }
    });
    return batch;
  }
}
module.exports = BatchService;
