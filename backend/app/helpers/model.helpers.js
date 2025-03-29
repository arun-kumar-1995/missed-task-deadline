export class Model {
  constructor(model) {
    this.model = model
  }
  async findOne(query, select) {
    return await this.model.findOne(query).select(select).lean()
  }

  async findById(id) {
    return await this.model.findById(id)
  }

  async create(userData) {
    return await this.model.create(userData)
  }

  async findAll(query = {}, select) {
    return await this.model.find(query).select(select).lean()
  }

  async updateById(id, updateData) {
    return await this.model
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean()
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id).lean()
  }
}
