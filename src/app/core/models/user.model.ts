import { Roles } from './roles.model';

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}