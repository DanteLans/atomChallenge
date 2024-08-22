export const environment = {
    production: true,
    apiUrl: 'https://us-central1-fir-api-e9d5f.cloudfunctions.net/app/',
    taskList: 'tasks',
    users: 'users',
    updateTask:(id: string) => `tasks/${id}`,
    deleteTask:(id: string) => `tasks/${id}`,
    getUser:(id: string) => `users/${id}`
};