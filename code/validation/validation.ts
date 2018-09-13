import { isNullOrUndefined, isString } from "util";
import { Regex } from "./regex";
import { ErrorTypes } from "./error-types";
import { isArrayEmpty, isObjectEmpty } from "../utils";

export class Validation {
  public constraints: object;

  constructor(constraints?: object) {
    if (!isNullOrUndefined(constraints)) {
      this.constraints = constraints;
    }
  }

  validate(objectToValidate: object = {}): object {
    const errors: object = {};
    const rootSchema = this.constraints;

    const invalidAttributes = this.validateAttributes(
      objectToValidate,
      rootSchema
    );

    if (!isObjectEmpty(invalidAttributes)) {
      errors["invalidAttributes"] = invalidAttributes;
    }

    for (let fieldName in rootSchema) {
      const constraintValue = rootSchema[fieldName];
      const valueToValidate = objectToValidate[fieldName];

      if (this.isArray(constraintValue)) {
        this.validateArray(
          objectToValidate,
          fieldName,
          valueToValidate,
          constraintValue,
          rootSchema,
          errors
        );
      } else if (this.isEmbeddedObject(constraintValue)) {
        this.validateEmbeddedObject(
          constraintValue,
          valueToValidate,
          fieldName,
          errors
        );
      } else {
        this.validateField(
          objectToValidate,
          fieldName,
          constraintValue,
          valueToValidate,
          rootSchema,
          errors
        );
      }

      this.constraints = rootSchema;
    }

    return errors;
  }

  private validateArray(
    objectToValidate: object,
    fieldName: string,
    valueToValidate: any,
    constraintValue: any,
    rootSchema: object,
    errors: object
  ) {
    this.checkFieldExistsIfRequired(
      objectToValidate,
      fieldName,
      rootSchema,
      errors
    );

    if (this.exists(objectToValidate, fieldName)) {
      if (!Array.isArray(valueToValidate)) {
        errors[fieldName] = ErrorTypes.TABLEAU_ATTENDU;
      } else {
        this.validateArrayElements(
          valueToValidate,
          constraintValue,
          fieldName,
          errors
        );
      }
    }
  }

  private validateArrayElements(
    valueToValidate,
    constraintValue,
    fieldName: string,
    errors: object
  ) {
    const arrayErrors = {};
    for (let key in valueToValidate) {
      this.constraints = { [key]: constraintValue["arraySchema"] };
      const objectError = this.validate({
        [key]: valueToValidate[key]
      });
      Object.assign(arrayErrors, objectError);
    }

    if (!isObjectEmpty(arrayErrors)) {
      errors[fieldName] = arrayErrors;
    }
  }

  private validateEmbeddedObject(
    constraintValue,
    valueToValidate,
    fieldName,
    errors: object
  ) {
    this.constraints = constraintValue;
    const objectErrors = this.validate(valueToValidate);
    if (!isObjectEmpty(objectErrors)) {
      errors[fieldName] = objectErrors;
    }
  }

  private validateField(
    objectToValidate: object,
    fieldName,
    constraintValue,
    valueToValidate,
    rootSchema: object,
    errors: object
  ) {
    this.checkFieldExistsIfRequired(
      objectToValidate,
      fieldName,
      rootSchema,
      errors
    );

    if (this.exists(objectToValidate, fieldName)) {
      if (
        !constraintValue.hasOwnProperty("regex") &&
        constraintValue["type"] !== typeof valueToValidate
      ) {
        errors[fieldName] = ErrorTypes.TYPE_INVALIDE;
      }

      if (constraintValue.hasOwnProperty("regex")) {
        const matcher = Regex.matcher[constraintValue["regex"]];
        const isValid = Regex.isValid(valueToValidate, matcher["valueToMatch"]);

        if (!isValid) {
          errors[fieldName] = matcher["errorMessage"];
        }
      }
    }
  }

  private checkFieldExistsIfRequired(
    objectToValidate: object,
    fieldName,
    rootSchema: object,
    errors: object
  ) {
    if (
      !this.exists(objectToValidate, fieldName) &&
      this.isRequired(fieldName, rootSchema)
    ) {
      errors[fieldName] = ErrorTypes.CHAMP_REQUIS;
    }
  }

  private validateAttributes(
    objectToValidate: object,
    constraints: object
  ): object {
    const errors = {};
    const errorMessage = ErrorTypes.ATTRIBUT_INVALIDE;

    for (let attribute in objectToValidate) {
      if (
        !constraints.hasOwnProperty(attribute) &&
        !this.isArray(constraints)
      ) {
        errors[attribute] = errorMessage;
      }
    }

    return errors;
  }

  private isRequired(attribute: string, constraints: object): boolean {
    return constraints[attribute]["required"];
  }

  private exists(object: object, attribute: string): boolean {
    const value = object[attribute];

    return (
      object.hasOwnProperty(attribute) &&
      !isNullOrUndefined(value) &&
      !this.isEmpty(value)
    );
  }

  private isEmpty(value: any): boolean {
    if (isString(value)) {
      return value.trim() === "";
    }

    if (Array.isArray(value)) {
      return isArrayEmpty(value);
    }

    return isObjectEmpty(value);
  }

  private isEmbeddedObject(constraint: object): boolean {
    return (
      !constraint.hasOwnProperty("required") &&
      !constraint.hasOwnProperty("type") &&
      !constraint.hasOwnProperty("regex")
    );
  }

  private isArray(constraint: object): boolean {
    return constraint.hasOwnProperty("arraySchema");
  }
}
