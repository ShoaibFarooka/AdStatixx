const Campaign = require('../models/campaignModel');

const createCampaign = async (campaignData, companyId) => {
    const campaign = await Campaign.create({
        ...campaignData,
        company: companyId
    });

    return campaign;
};

const updateCampaign = async (companyId, campaignId, updatedCampaignData) => {
    const campaignToUpdate = await Campaign.findById(campaignId);

    if (!campaignToUpdate) {
        const error = new Error('Campaign not found!');
        error.code = 404;
        throw error;
    }

    if (campaignToUpdate.company.toString() !== companyId.toString()) {
        const error = new Error('Unauthorized to update this campaign!');
        error.code = 403;
        throw error;
    }

    const mergedAssets = [
        ...campaignToUpdate.assets,
        ...(updatedCampaignData.assets || [])
    ];

    const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        { ...updatedCampaignData, assets: mergedAssets },
        { new: true }
    );

    return updatedCampaign;
};

const updateCampaignStatus = async (companyId, campaignId, updatedStatus) => {
    const campaignToUpdate = await Campaign.findById(campaignId);

    if (!campaignToUpdate) {
        const error = new Error('Campaign not found!');
        error.code = 404;
        throw error;
    }

    if (companyId && campaignToUpdate.company.toString() !== companyId.toString()) {
        const error = new Error('Unauthorized to update this campaign!');
        error.code = 403;
        throw error;
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        { status: updatedStatus },
        { new: true }
    );

    return updatedCampaign;
};

const deleteCampaign = async (companyId, campaignId) => {
    const campaignToDelete = await Campaign.findById(campaignId);

    if (!campaignToDelete) {
        const error = new Error('Campaign not found!');
        error.code = 404;
        throw error;
    }

    if (companyId && campaignToDelete.company.toString() !== companyId.toString()) {
        const error = new Error('Unauthorized to delete this campaign!');
        error.code = 403;
        throw error;
    }

    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);

    return deletedCampaign;
};

const getCompanyCampaigns = async (companyId) => {
    const campaigns = await Campaign.find({ company: companyId });

    if (!campaigns || campaigns.length <= 0) {
        const error = new Error('Campaigns not found!');
        error.code = 404;
        throw error;
    }

    return campaigns;
};

const getAllCampaigns = async () => {
    const campaigns = await Campaign.find().populate('company', 'name email number address city zip');

    if (!campaigns || campaigns.length <= 0) {
        const error = new Error('Campaigns not found!');
        error.code = 404;
        throw error;
    }

    return campaigns;
};

module.exports = {
    createCampaign,
    updateCampaign,
    updateCampaignStatus,
    deleteCampaign,
    getCompanyCampaigns,
    getAllCampaigns
};
