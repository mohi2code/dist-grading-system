import bcrypt from 'bcryptjs';

const users = [
  {
    username: 'mohi',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'MohiEldin Ahmed',
    role: 'instructor'
  },
  {
    username: 'irem',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'İrem PEKKIYAK',
    role: 'student'
  },
  {
    username: 'zoo.fame',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'AbdElkarim Mohamed',
    role: 'student'
  },
];

export default users;