/* validation/is-empty.js -- 
Validation for checking empty objects or string. 
This is different from backend is-empty validation as

we are also checking if we only have 1 object that has empty contents
example-
due to if user wants to remove a particular profile data such as their location from their profile,
we will end up passing a null object in the inidividual user profile in this case instead of an empty string
*/
const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "object" &&
      Object.keys(value).length === 1 &&
      Object.keys(value[0]).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export default isEmpty;
