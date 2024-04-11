import _ from "lodash";

export * from "./generateKeyPair";
export * from "./token";
export * from "./asyncHandler";
export * from "./types";

export const pickFields = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  fields: K[] = []
) => {
  return _.pick(object, fields);
};
