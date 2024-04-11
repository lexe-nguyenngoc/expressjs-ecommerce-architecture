import { ApiKey } from "@/models/apiKey.model";
import { KeyToken } from "@/models/keyToken.model";
import { Shop } from "@/models/shop.model";

export * from "./generic";

export interface AuthenticationRequest {
  keyToken: KeyToken;
  user: Shop;
}
export interface ApiKeyRequest {
  apiKey: ApiKey;
}
