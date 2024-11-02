import "./Campaigns.css";
import plan from "../../../assets/images/company.svg";
import { useEffect, useState } from "react";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useNavigate } from "react-router-dom";
import CampaignService from "../../../services/Company/CampaignService";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

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
    

    const deleteCampaign = (index) => {
        setCampaigns((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="dashboard">
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
                                <th className="campaign_th">Daily Budget</th>
                                <th className="campaign_th">Duration</th>
                                <th className="campaign_th">Views</th>
                                <th className="campaign_th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign, index) => (
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
                                    <td className="campaign_td">{campaign.budget.daliyBudget}$</td>
                                    <td className="campaign_td">{campaign.duration.startDate} - {campaign.duration.endDate}</td>
                                    <td className="campaign_td">{campaign.acceptanceCriteria.minimumViews}</td>
                                    <td className="campaign_td">
                                        <button className="edit-btn">
                                            <img src={edit} alt="edit" />
                                        </button>
                                        <button className="delete-btn" onClick={() => deleteCampaign(index)}>
                                            <img src={deleteIcon} alt="deleteIcon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Campaigns;
