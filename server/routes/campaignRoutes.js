const router = require("express").Router();
const controller = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");
const campaignSchemas = require('../validationSchemas/campaignSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');
const { upload } = require("../middleware/multerMiddleware");

router.post(
    "/create-campaign",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['company']),
    upload.array('assets', 10),
    validationMiddleware.validateRequest(campaignSchemas.createAndUpdateCampaignSchema),
    controller.CreateCampaign
);

router.patch(
    "/update-campaign/:campaignId",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['company']),
    validationMiddleware.validateParams(campaignSchemas.campaignIdSchema),
    upload.array('assets', 10),
    validationMiddleware.validateRequest(campaignSchemas.createAndUpdateCampaignSchema),
    controller.UpdateCampaign
);

router.patch(
    "/update-campaign-status/:campaignId",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['company', 'admin']),
    validationMiddleware.validateParams(campaignSchemas.campaignIdSchema),
    validationMiddleware.validateRequest(campaignSchemas.updateCampaignStatusSchema),
    controller.UpdateCampaignStatus
);

router.delete(
    "/delete-campaign/:campaignId",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['company', 'admin']),
    validationMiddleware.validateParams(campaignSchemas.campaignIdSchema),
    controller.DeleteCampaign
);

router.get(
    "/get-company-campaigns",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['company']),
    controller.GetCompanyCampaigns
);

router.get(
    "/get-all-campaigns",
    authMiddleware.authenticateRequest,
    authMiddleware.verifyRole(['admin']),
    controller.GetAllCampaigns
);

module.exports = router;
