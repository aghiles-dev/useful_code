import {
  assignTo,
  capitalize,
  equals,
  isArrayEmpty,
  isObjectEmpty
} from "./gaip-utils";

describe(".capitalize(:word)", () => {
  describe("When word is null | undefined", () => {
    it("returns word", () => {
      // Given
      const word = null;

      // When
      const result = capitalize(word);

      // Then
      expect(result).toEqual(word);
    });
  });

  describe("When word == ''", () => {
    it("returns word", () => {
      // Given
      const word = "";

      // When
      const result = capitalize(word);

      // Then
      expect(result).toEqual(word);
    });
  });

  describe("When word is a (not empty) string", () => {
    it("returns the capitalized word", () => {
      // Given
      const word = "fakeWord";

      // When
      const result = capitalize(word);

      // Then
      expect(result).toEqual("Fakeword");
    });
  });

  describe("When word is a compound word", () => {
    it("returns capitalized word for each word", () => {
      // Given
      const word = "fakeWord fakeWord";

      // When
      const result = capitalize(word);

      // Then
      expect(result).toEqual("Fakeword Fakeword");
    });
  });

  describe("When word have space at the begin and the end", () => {
    it("returns capitalized word for each word", () => {
      // Given
      const word = " fakeWord fakeWord ";

      // When
      const result = capitalize(word);

      // Then
      expect(result).toEqual("Fakeword Fakeword");
    });
  });
});

describe("isObjectEmpty(:object)", () => {
  describe("When parameter is an empty object", () => {
    it("returns true", () => {
      // Given
      const data = {};

      // When
      const result = isObjectEmpty(data);

      // Then
      expect(result).toEqual(true);
    });
  });

  describe("When parameter is not an empty object", () => {
    it("returns false", () => {
      // Given
      const data = {
        fake: "test"
      };

      // When
      const result = isObjectEmpty(data);

      // Then
      expect(result).toEqual(false);
    });
  });
});

describe("isArrayEmpty(:object)", () => {
  describe("When parameter is an empty object", () => {
    it("returns true", () => {
      // Given
      const data = [];

      // When
      const result = isArrayEmpty(data);

      // Then
      expect(result).toEqual(true);
    });
  });

  describe("When parameter is not an empty object", () => {
    it("returns false", () => {
      // Given
      const data = ["test"];

      // When
      const result = isArrayEmpty(data);

      // Then
      expect(result).toEqual(false);
    });
  });
});

describe("equals(:data1, :data2)", () => {
  const equalsFunction = equals;

  describe("When the two simple parameters are identical", () => {
    it("returns true", () => {
      // Given
      const data1 = "fake";
      const data2 = "fake";

      // When
      const result = equalsFunction(data1, data2);

      // Then
      expect(result).toEqual(true);
    });
  });

  describe("When the two parameters are NaN", () => {
    it("returns true", () => {
      // Given
      const data1 = NaN;
      const data2 = NaN;

      // When
      const result = equalsFunction(data1, data2);

      // Then
      expect(result).toEqual(true);
    });
  });

  describe("When the two parameters are arrays", () => {
    describe("When they are the same array", () => {
      it("returns true", () => {
        // Given
        const data1 = ["fake", "fake"];
        const data2 = ["fake", "fake"];

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When they have different lengths", () => {
      it("returns false", () => {
        // Given
        const data1 = ["fake"];
        const data2 = ["fake", "fake"];

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When they have the same length, but different contents", () => {
      it("returns false", () => {
        // Given
        const data1 = ["fake", "fake1"];
        const data2 = ["fake", "fake"];

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(false);
      });
    });
  });

  describe("When the two parameters are objects", () => {
    describe("When they are the same object", () => {
      it("returns true", () => {
        // Given
        const data1 = {
          key1: "fake",
          key2: {
            subKey1: "test",
            subKey2: ["fake", { complicated: 5 }]
          }
        };
        const data2 = {
          key1: "fake",
          key2: {
            subKey1: "test",
            subKey2: ["fake", { complicated: 5 }]
          }
        };

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(true);
      });
    });

    describe("When data1 has more attributes than data2", () => {
      it("returns false", () => {
        // Given
        const data1 = {
          key1: "fake",
          key2: 1
        };
        const data2 = {
          key1: "fake"
        };

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When data2 has more attributes than data1", () => {
      it("returns false", () => {
        // Given
        const data1 = {
          key2: 1
        };
        const data2 = {
          key1: "fake",
          key2: 1
        };

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(false);
      });
    });

    describe("When data1 and data2 have the same attributes, but different contents", () => {
      it("returns false", () => {
        // Given
        const data1 = {
          key1: "fake",
          key2: []
        };
        const data2 = {
          key1: "fake",
          key2: 1
        };

        // When
        const result = equalsFunction(data1, data2);

        // Then
        expect(result).toEqual(false);
      });
    });
  });

  describe(".assignTo(:objectWhereToAssignValue, :keys, :valueToAssign)", () => {
    describe("When an object is added to the objectWhereToAssignValue", () => {
      it("assigns the value according to the keys", () => {
        // Given
        const objectWhereToAssignValue = { object1: { attribute1: 1 } };
        const keys = ["object1", "attribute2"];
        const valueToAssign = 2;
        const expected = { object1: { attribute1: 1, attribute2: 2 } };

        // When
        assignTo(objectWhereToAssignValue, keys, valueToAssign);

        // Then
        expect(objectWhereToAssignValue).toEqual(expected);
      });
    });

    describe("When an object with an attribute is added to the objectWhereToAssignValue", () => {
      it("assigns the value according to the keys", () => {
        // Given
        const objectWhereToAssignValue = {
          object1: { attribute1: 1, attribute2: 2 },
          string: "fake",
          number: 1
        };
        const keys = ["object1", "attribute3", "subObject1"];
        const valueToAssign = "fakeSubObject";
        const expected = {
          object1: {
            attribute1: 1,
            attribute2: 2,
            attribute3: { subObject1: "fakeSubObject" }
          },
          string: "fake",
          number: 1
        };

        // When
        assignTo(objectWhereToAssignValue, keys, valueToAssign);

        // Then
        expect(objectWhereToAssignValue).toEqual(expected);
      });
    });

    describe("When an object with an attribute is updated to the objectWhereToAssignValue", () => {
      it("assigns the value updated according to the keys", () => {
        // Given
        const objectWhereToAssignValue = {
          object1: { attribute1: 1, attribute2: 2 },
          string: "fake",
          number: 1
        };
        const keys = ["string"];
        const valueToAssign = "fakeNewValue";
        const expected = {
          object1: {
            attribute1: 1,
            attribute2: 2
          },
          string: "fakeNewValue",
          number: 1
        };

        // When
        assignTo(objectWhereToAssignValue, keys, valueToAssign);

        // Then
        expect(objectWhereToAssignValue).toEqual(expected);
      });
    });
  });
});
