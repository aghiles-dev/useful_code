import { Validation } from "./validation";
import { Regex } from "./regex";
import { Type } from "./type";
import { ErrorTypes } from "./error-types";

describe("Validation", () => {
  let validationClass: Validation;

  describe(".validate(object: object)", () => {
    describe("When objectToValidate contains an attribute that is missing from the constraints", () => {
      it("returns {invalidAttributes : {fieldName: 'ATTRIBUT_INVALIDE'}}", () => {
        // Given
        const constraints = {
          field: {
            type: Type.STRING,
            required: false
          }
        };
        const objectToValidate = {
          attribute1: {},
          attribute2: {},
          field: ""
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(objectToValidate);

        // Then
        expect(errors["invalidAttributes"]).toEqual({
          attribute1: ErrorTypes.ATTRIBUT_INVALIDE,
          attribute2: ErrorTypes.ATTRIBUT_INVALIDE
        });
      });
    });

    describe("When a required field is missing from object", () => {
      it("returns {fieldName: 'CHAMP_REQUIS'}", () => {
        // Given
        const constraints: object = {
          fieldName: {
            type: Type.STRING,
            required: true
          }
        };
        const object: object = {};
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({ fieldName: ErrorTypes.CHAMP_REQUIS });
      });
    });

    describe("When a required field is empty", () => {
      it("returns {fieldName: 'CHAMP_REQUIS'}", () => {
        // Given
        const constraints: object = {
          fieldName: {
            type: Type.STRING,
            required: true
          }
        };
        const object: object = {
          fieldName: "    "
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({ fieldName: ErrorTypes.CHAMP_REQUIS });
      });
    });

    describe("When the field does not match the regex given in schema", () => {
      it("returns {fieldName: the_regex_error_type}", () => {
        // Given
        const constraints: object = {
          fieldName: {
            type: Type.STRING,
            required: true,
            regex: Regex.types.DATE_ISO_8601
          }
        };
        const object: object = {
          fieldName: "invalidDate"
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({ fieldName: ErrorTypes.DATE_INVALIDE });
      });
    });

    describe("When the field does not have the right type", () => {
      it("returns {fieldName: 'TYPE_INVALIDE'}", () => {
        // Given
        const constraints: object = {
          fieldName: {
            type: Type.STRING,
            required: true
          }
        };
        const object: object = {
          fieldName: 1
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({ fieldName: ErrorTypes.TYPE_INVALIDE });
      });
    });

    describe("When the object contains multiple errors", () => {
      it("returns all the errors", () => {
        // Given
        const constraints: object = {
          fieldString: {
            type: Type.STRING,
            required: true
          },
          fieldDate: {
            type: Type.STRING,
            required: true,
            regex: Regex.types.DATE_ISO_8601
          },
          fieldNumber5: {
            type: Type.NUMBER,
            required: false,
            regex: Regex.types.NUMBER_5
          },
          fieldNumber: {
            type: Type.NUMBER,
            required: true
          },
          fieldBoolean: {
            type: Type.BOOLEAN,
            required: true
          }
        };

        const object: object = {
          fakeAttribute1: 1,
          fakeAttribute2: 1,
          fieldString: 5,
          fieldDate: "invalidDate",
          fieldBoolean: true
        };

        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({
          invalidAttributes: {
            fakeAttribute1: ErrorTypes.ATTRIBUT_INVALIDE,
            fakeAttribute2: ErrorTypes.ATTRIBUT_INVALIDE
          },
          fieldString: ErrorTypes.TYPE_INVALIDE,
          fieldDate: ErrorTypes.DATE_INVALIDE,
          fieldNumber: ErrorTypes.CHAMP_REQUIS
        });
      });
    });

    describe("When the object is valid", () => {
      it("returns {}", () => {
        // Given
        const constraints: object = {
          fieldString: {
            type: Type.STRING,
            required: true
          },
          fieldDate: {
            type: Type.STRING,
            required: true,
            regex: Regex.types.DATE
          },
          fieldNumber5: {
            type: Type.NUMBER,
            required: true,
            regex: Regex.types.NUMBER_5
          },
          fieldNumber: {
            type: Type.NUMBER,
            required: true
          },
          fieldBoolean: {
            type: Type.BOOLEAN,
            required: true
          }
        };

        const object: object = {
          fieldString: "fakeString",
          fieldDate: "01/01/2000",
          fieldNumber5: 11111,
          fieldNumber: 10,
          fieldBoolean: true
        };

        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({});
      });
    });

    describe("When the schema is complexe (made of embedded schemas)", () => {
      it("returns the errors and keeps the tree complexity", () => {
        // Given
        const constraints: object = {
          entreprises: {
            nom: {
              type: Type.STRING,
              required: true
            },
            prenoms: {
              title: {
                type: Type.STRING,
                required: true
              },
              date_naissance: {
                regex: Regex.types.DATE_ISO_8601,
                required: true
              }
            }
          }
        };
        const object: object = {
          entreprises: {
            nom: 1,
            prenoms: {
              title: 1,
              date_naissance: "invalidDate"
            }
          }
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({
          entreprises: {
            nom: ErrorTypes.TYPE_INVALIDE,
            prenoms: {
              title: ErrorTypes.TYPE_INVALIDE,
              date_naissance: ErrorTypes.DATE_INVALIDE
            }
          }
        });
      });
    });

    describe("When the object contains an array", () => {
      it("returns the correct errors at the right indexes", () => {
        // Given
        const constraints: object = {
          entreprises: {
            prenoms: {
              arraySchema: {
                type: Type.STRING,
                required: true
              }
            },
            adresse: {
              arraySchema: {
                code_postal: {
                  regex: Regex.types.NUMBER_5,
                  required: true
                },
                numero_voie: {
                  type: Type.NUMBER,
                  required: true
                }
              },
              required: false
            }
          }
        };
        const object: object = {
          entreprises: {
            prenoms: ["fake", 1]
          }
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({
          entreprises: {
            prenoms: {
              1: ErrorTypes.TYPE_INVALIDE
            }
          }
        });
      });
    });

    describe("When an expected array is not given", () => {
      it("returns ErrorTypes.CHAMP_REQUIS for the given field", () => {
        // Given
        const constraints: object = {
          entreprises: {
            adresse: {
              arraySchema: {
                code_postal: {
                  regex: Regex.types.NUMBER_5,
                  required: true
                },
                numero_voie: {
                  type: Type.NUMBER,
                  required: true
                }
              },
              required: true
            }
          }
        };
        const object: object = {
          entreprises: {}
        };
        validationClass = new Validation(constraints);

        // When
        const errors = validationClass.validate(object);

        // Then
        expect(errors).toEqual({
          entreprises: {
            adresse: ErrorTypes.CHAMP_REQUIS
          }
        });
      });
    });
  });
});
