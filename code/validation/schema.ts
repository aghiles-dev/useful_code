import { Validation } from "./validation";
import { SchemaOptions } from "../schemas/schema-options";

export abstract class Schema extends Validation {
  constructor() {
    super();
  }

  abstract constructConstraints(options: SchemaOptions): object;
}
