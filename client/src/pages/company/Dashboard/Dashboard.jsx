import "./Dashboard.css"
import plan from "../../../assets/images/company.svg"
import { useState } from "react";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg"

const Dashboard = () => {
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


    return (
        <div className="dashboard">

            <div className="table">
                <div className="heading">
                    <img src={plan} alt="plan" />

                    <span>Campaigns</span>
                </div>

                <div className="campaign-table">
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Pause/Start</th>
                                <th>Campaign Name</th>
                                <th>Daily Budget</th>
                                <th>Duration</th>
                                <th>Views</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign, index) => (
                                <tr key={index}>
                                    <td style={{ alignItems: "left" }}><input type="checkbox" /></td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={campaign.active}
                                                onChange={() => toggleCampaign(index)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                    <td>{campaign.name}</td>
                                    <td>{campaign.budget}$</td>
                                    <td>{campaign.duration}</td>
                                    <td>{campaign.views}</td>
                                    <td>
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

export default Dashboard;
