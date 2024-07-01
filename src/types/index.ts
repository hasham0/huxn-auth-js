import { Document } from "mongoose";

interface UserSchemaTS extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  image: string;
  authProviderId: string;
}

// interface UserDocs extends Document, UserSchemaTS {
//   isPasswordCorrect(password: string): Promise<boolean>;
// }

type UserCred = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
type ConnectionObject = {
  isConnected?: number;
};

export type { UserSchemaTS, ConnectionObject, UserCred };
