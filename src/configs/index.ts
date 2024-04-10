import mongodb from "./mongodb.config";

const MODE = {
  DEV: "dev",
  PROD: "rod",
};

const isDEV = process.env.NODE_ENV === MODE.DEV;

export default { mongodb, isDEV, MODE };
