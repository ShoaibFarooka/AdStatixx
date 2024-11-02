const campaignService = require('../services/campaignService');

const CreateCampaign = async (req, res, next) => {
    try {
        const companyId = req.user?.id;
        const { info, filters, budget, duration, acceptanceCriteria } = req.body;
        const parsedInfo = JSON.parse(info);
        const parsedFilters = JSON.parse(filters);
        const parsedBudget = JSON.parse(budget);
        const parsedDuration = JSON.parse(duration);
        const parsedAcceptanceCriteria = JSON.parse(acceptanceCriteria);
        const assets = req.files.map(file => `${file.path}`);

        const campaignData = {
            company: companyId,
            info: parsedInfo,
            filters: parsedFilters,
            budget: parsedBudget,
            duration: parsedDuration,
            acceptanceCriteria: parsedAcceptanceCriteria,
            assets,
            status: 'active'
        };
        console.log('Campaign Data: ', campaignData);
        const campaign = await campaignService.createCampaign(campaignData, companyId);
        res.status(201).json({ message: "Campaign created successfully!" });
    } catch (error) {
        console.log('Error: ', error);
        next(error);
    }
};

const UpdateCampaign = async (req, res, next) => {
    try {
        const companyId = req.user?.id;
        const { campaignId } = req.params;
        const { info, filters, budget, duration, acceptanceCriteria } = req.body;
        const parsedInfo = JSON.parse(info);
        const parsedFilters = JSON.parse(filters);
        const parsedBudget = JSON.parse(budget);
        const parsedDuration = JSON.parse(duration);
        const parsedAcceptanceCriteria = JSON.parse(acceptanceCriteria);
        const assets = req.files.map(file => `${file.path}`);

        const updatedCampaignData = {
            company: companyId,
            info: parsedInfo,
            filters: parsedFilters,
            budget: parsedBudget,
            duration: parsedDuration,
            acceptanceCriteria: parsedAcceptanceCriteria,
            assets
        };
        console.log('Updated Campaign Data: ', updatedCampaignData);
        const campaign = await campaignService.updateCampaign(companyId, campaignId, updatedCampaignData);
        res.status(200).json({ message: "Campaign updated successfully!" });
    } catch (error) {
        console.log('Error: ', error);
        next(error);
    }
};

const UpdateCampaignStatus = async (req, res, next) => {
    try {
        let companyId = null;
        if (req.user.role === 'company') {
            companyId = req.user?.id;
        }
        const { campaignId } = req.params;
        const { status } = req.body;
        const campaign = await campaignService.updateCampaignStatus(companyId, campaignId, status);
        res.status(200).json({ message: "Campaign status updated successfully!" });
    } catch (error) {
        console.log('Error: ', error);
        next(error);
    }
};

const DeleteCampaign = async (req, res, next) => {
    try {
        let companyId = null;
        if (req.user.role === 'company') {
            companyId = req.user?.id;
        }
        const { campaignId } = req.params;
        const campaign = await campaignService.deleteCampaign(companyId, campaignId);
        res.status(200).json({ message: "Campaign deleted successfully!" });
    } catch (error) {
        console.log('Error: ', error);
        next(error);
    }
};

const GetCompanyCampaigns = async (req, res, next) => {
    try {
        const companyId = req.user?.id;
        const campaigns = await campaignService.getCompanyCampaigns(companyId);
        res.status(200).json({ campaigns });
    } catch (error) {
        console.log('Error: ', error);
        next(error);
    }
};

const GetAllCampaigns = async (req, res, next) => {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        res.status(200).json({ campaigns });
    } catch (error) {
        console.log('Error: ', error);
        next(error);
    }
};

module.exports = {
    CreateCampaign,
    UpdateCampaign,
    UpdateCampaignStatus,
    DeleteCampaign,
    GetCompanyCampaigns,
    GetAllCampaigns
};
