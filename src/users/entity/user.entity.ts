import { TaskEntity } from "src/task/entity/task.entity";
import { Exclude } from "class-transformer";

export class UserEntity {
    id : string 
    email : string;
    @Exclude()
    password : string

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
      }
}


