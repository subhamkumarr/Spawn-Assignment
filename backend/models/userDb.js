const bcrypt = require('bcryptjs');

// In-memory database for users
let users = [];

// Counter for generating unique IDs
let idCounter = 1;

// Get user by email
const getByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Get user by ID
const getById = (id) => {
  return users.find(user => user._id === id);
};

// Create a new user
const create = async (userData) => {
  // Check if user with email already exists
  if (getByEmail(userData.email)) {
    return null;
  }
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  const newUser = {
    _id: String(idCounter++),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    created_at: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Validate user credentials
const validateUser = async (email, password) => {
  const user = getByEmail(email);
  
  if (!user) {
    return null;
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return null;
  }
  
  // Return user without password
  const { password: pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Add a demo user on startup
const addDemoUser = async () => {
  if (users.length === 0) {
    await create({
      name: 'Demo User',
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Demo user created: user@example.com / password123');
  }
};

// Initialize demo user
addDemoUser();

module.exports = {
  getByEmail,
  getById,
  create,
  validateUser
}; 