import { useState } from "react";
import plan from "../../../assets/images/company.svg"
import "./Campaigns.css"
import tick from "../../../assets/icons/tick.svg"

const Campaigns = () => {
    const [campaignName, setCampaignName] = useState('');
    const [description, setDescription] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ campaignName, description, caption, image });
    };

    return (
        <div className="table">
            <div className="heading">
                <img src={plan} alt="plan" />

                <span>Add Campaigns</span>
            </div>

            <div className="campaign-form">
                <div className="steps">
                    <div className="step active">
                        <p>Step 1</p>

                        <span>
                        <img src={tick} alt="tick" />
                        </span>
                    </div>
                    <div className="step">Step 2</div>
                    <div className="step">Step 3</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Campaign Name</label>
                        <input
                            type="text"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="Enter campaign name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            maxLength="500"
                        />
                        <div className="character-count">{description.length}/500</div>
                    </div>

                    <div className="form-group">
                        <label>Campaign Image or Video</label>
                        <input type="file" onChange={handleImageUpload} id="upload-button" />
                        <label htmlFor="upload-button" className="upload-btn">
                            {image ? image.name : 'Upload'}
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Caption</label>
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Add caption here"
                        />
                    </div>

                    <button type="submit" className="proceed-btn">Proceed</button>
                </form>
            </div>
        </div>
    )
};

export default Campaigns;

