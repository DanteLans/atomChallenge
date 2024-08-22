
export type StatusTask =
  | 'todo'
  | 'inprogress'
  | 'qa'
  | 'done';

export type Task = {
  dateCreated: {
    _seconds: number;
    _nanoseconds: number;
  };
  description: string;
  title: string;
  user: string;
  status: StatusTask;
  dateUpdated?: {
    _seconds: number;
    _nanoseconds: number;
  };
  id?:string
}


export type GroupedTasks = {
  [status in StatusTask]: Task[];
};

export type Response<T> = {
  data: T;
  id?: string
};

export type User = {
  id?: string,
  dateCreated: {
      _seconds: number,
      _nanoseconds: number
  },
  email: string
}