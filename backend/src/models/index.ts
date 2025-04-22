export * from '../models/user.model';
export * from '../models/userProfile';
export * from '../models/project.model';
export * from '../models/projectMembers';
export * from '../models/projectRoles';
export * from '../models/projectTechStack';
export * from '../models/projectApplications';


import * as users from '../models/user.model';
import * as profiles from '../models/userProfile';;
import * as projects from '../models/project.model';
import * as projectMembers from '../models/projectMembers';
import * as projectRoles from '../models/projectRoles';
import * as projectTechStack from '../models/projectTechStack';
import * as projectApplications from '../models/projectApplications';


export const schema = {
    users,
    profiles,
    projects,
    projectMembers,
    projectRoles,
    projectTechStack,
    projectApplications
  };