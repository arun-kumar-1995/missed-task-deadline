export const APIResponse = (response, http, message, data = null) => {
  const { statusCode, code } = http

  response.status(statusCode).json({
    success: true,
    code,
    statusCode,
    message,
    ...(data && { data }),
    meta: {
      timestamp: new Date().toISOString(),
    },
  })
}
