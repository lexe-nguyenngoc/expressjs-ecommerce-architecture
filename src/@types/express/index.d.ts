import { ApiKey } from "@/models/apiKey.model";
import { KeyToken } from "@/models/keyToken.model";
import { Shop } from "@/models/shop.model";

declare global {
  namespace Express {
    interface Request {
      apiKey: ApiKey;
      user: Shop;
      keyToken: KeyToken;
    }
  }
}
