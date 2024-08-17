export type Task = {
    user: string,
    dateStarted?: Date,
    dateCreated: Date,
    dateOnprogress?: Date,
    dateOnDone?: Date,
    title: string,
    description: string,
}