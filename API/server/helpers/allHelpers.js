/* eslint-disable linebreak-style */
const getErrorMessage = (errors) => {
  const err = errors.map((data) => {
    const error = data.message;
    return error;
  });
  return err;
};
export default getErrorMessage;
