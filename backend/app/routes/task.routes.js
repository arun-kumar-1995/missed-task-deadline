import express from 'express'
const router = express.Router()

router.route('/new-tasks').post(createTask);
router.route('/update-task/:id').post(updateTask);

export default router
