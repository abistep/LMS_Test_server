const express = require("express");
const router = express.Router();
// const authenticateToken = require("../middleware");

const Controller = require("../controllers/controller");
const AuthController = require("../controllers/authController");

//lms mini app
// with auth
// router.get("/courses", authenticateToken, Controller.getCourses);
// router.get("/lessons/:id", authenticateToken, Controller.getLessonById);
// router.post("/lessonsTask", authenticateToken, Controller.sendTasks);
router.get("/courses", Controller.getCourses);
router.get("/lessons/:id", Controller.getLessonById);
router.post("/lessonsTask", Controller.sendTasks);
//lms admin
router.get("/coursesAdmin", Controller.getCourses);
router.get("/lessonsAdmin/:id", Controller.getLessonById);
router.post("/courses", Controller.addNewCourse);
router.patch("/courses", Controller.updateCourses);
router.post("/modules", Controller.addNewModule);
router.patch("/modules", Controller.updateCurrentCourse);
router.post("/lessons", Controller.addNewLesson);
router.patch("/lessons", Controller.updateCurrentModule);
router.post("/content", Controller.addNewContent);
router.patch("/content", Controller.updateContent);
//auth
router.post("/auth", AuthController.authTelegram);

module.exports = router;
