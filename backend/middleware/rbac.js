import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import Course from '../models/course.js'

const authenticated = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, '1234')

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const isInstructor = (req, res, next) => {
  if (req.user && req.user.role === 'instructor') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an instructor')
  }
}

const isInstructorOrExpert = (req, res, next) => {
  if (req.user && (req.user.role === 'instructor' || req.user.role === 'expert')) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an instructor')
  }
}

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as a student')
  }
}

const hasCreatedCourse = asyncHandler(async (req, res, next) => {
  let instructor = req.user && req.user.role === 'instructor';
  let created;
  let course = await Course.findById(req.params.id);
  created = req.user.id == course.instructor;

  if (instructor && created){
    req.course = course;
    next()
  } else {
    res.status(401);
    throw new Error('Not authorized! resource can only be updated by its creator.')
  }
});


export { authenticated, isInstructor, isInstructorOrExpert, isStudent, hasCreatedCourse };
