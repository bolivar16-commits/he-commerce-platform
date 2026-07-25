export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expires: string;
}