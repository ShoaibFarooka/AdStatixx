const Campaign = require('../models/campaignModel');

const createCampaign = async (campaignData, companyId) => {
    const campaign = await Campaign.create({
        ...campaignData,
        company: companyId
    });

    return campaign;
};

const updateCampaign = async (campaignId, updatedCampaignData) => {
    const campaignToUpdate = await Campaign.findById(campaignId);

    if (!campaignToUpdate) {
        const error = new Error('Campaign not found!');
        error.code = 404;
        throw error;
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        updatedCampaignData,
        { new: true }
    );

    return updatedCampaign;
};

const updateCampaignStatus = async (campaignId, updatedStatus) => {
    const campaignToUpdate = await Campaign.findById(campaignId);

    if (!campaignToUpdate) {
        const error = new Error('Campaign not found!');
        error.code = 404;
        throw error;
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        { status: updatedStatus },
        { new: true }
    );

    return updatedCampaign;
};

const deleteCampaign = async (campaignId) => {
    const campaignToDelete = await Campaign.findById(campaignId);

    if (!campaignToDelete) {
        const error = new Error('Campaign not found!');
        error.code = 404;
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

module.exports = {
    createCampaign,
    updateCampaign,
    updateCampaignStatus,
    deleteCampaign,
    getCompanyCampaigns
};
