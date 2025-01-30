const lessonsMini = [
  {
    id: "lessonId1",
    name: "Lesson 1",
    order: "1",
    imagePath:
      "https://img.freepik.com/premium-psd/chalkboard-space-drawing_546192-40574.jpg?w=1380",
  },
  {
    id: "lessonId2",
    name: "Lesson 2",
    order: "2",
    imagePath:
      "https://img.freepik.com/premium-psd/chalkboard-space-drawing_546192-40574.jpg?w=1380",
  },
  {
    id: "lessonId3",
    name: "Lesson 3",
    order: "3",
    imagePath:
      "https://img.freepik.com/premium-psd/chalkboard-space-drawing_546192-40574.jpg?w=1380",
  },
];

const modules = [
  {
    id: "moduleId1",
    name: "Module 1",
    order: "1",
    imagePath:
      "https://img.freepik.com/premium-vector/yellow-background-with-oranges-white-banner-that-says-oranges_641091-283.jpg?w=1380",
    lessons: lessonsMini,
  },
  {
    id: "moduleId2",
    name: "Module 2",
    order: "2",
    imagePath:
      "https://img.freepik.com/premium-vector/yellow-background-with-oranges-white-banner-that-says-oranges_641091-283.jpg?w=1380",
    lessons: lessonsMini,
  },
  {
    id: "moduleId3",
    name: "Module 3",
    order: "3",
    imagePath:
      "https://img.freepik.com/premium-vector/yellow-background-with-oranges-white-banner-that-says-oranges_641091-283.jpg?w=1380",
    lessons: lessonsMini,
  },
];

const courses = [
  {
    id: "courseId1",
    name: "Course 1",
    order: "1",
    imagePath:
      "https://img.freepik.com/free-photo/education-learning-knowledge-banner-frame_53876-120880.jpg?t=st=1731665668~exp=1731669268~hmac=1df05c201b84bf9e2b5938ebaa854ff4e68277f2c0b727b8c7e66ae71cef9da1&w=1380",
    modules: modules,
    description: "Some text",
    price: 100000,
    isFree: false,
  },
  {
    id: "courseId2",
    name: "Course 2",
    order: "2",
    imagePath:
      "https://img.freepik.com/free-photo/employees-working-together-side-view_23-2150152250.jpg?t=st=1731668579~exp=1731672179~hmac=728d968f1adfa214042f65d61ea629ad55732c1b6506a5df74b10747fe387192&w=1380",
    modules: modules,
    description: "Free course",
    price: 0,
    isFree: true,
  },
  {
    id: "courseId3",
    name: "Course 3",
    order: "3",
    imagePath:
      "https://img.freepik.com/free-photo/preparing-presentation_1098-16345.jpg?t=st=1731665441~exp=1731669041~hmac=4738d228653a56b992c917747b0ab34e022aae9ffa7ec533a4d456528173117d&w=1380",
    modules: modules,
    description: "",
    price: 500000,
    isFree: false,
  },
];

const content = [
  {
    id: "contentId1",
    order: "1",
    name: "",
    type: "text",
    content:
      '<h1>asdasdasd</h1><ul><li>jhjkhjkhjk</li><li aria-hidden="true">jkljklkjljk</li><li aria-hidden="true">jkljklkjljl</li></ul><h3>svdfgdfgdfgdfgdfgdfgdf</h3><p><br></p>',
  },
  // {
  //   id: "contentId2",
  //   type: "video",
  //   content:
  //     "https://vk.com/video_ext.php?oid=-222609266&id=456240382&hash=5b7033e86beae936",
  // },
  // {
  //   id: "contentId2",
  //   order: "2",
  //   name: "",
  //   type: "files",
  //   content: ["Lorem1.pdf", "Lorem2.pdf", "wo_lor.docx"],
  // },
  {
    id: "contentId2",
    order: "2",
    name: "",
    type: "files",
    content: [
      {
        name: "lorem1",
        href: "https://drive.google.com/file/d/1urDYihPquo3HTTPbejjL5ZOpk_HnLgxq/view?usp=drive_link",
      },
      {
        name: "lorem2",
        href: "https://drive.google.com/file/d/196l1GpkDdp8xtaJ7ANJtu2M2ImKmzxXb/view?usp=drive_link",
      },
      {
        name: "wo_lor",
        href: "https://docs.google.com/document/d/1bPnKJN-uCUxbteEws7yidEz0_bLdzWKa/edit?usp=drive_link&ouid=110816490077498083513&rtpof=true&sd=true",
      },
    ],
  },
  {
    id: "contentId3",
    order: "3",
    name: "",
    type: "video",
    content: "https://www.youtube.com/embed/qPdPjWkJZF8",
  },

  // {
  //   id: "contentId5",
  //   type: "video",
  //   content: "https://rutube.ru/play/embed/ec8cc67f0a3328353efd716e4d3beaad",
  // },
  // {
  //   id: "contentId6",
  //   type: "files",
  //   content: ["Lorem1.pdf", "Lorem2.pdf", "wo_lor.docx"],
  // },
  // {
  //   id: "contentId7",
  //   order: "4",
  //   name: "",
  //   type: "image",
  //   content: "/content.jpg",
  // },
  {
    id: "contentId4",
    order: "4",
    name: "",
    type: "image",
    content:
      "https://img.freepik.com/premium-photo/people-generating-images-using-artificial-intelligence-laptop_23-2150794312.jpg?w=1380",
  },
];

const lessons = [
  {
    id: "lessonId1",
    name: "Lesson 1",
    content: content,
  },
  {
    id: "lessonId2",
    name: "Lesson 2",
    content: content,
  },
  {
    id: "lessonId3",
    name: "Lesson 3",
    content: content,
  },
];

module.exports = { courses, lessons };
