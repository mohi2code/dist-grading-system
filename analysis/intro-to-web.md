# Distributed Grading System

## Use Cases

- A user can have three roles, student, instructor, expert. Instructor has all expert privillages.
- Instructor is a person who teaches the course.
- An expert is someone who assists in the process of homework grading.
- A submission is a student solution to a homework.

  [x] User can login.
  [x] Student can register.

  [x] Instructor can create a course.
  [x] Expert can update course info.
  [x] Expert can view all homework sumbissions, sumbissions gradings and objected gradings.
  [x] Expert can update a submission grading.

  [x] Student can enroll in a course.
  [x] Student can view all homeworks for a specific course
  [x] Student can submit a submission for a homework.
  [x] Student can update his submission for a specific homework.
  [x] Student can object on his grade for a specific homework submission.

## TODO

[x] Setup express server.
[x] Setup MongoDB/PostgresQL.
[x] Migrate & seed the db.
[x] User CRUD & auth.
[x] Courses CRUD.
_[x] Get all courses.
_[x] Get one course.
_[x] New Course.
_[x] Add experts.
[x] Student enroll in a course.
[x] Homeworks CRUD.
_[x] Get homeworks for a specific course.
_[x] Get a specific homework.
_[x] Expert can create a homework for a specific course.
_[x] Expert can update homework info.
[x] Homeworks submissions CRUD.
_[x] Get all submissions.
_[x] Get one submission.
_[x] Create a homework submission.
_[x] Update submission grade
\_[x] Object grade.
[x] Submission objection.

[x] Setup react.js.
[x] Login & register screens.
[x] list all courses.
[x] new course form.
[x] update experts for a course.

29/11/2022

## New Todos

[x] Expert dashboard and course listing.

- Instructor creates a course, and enters name, passing grade and number of homeworks.
- Homeworks are created automatically accordingly to 'number of homeworks'.
- Homeworks points are distributed equally.
