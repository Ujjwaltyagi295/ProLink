import { Session } from "./src/models/session.model";
import { User } from "./src/models/user.model";

declare global {
    namespace Express {
      interface Request {
        userId: User["id"] ; 
        sessionId: Session["id"];
      }
    }
  }
  
  export {};
  