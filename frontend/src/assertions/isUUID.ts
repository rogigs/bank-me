import validator from "validator";

export function isUUID(id: string): asserts id is string {
  if (!validator.isUUID(id)) {
    throw new Error("Invalid ID");
  }
}
