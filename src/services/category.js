const Category = require('~/models/category')
const Subject = require('~/models/subject')
const { createError } = require('~/utils/errorsHelper')
const { CATEGORY_ALREADY_EXISTS, INTERNAL_SERVER_ERROR } = require('~/consts/errors')

const categoryService = {
  getCategories: async (sort, skip = 0, limit = 10) => {
    try {
      const categories = await Category.find().sort(sort).skip(skip).limit(limit).lean().exec()
      const count = await Category.countDocuments()
      return { count, categories }
    } catch (error) {
      throw createError(500, INTERNAL_SERVER_ERROR)
    }
  },

  addCategory: async (req, _res) => {
    try {
      const existingEntry = await Category.findOne(req.body)
      if (existingEntry) throw 'error'
    } catch {
      throw createError(409, CATEGORY_ALREADY_EXISTS)
    }

    try {
      const newCategory = await Category.create(req.body)
      return { newCategory }
    } catch (error) {
      throw createError(500, INTERNAL_SERVER_ERROR)
    }
  },

  getSubjectsNameByCategoryId: async (categoryId) => {
    try {
      const subjects = await Subject.find({ category: categoryId }, '_id, name').lean().exec()
      const count = await Subject.countDocuments({ category: categoryId })
      return { count, subjects }
    } catch (error) {
      throw createError(500, INTERNAL_SERVER_ERROR)
    }
  }
}

module.exports = categoryService
