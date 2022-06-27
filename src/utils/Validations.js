export const formObjectIsEmpty = value => {
  if (
    value &&
    Object.keys(value).length === 0 &&
    value.constructor === Object
  ) {
    return true;
  } else if (
    value &&
    Object.keys(value).length !== 0 &&
    value.constructor === Object
  ) {
    let isErr = false;
    Object.values(value).map(val => {
      if ((val === null || val === undefined || val === '', val?.length < 1)) {
        isErr = true;
      }
    });
    return isErr;
  } else {
    return false;
  }
};
