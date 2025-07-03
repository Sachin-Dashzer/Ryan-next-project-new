import Services from "@/models/service";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        metadata,
        bannerData,
        overviewData,
        typesData,
        benefitsData,
        faq,
        extraFields,
      } = req.body;

      // Basic validation
      if (!metadata?.title || !metadata?.description || !metadata?.pageurl) {
        return res.status(400).json({
          error: "Missing required metadata fields",
        });
      }

      if (!bannerData?.title || !bannerData?.description || !bannerData?.url) {
        return res.status(400).json({
          error: "Missing required banner data fields",
        });
      }

      if (!overviewData) {
        return res.status(400).json({
          error: "Overview data is required",
        });
      }

      if (!benefitsData?.details || !benefitsData?.image) {
        return res.status(400).json({
          error: "Missing required benefits data fields",
        });
      }

      if (!extraFields?.detail1 || !extraFields?.detail2) {
        return res.status(400).json({
          error: "Missing required extra fields",
        });
      }

      const newService = new Services({
        metadata,
        bannerData,
        overviewData,
        typesData,
        benefitsData,
        faq,
        extraFields,
      });

      const savedService = await newService.save();

      res.status(200).json({
        message: "Service registered successfully",
        service: savedService,
      });
    } catch (error) {
      console.error("Registration error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          error: "Validation failed",
          details: error.message,
        });
      }

      if (error.code === 11000) {
        return res.status(409).json({
          error: "Service already exists",
          details: "Duplicate entry found",
        });
      }

      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
