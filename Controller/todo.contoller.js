const Todo = require('../models/Todo.models');
const asyncHandler = require('../middleware/asyncHandler.middleware')
const AppError = require('../utils/error.utils');

const getData = asyncHandler(async (req, res, next) => {
    try {
        console.log('get data :');
        const todos = await Todo.find();
        res.status(201).json({
            success: true,
            message: 'fatch all data successfully',
            todos,
        });
    } catch (error) {
        next(
            new AppError(error.message, 500)
        )
    }
})


const postData = asyncHandler(async (req, res, next) => {
    // console.log('Received todo:', req.body);
    console.log('post data :');
    const todo = new Todo({
        text: req.body.text,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({
            success: true,
            message: 'todo add successfully',
            todo: newTodo
        });
    } catch (error) {
        next(
            new AppError(error.message, 400)
        )
    }
})

const deleteData = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Corrected from key_id to id
    try {
        console.log('delete data :');
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return next(new AppError('Todo not found', 404));
        }

        res.status(204).json({
            success: true,
            message: 'todo delete successfully',
        });
    } catch (error) {
        next(
            new AppError(error.message, 500)
        );
    }
});

const updateData = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    console.log('update data :');
    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { text },
            { new: true, runValidators: true }
        );

        res.status(201).json({
            success: true,
            message: 'todo update successfully',
            todo
        });
    } catch (error) {
        next(
            new AppError(error.message, 500)
        )
    }
})

const status = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        console.log('status data:');
        const todo = await Todo.findById(id);

        if (!todo) {
            return next(new AppError('Todo not found', 404));
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json({
            success: true,
            message: 'todo update successfully',
            todo
        });
    } catch (error) {
        next(
            new AppError(error.message, 500)
        )
    }

})


module.exports = {
    getData,
    postData,
    deleteData,
    updateData,
    status
}