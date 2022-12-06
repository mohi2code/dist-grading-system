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
  {
    username: 'baha.ahmed',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'Bahaeldeen Ahmed',
    role: 'student'
  },
  {
    username: 'kimo',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'Kamal',
    role: 'student'
  },
  {
    username: 'mr.ruin',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'Berkay',
    role: 'student'
  },
  {
    username: 'serdar',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'Mahmut Serdar',
    role: 'student'
  },
  {
    username: '_munther',
    hashed_password: bcrypt.hashSync('mohi123', 10),
    display_name: 'Munther Kouku',
    role: 'student'
  },
];

export default users;