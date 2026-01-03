import express from 'express';
import {
    getEmployeeProfile,
    updateEmployeeProfile,
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
} from '../controllers/employeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getAllEmployees)
    .post(protect, admin, createEmployee);

router.route('/profile')
    .get(protect, getEmployeeProfile)
    .put(protect, updateEmployeeProfile);

router.route('/:id')
    .get(protect, admin, getEmployeeById)
    .put(protect, admin, updateEmployee);

export default router;
