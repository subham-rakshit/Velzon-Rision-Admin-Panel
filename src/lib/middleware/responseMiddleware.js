const handleResponse = ({ res, status, success, message, userData }) => {
  const statusCode = status || 500;
  const successStatus = success || false;
  const messageText = message || "Error from Backend";

  if (userData) {
    return res.json(
      {
        success: successStatus,
        message: messageText,
        userData,
      },
      { status: statusCode }
    );
  }

  return res.json(
    {
      success: successStatus,
      message: messageText,
    },
    { status: statusCode }
  );
};

export default handleResponse;
