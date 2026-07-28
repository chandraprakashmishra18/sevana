/**
 * Standard Success Response
 */
const success = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
  } = {}
) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * 201 Created Response
 */
const created = (
  res,
  {
    message = "Resource created successfully.",
    data = null,
  } = {}
) => {
  return success(res, {
    statusCode: 201,
    message,
    data,
  });
};

/**
 * 204 No Content Response
 */
const noContent = (res) => {
  return res.status(204).send();
};

/**
 * Standard Error Response. Error details are intentionally not exposed in the
 * public response contract; log or handle them internally instead.
 */
const fail = (
  res,
  {
    statusCode = 500,
    message = "Something went wrong.",
  } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  success,
  created,
  noContent,
  fail,
};
