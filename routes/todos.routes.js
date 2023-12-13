const express = require('express');
const router = express.Router();
const { getData, deleteData, updateData, postData, status } = require('../Controller/todo.contoller')

// Get all todos
router.route('/')
  .get(getData)
  .post(postData)


router.route('/:id')
  .put(status)
  .delete(deleteData)

  
router.route('/update/:id')
  .put(updateData)


module.exports = router;
