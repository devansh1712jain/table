export interface User {
    password: string;
    email: string;
    id: number
  }
    
export interface UserDocument extends User, Document {}
 