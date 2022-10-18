// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}
