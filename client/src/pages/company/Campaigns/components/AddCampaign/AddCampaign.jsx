import { useState } from "react";
import plan from "../../../../../assets/images/company.svg"
import "../../Campaigns.css";
import tick from "../../../../../assets/icons/tick.svg"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CampaignService from "../../../../../services/CampaignService";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AddCampaign = () => {

    const [campaignName, setCampaignName] = useState('');
    const [description, setDescription] = useState('');
    const [caption, setCaption] = useState('');
    const [step, setStep] = useState(1);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [radius, setRadius] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [minimumViews, setMinimumViews] = useState('');
    const [budgetPerView, setBudgetPerView] = useState('');
    const [adStartDate, setAdStartDate] = useState(null);
    const [adEndDate, setAdEndDate] = useState(null);
    const [openEnd, setOpenEnd] = useState(false);
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]); // Store multiple images
    const [type, setType] = useState("")
    const navigate = useNavigate()

    const handleImageUpload = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to array
        setImages((prevImages) => [...prevImages, ...selectedFiles]); // Append new images
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove image by index
    };

    const validateStep = () => {
        let newErrors = {};

        if (step === 1) {
            if (!campaignName) newErrors.campaignName = "Campaign name is required";
            if (!description) newErrors.description = "Description is required";
            // if (images.length === 0) newErrors.image = "Image is required";
            if (!caption) newErrors.caption = "Caption is required";
            if (!type) newErrors.type = "Type is required";
            if (images.length <= 0) newErrors.images = "Assets are required";
        } else if (step === 2) {
            if (!age) newErrors.age = "Age selection is required";
            if (!gender) newErrors.gender = "Gender selection is required";
            if (!postalCode) newErrors.postalCode = "Postal code is required";
            if (!radius) newErrors.radius = "Radius selection is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep((prevStep) => Math.min(prevStep + 1, 3));
        }
    };
    const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));


    const handleSubmit = async (e) => {
        e.preventDefault();


        let newErrors = {};

        // Step 3 validation
        if (!totalBudget) {
            newErrors.totalBudget = "Total Budget is required";
            newErrors.totalBudget = "Total Budget must be a number";
        }

        if (!budgetPerView && type === "variable") {
            newErrors.budgetPerView = "Budget per view is required";
        } else if (!/^\d+$/.test(budgetPerView) && type === "variable") {
            newErrors.budgetPerView = "Budget per view must be a number";
        }

        if (!minimumViews && type === "fixed") {
            newErrors.minimumViews = "Minimum Views is required";
        } else if (!/^\d+$/.test(minimumViews) && type === "fixed") {
            newErrors.minimumViews = "Minimum Views must be a number";
        }

        if (!openEnd) {  // Only validate dates if not open-ended
            if (!adStartDate) newErrors.adStartDate = "Start date is required";
            if (!adEndDate) newErrors.adEndDate = "End date is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const cleantotalBudget = parseFloat(totalBudget.replace(/[^0-9.]/g, ''));
                const cleanBudgetPerView = parseFloat(budgetPerView);

                const formattedStartDate = format(adStartDate, 'yyyy-MM-dd');
                const formattedEndDate = format(adEndDate, 'yyyy-MM-dd');

                const newCampaignData = {
                    info: {
                        name: campaignName.trim(),
                        description: description.trim(),
                        caption: caption.trim(),
                        type: type,
                    },
                    filters: {
                        age: age.toString(),
                        gender: gender.toLowerCase().toString(),
                        postalCode: postalCode.trim(),
                        radius: radius.toString(),
                    },
                    budget: {
                        perViewBudget: cleanBudgetPerView,
                        totalBudget: cleantotalBudget,
                    },
                    duration: {
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                    },
                    acceptanceCriteria: {
                        minimumViews: minimumViews,
                    },
                    assets: images,
                };

                const formData = new FormData()

                formData.append("info", JSON.stringify(newCampaignData.info))
                formData.append("filters", JSON.stringify(newCampaignData.filters))
                formData.append("budget", JSON.stringify(newCampaignData.budget))
                formData.append("duration", JSON.stringify(newCampaignData.duration))
                formData.append("acceptanceCriteria", JSON.stringify(newCampaignData.acceptanceCriteria))

                images.forEach((file, index) => {
                    formData.append(`assets`, file);
                });

                const response = await CampaignService.createCampaign(formData);
                console.log("Campaign added successfully:", response);
                message.success(response?.message)
                navigate("/company/campaigns")
            } catch (error) {
                console.error("Error adding campaign:", error);
                message.error(error.response?.data?.error || "Failed to create campaign. Please try again.")

            }
        }
    };

    return (
        <>

            <div className="main_table p-5 md:p-[50px]">
                <div className="heading">
                    <img src={plan} alt="plan" />

                    <span>Add Campaign</span>
                </div>

                <div className="campaign-form">
                    <div className="w-full md:w-[60%] flex justify-between items-center mt-[50px] mb-[16px]">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>Step 1</div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>Step 2</div>
                        <div className={`step ${step === 3 ? 'active' : ''}`}>Step 3</div>
                    </div>

                    <div className="flex justify-between w-full md:w-[60%] mb-[40px] relative">
                        <div className={`z-10 w-[38px] h-[38px] rounded-full flex justify-center items-center ${step == 1 ? 'bg-[#D4EAC8]' : 'bg-[#6AB541] border-[#D4EAC8] border'}`}>
                            {step >= 2 && <img src={tick} alt="" />}
                        </div>
                        <div className={`z-10 w-[38px] h-[38px] rounded-full flex justify-center items-center ${step >= 2 ? 'bg-[#6AB541]' : 'bg-white border-[#6AB541] border'}  ${step == 2 ? 'bg-[#D4EAC8]' : ''}`}>
                            {step >= 3 && <img src={tick} alt="" />}
                        </div>
                        <div className={`z-10 w-[38px] h-[38px] rounded-full flex justify-center items-center ${step === 3 ? 'bg-[#D4EAC8]' : 'bg-white border-[#6AB541] border'}`}>
                            {step === 4 && <img src={tick} alt="" />}
                        </div>
                        <div className="border-dashed border z-0 border-[#6AB541] absolute w-[100%] top-[19px]"></div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step == 1 && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name" className="company_label">Campaign Name</label>
                                    <input
                                        id="name"
                                        className="company_input"
                                        type="text"
                                        value={campaignName}
                                        onChange={(e) => setCampaignName(e.target.value)}
                                        placeholder="Enter campaign name"
                                    />
                                    {errors.campaignName && <p className="error">{errors.campaignName}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="" className="company_label">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description"
                                        className="p-2 company_textarea"
                                    />
                                    {errors.description && <p className="error">{errors.description}</p>}
                                </div>

                                <div className="form-group relative">
                                    <label htmlFor="" className="company_label">Campaign Image or Video</label>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleImageUpload}
                                        id="upload-button"
                                        style={{ display: 'none' }}
                                    />

                                    {/* Label that displays the chosen file name */}
                                    <label htmlFor="upload-button" className="upload-btn">
                                        {images.length > 0 ? `${images.length} files selected` : 'No File uploaded'}
                                    </label>

                                    {/* Custom upload button */}
                                    <label
                                        htmlFor="upload-button"
                                        className="absolute border-[#6AB541] border flex justify-center items-center h-[40px] w-[126px] right-0 top-8 text-[#6AB541] rounded-lg font-normal cursor-pointer"
                                    >
                                        Upload
                                    </label>

                                    {errors.images && <p className="error">{errors.images}</p>}

                                    {/* Display uploaded images with remove buttons */}
                                    <div className="image-preview-container mt-4 w-full ">
                                        {images.map((img, index) => (
                                            <div key={index} className="file-name-item flex border items-center mb-2 relative h-[40px] rounded">
                                                <span className="file-name mr-2 " style={{ fontWeight: 300, fontSize: "15px" }}>
                                                    {img.name.length > 15 ? `${img.name.slice(0, 15)}...` : img.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="remove-button rounded-full absolute right-2 text-lg w-5 h-5 flex items-center justify-center"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}

                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="caption" className="company_label">Caption</label>
                                    <input
                                        id="caption"
                                        className="company_input"
                                        type="text"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="Add caption here"
                                    />

                                    {errors.caption && <p className="error">{errors.caption}</p>}
                                </div>

                                <div className="form-group ">
                                    <label htmlFor="type" className="company_label">Select Type</label>
                                    <select
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="p-2 border rounded-md company_select"
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="fixed">Fixed Amount</option>
                                        <option value="variable">Per View</option>
                                    </select>

                                    {errors.type && <p className="error">{errors.type}</p>}
                                </div>
                            </div>
                        )}

                        {step == 2 && (
                            <div>
                                <div className="flex w-full md:w-[60%] ">
                                    <div className="form-group ">
                                        <label htmlFor="age" className="company_label">Select Age</label>
                                        <select
                                            id="age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="p-2 border rounded-md company_select"
                                        >
                                            <option value="" disabled>Select Age</option>
                                            <option value="18-24">18-24</option>
                                            <option value="25-40">25-40</option>
                                            <option value="41-50">41-50</option>
                                            <option value="51+">51+</option>
                                        </select>

                                        {errors.age && <p className="error">{errors.age}</p>}
                                    </div>

                                    <div className="form-group ml-5">
                                        <label htmlFor="gender" className="company_label">Select Gender</label>
                                        <select
                                            id="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="p-2 border rounded-md company_select"
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>

                                        {errors.gender && <p className="error">{errors.gender}</p>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postalCode" className="company_label">Add Postal Code</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        placeholder="Enter Postal Code"
                                        className="p-2 border rounded-md company_input h-[40px]"
                                    />

                                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="radius" className="company_label">Select Radius</label>
                                    <select
                                        id="radius"
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        className="p-2 border rounded-md company_select"
                                    >
                                        <option value="" disabled>Select Radius</option>
                                        <option value="5km">5 km</option>
                                        <option value="10km">10 km</option>
                                        <option value="15km">15 km</option>
                                        <option value="20km">20 km</option>
                                    </select>

                                    {errors.radius && <p className="error">{errors.radius}</p>}
                                </div>
                            </div>
                        )}


                        {step == 3 && (
                            <div >
                                <div className="flex w-full md:w-[60%]">
                                    <div className="form-group">
                                        <label htmlFor="totalBudget" className="company_label">Total Budget</label>
                                        <input
                                            placeholder="Total Budget"
                                            id="totalBudget"
                                            value={totalBudget}
                                            onChange={(e) => setTotalBudget(e.target.value)}
                                            className="p-2 border rounded-md company_select"
                                        />


                                        {errors.totalBudget && <p className="error">{errors.totalBudget}</p>}
                                    </div>

                                   {type === "variable" &&  <div className="form-group ml-5">
                                        <label htmlFor="budgetPerView" className="company_label">Budget Per View</label>
                                        <input
                                            id="budgetPerView"
                                            type="text"
                                            step={.01}
                                            value={budgetPerView}
                                            onChange={(e) => setBudgetPerView(e.target.value)}
                                            placeholder="Enter Budget Per View"
                                            className="p-2 border rounded-md company_select h-[40px]"
                                        />
                                        {errors.budgetPerView && <p className="error">{errors.budgetPerView}</p>}
                                    </div>}

                                    {type !== "variable" && <div className="form-group ml-5">
                                        <label htmlFor="minimumViews" className="company_label">Minimum Views</label>
                                        <input
                                            id="minimumViews"
                                            type="text"
                                            step={.01}
                                            value={minimumViews}
                                            onChange={(e) => setMinimumViews(e.target.value)}
                                            placeholder="Minimum Views"
                                            className="p-2 border rounded-md company_select h-[40px]"
                                        />
                                        {errors.budgetPerView && <p className="error">{errors.budgetPerView}</p>}
                                    </div>}
                                </div>

                                <div className="flex w-full md:w-[60%]">
                                    <div className="form-group">
                                        <label htmlFor="setAdDuration" className="company_label">Set Ad Duration</label>
                                        <ReactDatePicker
                                            id="setAdDuration"
                                            selected={adStartDate}
                                            onChange={(date) => setAdStartDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Select Start Date"
                                            className="p-2 border rounded-md company_input h-[40px]"
                                        />

                                        {errors.adStartDate && <p className="error">{errors.adStartDate}</p>}
                                    </div>

                                    <div className="form-group ml-5">
                                        <label htmlFor="endAdDuration" className="company_label">End Ad Duration</label>
                                        <ReactDatePicker
                                            disabled={openEnd}
                                            id="endAdDuration"
                                            selected={adEndDate}
                                            onChange={(date) => setAdEndDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Select End Date"
                                            className="p-2 border rounded-md company_input h-[40px]"
                                        />

                                        {errors.adEndDate && <p className="error">{errors.adEndDate}</p>}
                                    </div>
                                </div>


                                <div className="form-group flex items-center ">
                                    <input
                                        type="checkbox"
                                        checked={openEnd}
                                        onChange={(e) => { setOpenEnd(e.target.checked); setAdEndDate(null) }}
                                        className="mr-2 cursor-pointer company_input h-[40px]"
                                    />
                                    <div>Open End</div>
                                </div>

                            </div>
                        )}

                        <div className="flex">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="proceed-btn mr-4 bg-[#6AB541] text-white w-[150px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
                                    Back
                                </button>
                            )}
                            {step < 3 && (
                                <button type="button" onClick={nextStep} className="proceed-btn bg-[#6AB541] text-white w-[150px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
                                    Proceed
                                </button>
                            )
                            }
                            {step === 3 &&
                                (
                                    <button type="submit" className="proceed-btn bg-[#6AB541] text-white w-[150px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
                                        Submit
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default AddCampaign;

