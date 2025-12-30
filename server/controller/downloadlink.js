const fs = require("fs");
const path = require("path");

exports.totalsecurity = (req, res) => {
  try {
    const filePath = path.join("/home/dev", "ActipaceTotalSecuritySetup.zip");
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

   // console.log("File path:", filePath);

    // Send the file as a download
    res.download(filePath, "ActipaceTotalSecuritySetup.zip", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("Error downloading file");
      }
    });
  } catch (e) {
    console.error("Error in downloadlink:", e.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


exports.internetsecurity = (req, res) => {
    try {
      const filePath = path.join("/home/dev", "ActipaceInternetSecuritySetup.zip");
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return res.status(404).json({
          success: false,
          message: "File not found.",
        });
      }
  
     // console.log("File path:", filePath);
  
      // Send the file as a download
      res.download(filePath, "ActipaceInternetSecuritySetup.zip", (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).send("Error downloading file");
        }
      });
    } catch (e) {
      console.error("Error in downloadlink:", e.message);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  
exports.basicdefence = (req, res) => {
    try {
      const filePath = path.join("/home/dev", "ActipaceBasicDefenceSetup.zip");
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return res.status(404).json({
          success: false,
          message: "File not found.",
        });
      }
  
     // console.log("File path:", filePath);
  
      // Send the file as a download
      res.download(filePath, "ActipaceBasicDefenceSetup.zip", (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).send("Error downloading file");
        }
      });
    } catch (e) {
      console.error("Error in downloadlink:", e.message);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
  