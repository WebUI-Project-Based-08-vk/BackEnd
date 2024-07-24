const router = require('express').Router()

const asyncWrapper = require('~/middlewares/asyncWrapper')
const locationServiceCountriesController = require('~/controllers/locationServiceCountries')

router.get('/', asyncWrapper(locationServiceCountriesController.getCountryList))

module.exports = router