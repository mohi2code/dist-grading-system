import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/user.js';
import Course from './models/course.js';
import { Homework, Submission } from './models/homework.js';
import connectDB from './config/db.js';

import users from './mock/users.js';
import courses from './mock/courses.js';

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Submission.deleteMany();
    await Homework.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    const seededUsers = await User.insertMany(users);

    const instructor = seededUsers[0]._id;

    const mockCourses = courses.map((course) => {
      return {
        ...course, 
        instructor: instructor._id,
        experts: [instructor._id],
        students: seededUsers.filter(u => u.username != 'mohi' ? true : false)
      }
    });

    const _courses = await Course.insertMany(mockCourses);

    const mockHomeworks = [];
    _courses.forEach(course => {
      for (let i = 0; i < course.number_of_homeworks; i++) {
        const hw = {
          course_id: course._id,
          name: `HW ${i+1}`,
          points: course.passing_grade
        }
        mockHomeworks.push(hw);
      }
    });

    await Homework.insertMany(mockHomeworks);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Submission.deleteMany();
    await Homework.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
