import { MODE } from "@/constants";
import mongodb from "./mongodb.config";

export const isDEV = process.env.NODE_ENV === MODE.DEV;

export default { mongodb, isDEV };
