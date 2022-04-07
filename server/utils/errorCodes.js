const errorCodes = {
  REQUEST_TIMEOUT_EXCEED: "REQUEST_TIMEOUT_EXCEED",
};
/** @type {(message:string,status:number) => Error} */
function createError(message, status) {
  const e = new Error(message);
  // @ts-ignore
  e.status = status;
  return e;
}
export { errorCodes, createError };
