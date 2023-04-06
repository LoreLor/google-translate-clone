const Router = require('express')
const router = Router()

const {textTranslate} = require('../controller/textTranslate')

router.post('/', async (req, res) => {
    const { fromLanguage, toLanguage, text } = req.body;

    const translation = await textTranslate(fromLanguage, toLanguage, text);
    res.status(200).json({ translation });
  });


module.exports = router;