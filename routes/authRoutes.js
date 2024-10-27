import express from "express";
import rateLimit from "express-rate-limit";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
//ip limiter
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
//router object
const router = express.Router();
//routes
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user collection
 *         name:
 *           type: string
 *           description: User's name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password, should be greater than 6 characters
 *         location:
 *           type: string
 *           description: User's location, city, or country
 *       example:
 *         id: GDHJG788BJBJ
 *         name: Gade
 *         lastName: Sathwika
 *         email: test@1gmail.com
 *         password: 987654
 *         location: mumbai
 */

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication APIs
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

//REGISTER || POST
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login page
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */

//LOGIN || POST
router.post("/login", limiter, loginController);
export default router;
