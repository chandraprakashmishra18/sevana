success(res, {
  statusCode,
  message,
  data,
  meta
})

created(res, {
  message,
  data
})

noContent(res)

fail(res, {
  statusCode,
  message,
  errors
})