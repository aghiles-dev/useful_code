import { isNullOrUndefined, isString } from "util";

export function capitalize(word: string): string {
  if (!isNullOrUndefined(word) && isString(word) && word.trim() !== "") {
    const words = word.trim().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] =
        words[i].charAt(0).toUpperCase() +
        words[i].substr(1, words[i].length).toLowerCase();
    }
    return words.join(" ");
  }
  return word;
}

export function assignTo(
  objectWhereToAssignValue: object,
  keys: string[],
  valueToAssign: any
): void {
  const lastKeyIndex = keys.length - 1;

  for (let i = 0; i < lastKeyIndex; i++) {
    const key = keys[i];
    if (!(key in objectWhereToAssignValue)) {
      objectWhereToAssignValue[key] = {};
    }
    objectWhereToAssignValue = objectWhereToAssignValue[key];
  }

  objectWhereToAssignValue[keys[lastKeyIndex]] = valueToAssign;
}

export function isObjectEmpty(object: object): boolean {
  return equals(object, {});
}

export function isArrayEmpty(array: any[]): boolean {
  return equals(array, []);
}

export function equals(data1: any, data2: any): boolean {
  if (data1 === data2) {
    return true;
  }
  if (data1 !== data1 && data2 !== data2) {
    return true; // Cas NaN === NaN
  }

  if (typeof data1 === "object" && typeof data2 === "object") {
    if (Array.isArray(data1) && Array.isArray(data2)) {
      return _areArraysIdentical(data1, data2);
    }
    if (!Array.isArray(data1) && !Array.isArray(data2)) {
      return _areObjectsIdentical(data1, data2);
    }
  }
  return false;
}

function _areArraysIdentical(data1: any[], data2: any[]): boolean {
  if (data1.length !== data2.length) {
    return false;
  }
  for (let i = 0; i < data1.length; i++) {
    if (!equals(data1[i], data2[i])) {
      return false;
    }
  }
  return true;
}

function _areObjectsIdentical(data1: object, data2: object): boolean {
  const checkedKeys = [];
  for (let key in data1) {
    if (!equals(data1[key], data2[key])) {
      return false;
    }
    checkedKeys.push(key);
  }

  for (let key in data2) {
    if (!checkedKeys.includes(key)) {
      return false;
    }
  }
  return true;
}
