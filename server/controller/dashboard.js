const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

exports.dashboard = async (req, res) => {
  try {
    // Extract the email from the authenticated user object
    const { email } = req.user;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email is missing.",
      });
    }

    // Fetch purchase data from the database
    const data = await prisma.purchase.findMany({
      where: {
        email: email,
        status:"SUCCESS",
      },
      include: {
        software: true,
        softwarePlan: true,
      },
    });

    const apiResponse = await axios.get(
        `https://actipace.com/ts/deviceget.php?email=${email}`
    );

    // Check if no purchase plans exist for the user
    if (!data || data.length === 0) {
      if (!apiResponse.data || apiResponse.data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "You don't have any purchase plans.",
        });
      }
    }

    // Fetch license data from the external API


    const licenses = [];
    let count = 0;

    if (apiResponse.data) {
      const apiData = apiResponse.data.split("$@");

      // Extract count (first element in the API response)
      count = Number(apiData[0]);

      // Process and parse license details
      for (let i = 1; i < apiData.length; i += 5) {
        licenses.push({
          licenseKey: apiData[i],
          computerName: apiData[i + 1],
          operatingSystem: apiData[i + 2],
          expiry: apiData[i + 3],
          plan1 : apiData[i + 4],
        });
      }
    }

    // Combine the purchase data and license details
    const jsonResult = {
      count,
      licenses,
    };

    // Send success response
    return res.status(200).json({
      success: true,
      data, // Purchase data from the database
      jsonResult, // License data from the API
    });
  } catch (error) {
    // Log error for debugging
    console.error("Error in dashboard:", error.message);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the dashboard data.",
    });
  }
};
