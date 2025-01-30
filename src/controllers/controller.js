const { courses, lessons } = require("../db/courses");

const db_courses = courses;
const db_lessons = lessons;

const Controller = {
  getCourses: async (req, res) => {
    res.json(db_courses);
  },
  getUser: async (req, res) => {
    res.json(db_courses);
  },
  getLessonById: async (req, res) => {
    const { id } = req.params;
    const lessonBase = db_lessons.find((lesson) => lesson.id === id);

    if (!lessonBase) {
      return res.status(404).json({ error: "lesson not found" });
    }

    res.json(lessonBase);
  },
  sendTasks: async (req, res) => {
    const { lessonId, files } = req.body;

    if (!lessonId || !files) {
      return res.status(404).json({ error: "Files not found" });
    }

    res.json({ ok: true });
  },
  addNewCourse: async (req, res) => {
    const { name, imagePath, description, isFree, price } = req.body;
    console.log(name, imagePath, description, isFree, price);
    if (!name || !imagePath) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }

    const newCourse = {
      id: `courseId${Math.random() * 100}`,
      name,
      imagePath,
      modules: [],
      order: db_courses.length + 1,
      description: description || "",
      isFree,
      price: price || 0,
    };

    db_courses.push(newCourse);
    res.json(db_courses);
  },
  updateCourses: async (req, res) => {
    const courses = req.body;
    if (!courses) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }

    db_courses.splice(0, db_courses.length, ...courses);
    res.json(db_courses);
  },
  addNewModule: async (req, res) => {
    const { courseId, name, imagePath } = req.body;
    if (!courseId || !name || !imagePath) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }

    const currentCourse = db_courses.find((course) => course.id === courseId);

    const newModule = {
      id: `moduleId${Math.random() * 100}`,
      name,
      imagePath,
      order: String(currentCourse.modules.length + 1),
      lessons: [],
    };
    currentCourse.modules.push(newModule);
    res.json(currentCourse);
  },
  updateCurrentCourse: async (req, res) => {
    const { courseId, modules } = req.body;
    if (!modules) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }
    const currentCourse = db_courses.find((course) => course.id === courseId);
    currentCourse.modules.splice(0, db_courses.length, ...modules);
    res.json(currentCourse);
  },
  addNewLesson: async (req, res) => {
    const { courseId, moduleId, name, imagePath } = req.body;
    if (!courseId || !name || !imagePath || !moduleId) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }

    const currentCourse = db_courses.find((course) => course.id === courseId);
    const currentModule = currentCourse.modules.find(
      (moduleElem) => moduleElem.id === moduleId
    );
    const newLesson = {
      id: `lessonId${Math.random() * 100}`,
      name,
      imagePath,
      order: String(currentModule.lessons.length + 1),
      content: [],
    };
    currentModule.lessons.push(newLesson);
    db_lessons.push(newLesson);
    res.json(currentCourse);
  },
  updateCurrentModule: async (req, res) => {
    const { courseId, moduleId, lessons } = req.body;
    if (!lessons) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }
    const currentCourse = db_courses.find((course) => course.id === courseId);
    const currentModule = currentCourse.modules.find(
      (elem) => elem.id === moduleId
    );
    currentModule.lessons.splice(0, currentModule.lessons.length, ...lessons);
    res.json(currentModule);
  },
  addNewContent: async (req, res) => {
    const { courseId, moduleId, lessonId, type, name, content, order } =
      req.body;

    if (!courseId || !lessonId || !type || !content || !moduleId || !order) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }

    const currentLesson = db_lessons.find((lesson) => lesson.id === lessonId);
    const newContent = {
      id: `contentId${Math.random() * 100}`,
      name,
      type,
      content,
      order,
    };

    currentLesson.content.push(newContent);
    res.json(currentLesson);
  },
  updateContent: async (req, res) => {
    const { id, content } = req.body;

    if (!id || !content) {
      return res.status(404).json({ error: "Все поля обязательны" });
    }
    const currentLessons = db_lessons.find((lesson) => lesson.id === id);
    currentLessons.content.splice(0, currentLessons.content.length, ...content);

    res.json(currentLessons);
  },
};

module.exports = Controller;
