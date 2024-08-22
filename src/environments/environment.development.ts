export const environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:5001/fir-api-e9d5f/us-central1/app/',
    taskList: 'tasks',
    users: 'users',
    updateTask:(id: string) => `tasks/${id}`,
    deleteTask:(id: string) => `tasks/${id}`,
    getUser:(id: string) => `users/${id}`
  };