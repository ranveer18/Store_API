const express = require("express");
const router = new express.Router();
const Student = require("../modals.js/students");

router.post("/students", (req, res) => {
  console.log(req.body);
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById({ _id });

    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateStudents);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudents = await Student.findByIdAndDelete(_id);
    if (!_id) {
      return res.status(404).send();
    }
    res.status(200).send(deleteStudents);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
