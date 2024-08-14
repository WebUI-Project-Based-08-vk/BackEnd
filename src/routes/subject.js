const router = require('express').Router({ mergeParams: true })

const asyncWrapper = require('~/middlewares/asyncWrapper')
const { authMiddleware, restrictTo } = require('~/middlewares/auth')
const idValidation = require('~/middlewares/idValidation')
const isEntityValid = require('~/middlewares/entityValidation')

const subjectController = require('~/controllers/subject')
const Subject = require('~/models/subject')

/*TEMP SOLUTION replace to category route when it appears*/
// eslint-disable-next-line no-unused-vars
const Category = require('~/models/category')

const {
  roles: { ADMIN }
} = require('~/consts/auth')
const params = [{ model: Subject, idName: 'id' }]

router.use(authMiddleware)

router.param('id', idValidation)

router.get('/', asyncWrapper(subjectController.getSubjects))
router.get('/:id', isEntityValid({ params }), asyncWrapper(subjectController.getSubjectById))
router.use(restrictTo(ADMIN))
router.post('/', asyncWrapper(subjectController.createSubject))
router.patch('/:id', isEntityValid({ params }), asyncWrapper(subjectController.updateSubject))

module.exports = router
