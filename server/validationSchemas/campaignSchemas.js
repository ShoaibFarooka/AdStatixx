const yup = require('yup');
const mongoose = require('mongoose');

const parseJSON = (value, originalValue) => {
    if (typeof originalValue === 'string') {
        try {
            return JSON.parse(originalValue);
        } catch (err) {
            return originalValue;
        }
    }
    return value;
};

const ObjectId = yup.string().test('is-valid', 'Invalid campaign Id', value => mongoose.Types.ObjectId.isValid(value));

const campaignIdSchema = yup.object().shape({
    campaignId: ObjectId.required('Campaign Id is required'),
});

const infoSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    description: yup.string().trim().required('Description is required'),
    caption: yup.string().trim().required('Caption is required'),
    type: yup.string().trim().required('Type is required').oneOf(['fixed', 'variable'], 'Invalid campaign type'),
}).transform(parseJSON).noUnknown(true, 'Unknown field in info object');

const filtersSchema = yup.object().shape({
    age: yup.string().trim().required('Age is required'),
    gender: yup.string().trim().required('Gender is required').oneOf(['male', 'female', 'other'], 'Invalid gender filter'),
    postalCode: yup.string().trim().required('Postal code is required'),
    radius: yup.string().trim().required('Radius is required'),
}).transform(parseJSON).noUnknown(true, 'Unknown field in filters object');

const budgetSchema = yup.object().shape({
    daliyBudget: yup.number().required('Daliy budget is required').positive('Daliy budget must be positive'),
    perViewBudget: yup.number().required('Per view budget is required').positive('Per view budget must be positive'),
    totalBudget: yup.number().required('Total budget is required').positive('Total budget must be positive'),
}).transform(parseJSON).noUnknown(true, 'Unknown field in budget object');

const durationSchema = yup.object().shape({
    startDate: yup.string().trim().required('Start date is required'),
    endDate: yup.string().trim().required('End date is required'),
}).transform(parseJSON).noUnknown(true, 'Unknown field in duration object');

const acceptanceCriteriaSchema = yup.object().shape({
    minimumViews: yup.number().required('Minimum views is required').positive('Minimum views must be positive'),
}).transform(parseJSON).noUnknown(true, 'Unknown field in acceptance criteria object');

const createAndUpdateCampaignSchema = yup.object().shape({
    info: infoSchema.required('Info object is required'),
    filters: filtersSchema.required('Filters object is required'),
    budget: budgetSchema.required('Budget object is required'),
    duration: durationSchema.required('Duration object is required'),
    acceptanceCriteria: acceptanceCriteriaSchema.required('Acceptance criteria object is required'),
});

const updateCampaignStatusSchema = yup.object().shape({
    status: yup.string().trim().required('Status is required').oneOf(['active', 'paused'], 'Invalid status type'),
});

module.exports = {
    campaignIdSchema,
    createAndUpdateCampaignSchema,
    updateCampaignStatusSchema
};
