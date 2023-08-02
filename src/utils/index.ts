import { FinancialDataItem } from "../models";

type ObjectWithProperties<T> = {
  [K in keyof T]: T[K];
};

export function getObjectPropertyValues<T>(
  obj: ObjectWithProperties<T>
): string[] {
  return Object.values(obj).map((value) => String(value));
}

export function getObjectPropertyKeys<T>(
  obj: ObjectWithProperties<T>
): string[] {
  return Object.keys(obj).map((value) => String(value));
}
