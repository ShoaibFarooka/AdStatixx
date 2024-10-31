import "./Campaigns.css"
import plan from "../../../assets/images/company.svg"
import { useState } from "react";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg"
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([
        { name: "Lindsey Stroud", budget: 200, duration: "7 Days a week", views: 45, active: true },
        { name: "Sarah Brown", budget: 100, duration: "7 Days a week", views: 2000, active: true },
        { name: "Micheal Owen", budget: 100, duration: "7 Days a week", views: 45, active: true },
        { name: "Mary Jane", budget: 200, duration: "7 Days a week", views: 45, active: true },
        { name: "Peter Dodle", budget: 200, duration: "7 Days a week", views: 45, active: true },
        { name: "Peter Dodle", budget: 100, duration: "7 Days a week", views: 45, active: true },
        { name: "Peter Dodle", budget: 100, duration: "7 Days a week", views: 45, active: true },
        { name: "Peter Dodle", budget: 300, duration: "7 Days a week", views: 45, active: true },
    ]);

    const toggleCampaign = (index) => {
        setCampaigns((prev) =>
            prev.map((campaign, i) =>
                i === index ? { ...campaign, active: !campaign.active } : campaign
            )
        );
    };

    const deleteCampaign = (index) => {
        setCampaigns((prev) => prev.filter((_, i) => i !== index));
    };

    const navigate = useNavigate()

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
                                                checked={campaign.active}
                                                onChange={() => toggleCampaign(index)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                    <td className="campaign_td">{campaign.name}</td>
                                    <td className="campaign_td">{campaign.budget}$</td>
                                    <td className="campaign_td">{campaign.duration}</td>
                                    <td className="campaign_td">{campaign.views}</td>
                                    <td className="campaign_td">
                                        <button className="edit-btn"><img src={edit} alt="edit" /></button>
                                        <button className="delete-btn" onClick={() => deleteCampaign(index)}><img src={deleteIcon} alt="deleteIcon" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Campaigns;
