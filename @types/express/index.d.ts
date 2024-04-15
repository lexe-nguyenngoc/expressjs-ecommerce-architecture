import { ApiKey } from "@/models/apiKey.model";
import { KeyToken } from "@/models/keyToken.model";
import { User } from "@/models/user.model";

declare global {
  namespace Express {
    interface Request {
      apiKey: ApiKey;
      user: User;
      keyToken: KeyToken;
    }
  }
}
