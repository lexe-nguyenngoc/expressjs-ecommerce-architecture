import { MODE } from "../constants";
import mongodb from "./mongodb.config";

const isDEV = process.env.NODE_ENV === MODE.DEV;

export default { mongodb, isDEV };
