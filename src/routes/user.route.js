const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.route("/organization").get(userController.getUsers);

router
  .route("/organization/:userId")
  .get(validate(userValidation.getUser), userController.getUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

router.route("/individual").get(userController.getIndividuals);

router
  .route("/individual/:userId")
  .get(validate(userValidation.getUser), userController.getIndividualUser)
  .delete(
    validate(userValidation.deleteUser),
    userController.deleteIndividualUser
  );

module.exports = router;
// uesr service
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users/organization:
 *   get:
 *     summary: Get all organization's user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     parameters:
 *         required: false
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/organization/:userId:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - params: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/organization/:userId:
 *   put:
 *     summary: update a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         required: false
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/organization/:userId:
 *   delete:
 *     summary: delete a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - params: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/individual:
 *   get:
 *     summary: Get all individual's user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *         required: false
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/individual/:userId:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - params: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/individual/:userId:
 *   delete:
 *     summary: delete a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - params: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/individual/:userId:
 *   put:
 *     summary: update a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - params: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
