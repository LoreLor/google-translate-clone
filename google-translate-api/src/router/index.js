const Router = require('express')
const router = Router()

const routerTranslate = require('./translate')

router.use('/translate', routerTranslate)

module.exports = router