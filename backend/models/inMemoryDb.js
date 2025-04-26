// In-memory database for tasks
let tasks = [
  {
    _id: '1',
    title: 'Complete MERN assignment',
    description: 'Finish the task manager application',
    status: 'in-progress',
    userId: '1', // Associated with demo user
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Learn TypeScript',
    description: 'Study TypeScript basics and advanced concepts',
    status: 'pending',
    userId: '1', // Associated with demo user
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Counter for generating unique IDs
let idCounter = 3;

// Get all tasks (optionally filtered by userId)
const getAll = (userId) => {
  // If userId is provided, filter tasks by that userId
  const filteredTasks = userId 
    ? tasks.filter(task => task.userId === userId)
    : tasks;
  
  return [...filteredTasks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

// Get task by ID
const getById = (id) => {
  return tasks.find(task => task._id === id);
};

// Create a new task
const create = (taskData) => {
  const newTask = {
    _id: String(idCounter++),
    ...taskData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  tasks.push(newTask);
  return newTask;
};

// Update a task
const update = (id, taskData) => {
  const index = tasks.findIndex(task => task._id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedTask = {
    ...tasks[index],
    ...taskData,
    updated_at: new Date().toISOString()
  };
  
  tasks[index] = updatedTask;
  return updatedTask;
};

// Delete a task
const remove = (id) => {
  const index = tasks.findIndex(task => task._id === id);
  
  if (index === -1) {
    return false;
  }
  
  tasks.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}; 