export class TaskEntity {
    id : string;
    title : string;
    description : string
    status : string
    userId : string

    constructor(partial: Partial<TaskEntity>) {
        Object.assign(this, partial);
      }
}

