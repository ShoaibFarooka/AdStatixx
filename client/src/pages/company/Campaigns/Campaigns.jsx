import "./Campaigns.css";
import plan from "../../../assets/images/company.svg";
import { useEffect, useState } from "react";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useNavigate } from "react-router-dom";
import CampaignService from "../../../services/CampaignService";
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { setSelectedCampaign } from '../../../redux/campaignSlice'; // adjust path as needed
import { message } from "antd";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditClick = (campaign) => {
        dispatch(setSelectedCampaign(campaign)); 
        navigate('/company/campaigns/edit-campaign'); 
    };

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await CampaignService.getCampaign();
                if (response.campaigns) {
                    setCampaigns(response.campaigns);
                } else {
                    console.error("Campaigns not found in the response");
                }
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };

        fetchCampaigns();
    }, []);

    const toggleCampaign = async (index) => {
        const campaignToToggle = campaigns[index];
        const updatedStatus = campaignToToggle.status === "active" ? "paused" : "active";

        try {
            await CampaignService.updateCampaignStatus(campaignToToggle._id, { status: updatedStatus });
            setCampaigns((prev) =>
                prev.map((campaign, i) =>
                    i === index ? { ...campaign, status: updatedStatus } : campaign
                )
            );
        } catch (error) {
            console.error("Error updating campaign status:", error);
        }
    };


    const deleteCampaign = (campaignId) => {
        Swal.fire({
            title: "Do you want to delete the campaign?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#d33",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                   const response= await CampaignService.deleteCampaign(campaignId);
                    setCampaigns((prev) => prev.filter((campaign) => campaign._id !== campaignId));
                    message.success(response.message)
                } catch (error) {
                    message.error(error.response?.data?.error || "Cancel")
                    console.error("Error deleting campaign:", error);
                    Swal.fire("Error!", "Failed to delete the campaign.", "error");
                }
            }
        });
    };



    return (
        <div className="campaigns">
            <div
                onClick={() => navigate("/company/campaigns/add-campaign")}
                className="bg-[#6AB541] text-white w-[180px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer"
            >
                Create Campaign +
            </div>

            <div className="main_table">
                <div className="heading">
                    <img src={plan} alt="plan" />
                    <span>Campaigns</span>
                </div>

                <div className="campaign-table">
                    <table className="table">
                        <thead>
                            <tr className="campaign_tr">
                                <th className="campaign_th">Pause/Start</th>
                                <th className="campaign_th">Campaign Name</th>
                                <th className="campaign_th">Total Budget</th>
                                <th className="campaign_th">Duration</th>
                                <th className="campaign_th">Views</th>
                                <th className="campaign_th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center pt-4">
                                        There is no campaign
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((campaign, index) => (
                                    <tr className="campaign_tr" key={index}>
                                        <td className="campaign_td">
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={campaign.status === "active"}
                                                    onChange={() => toggleCampaign(index)}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </td>
                                        <td className="campaign_td">{campaign.info.name}</td>
                                        <td className="campaign_td">{campaign.budget.totalBudget}$</td>
                                        <td className="campaign_td">
                                            {campaign.duration.startDate} - {campaign.duration.endDate}
                                        </td>
                                        <td className="campaign_td">{campaign.acceptanceCriteria.minimumViews}</td>
                                        <td className="campaign_td">
                                            <button className="edit-btn" onClick={() => handleEditClick(campaign)}>
                                                <img src={edit} alt="edit" />
                                            </button>
                                            <button className="delete-btn" onClick={() => deleteCampaign(campaign._id)}>
                                                <img src={deleteIcon} alt="deleteIcon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Campaigns;
