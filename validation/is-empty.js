/* validation/is-empty.js -- 
Validation for checking empty objects or string. 
There is a similar function for the frontend as well
*/
const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

module.exports = isEmpty;
