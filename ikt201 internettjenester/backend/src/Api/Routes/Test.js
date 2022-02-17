const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handlig GET requests to /test',
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling  POST requests to /test',
  })
})

router.get('/:testId', (req, res, next) => {
  const x = {
    id: req.body.testId,
    message: req.body.message,
  }

  res.status(200).json({
    x: x,
  })
})

router.post('/:testId', (req, res, next) => {
  const id = req.params.testId

  if (id === 'hei') {
    res.status(200).json({
      message: id + ' lol',
    })
  } else {
    res.status(404).json({
      message: 'wrong id',
    })
  }
})

module.exports = router
