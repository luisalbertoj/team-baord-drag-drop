const upload = async (req, res, next) => {
  if (!req.files.image) {
    next();
  } else {
    if (req.files.image.type) {
      const type = req.files.image.type;
      if (
        type !== "image/png" &&
        type !== "image/jpg" &&
        type !== "image/jpeg" &&
        type !== "image/gif"
      ) {
        return res
          .status(400)
          .send("Invalid image format: only .png .jpg. jpeg .gif");
      } else {
        next();
      }
    }
  }
};

module.exports = upload;
