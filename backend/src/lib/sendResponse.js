const sendResponse = (
  res,
  { statusCode = 200, message = "Success", data = null },
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

export default sendResponse;
