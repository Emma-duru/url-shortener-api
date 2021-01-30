const validatePayload = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  }
};

module.exports = validatePayload;
