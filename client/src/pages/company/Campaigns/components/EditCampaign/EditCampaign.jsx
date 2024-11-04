import { useState } from "react";
import plan from "../../../../../assets/images/company.svg"
import "../../Campaigns.css";
import tick from "../../../../../assets/icons/tick.svg"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CampaignService from "../../../../../services/CampaignService";
import { format } from 'date-fns';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';

const EditCampaign = () => {
    const selectedCampaign = useSelector((state) => state.campaign.selectedCampaign);

    const [campaignName, setCampaignName] = useState(selectedCampaign?.info?.name);
    const [description, setDescription] = useState(selectedCampaign?.info?.description);
    const [caption, setCaption] = useState(selectedCampaign?.info?.caption);
    const [step, setStep] = useState(1);
    const [age, setAge] = useState(selectedCampaign?.filter?.age);
    const [gender, setGender] = useState(selectedCampaign?.filter?.gender);
    const [postalCode, setPostalCode] = useState(selectedCampaign?.filter?.postalCode);
    const [radius, setRadius] = useState(selectedCampaign?.filter?.radius);
    const [radius2, setRadius2] = useState('');
    const [dailyBudget, setDailyBudget] = useState(selectedCampaign?.budget?.dailyBudget);
    const [budgetPerView, setBudgetPerView] = useState(selectedCampaign?.budget?.perViewBudget);
    const [adStartDate, setAdStartDate] = useState(selectedCampaign?.duration?.startDate);
    const [adEndDate, setAdEndDate] = useState(selectedCampaign?.duration?.endDate);
    const [openEnd, setOpenEnd] = useState(false);
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]); // Store multiple images
    const navigate = useNavigate()

    console.log(selectedCampaign,"selectedCampaign")

    console.log(selectedCampaign?.assets,"image test")

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
        if (!dailyBudget) newErrors.dailyBudget = "Daily budget is required";
        if (!budgetPerView) newErrors.budgetPerView = "Budget per view is required";
        if (!openEnd) {  // Only validate dates if not open-ended
            if (!adStartDate) newErrors.adStartDate = "Start date is required";
            if (!adEndDate) newErrors.adEndDate = "End date is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const cleanDailyBudget = parseFloat(dailyBudget.replace(/[^0-9.]/g, ''));
                const cleanBudgetPerView = parseFloat(budgetPerView);

                const formattedStartDate = format(adStartDate, 'yyyy-MM-dd');
                const formattedEndDate = format(adEndDate, 'yyyy-MM-dd');

                const newCampaignData = {
                    info: {
                        name: campaignName.trim(),
                        description: description.trim(),
                        caption: caption.trim(),
                        type: "fixed",
                    },
                    filters: {
                        age: age.toString(),
                        gender: gender.toLowerCase().toString(),
                        postalCode: postalCode.trim(),
                        radius: radius.toString(),
                    },
                    budget: {
                        daliyBudget: cleanDailyBudget,
                        perViewBudget: cleanBudgetPerView,
                        totalBudget: cleanDailyBudget * 30,
                    },
                    duration: {
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                    },
                    acceptanceCriteria: {
                        minimumViews: 500,
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
                navigate("/company/campaigns")
            } catch (error) {
                console.error("Error adding campaign:", error);
                setErrors({
                    submit: error.response?.data?.message || "Failed to create campaign. Please try again."
                });
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
                                    <label className="company_label">Campaign Name</label>
                                    <input
                                        className="company_input"
                                        type="text"
                                        value={campaignName}
                                        onChange={(e) => setCampaignName(e.target.value)}
                                        placeholder="Enter campaign name"
                                    />
                                    {errors.campaignName && <p className="error">{errors.campaignName}</p>}
                                </div>

                                <div className="form-group">
                                    <label className="company_label">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description"
                                        className="p-2 company_textarea"
                                    />
                                    {errors.description && <p className="error">{errors.description}</p>}
                                </div>

                                <div className="form-group relative">
                                    <label className="company_label">Campaign Image or Video</label>

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
                                        {images.length > 0 ? `${images.length} files selected` : 'image.png'}
                                    </label>

                                    {/* Custom upload button */}
                                    <label
                                        htmlFor="upload-button"
                                        className="absolute border-[#6AB541] border flex justify-center items-center h-[40px] w-[126px] right-0 top-8 text-[#6AB541] rounded-lg font-normal cursor-pointer"
                                    >
                                        Upload
                                    </label>

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
                                    <label className="company_label">Caption</label>
                                    <input
                                        className="company_input"
                                        type="text"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="Add caption here"
                                    />

                                    {errors.caption && <p className="error">{errors.caption}</p>}
                                </div>
                            </div>
                        )}

                        {step == 2 && (
                            <div>
                                <div className="flex w-full md:w-[60%] ">
                                    <div className="form-group ">
                                        <label className="company_label">Select Age</label>
                                        <select
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="p-2 border rounded-md company_select"
                                        >
                                            <option value="">Select Age</option>
                                            <option value="20-34">20-34</option>
                                            <option value="35-50">35-50</option>
                                            <option value="51+">51+</option>
                                        </select>

                                        {errors.age && <p className="error">{errors.age}</p>}
                                    </div>

                                    <div className="form-group ml-5">
                                        <label className="company_label">Select Gender</label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="p-2 border rounded-md company_select"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>

                                        {errors.gender && <p className="error">{errors.gender}</p>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="company_label">Add Postal Code</label>
                                    <input
                                        type="number"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        placeholder="Enter Postal Code"
                                        className="p-2 border rounded-md company_input h-[40px]"
                                    />

                                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                </div>

                                <div className="form-group">
                                    <label className="company_label">Select Radius</label>
                                    <select
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        className="p-2 border rounded-md company_select"
                                    >
                                        <option value="">Select Radius</option>
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
                                        <label className="company_label">Select Daily Budget</label>
                                        <select
                                            value={dailyBudget}
                                            onChange={(e) => setDailyBudget(e.target.value)}
                                            className="p-2 border rounded-md company_select"
                                        >
                                            <option value="">Select Daily Budget</option>
                                            <option value="100$">100$</option>
                                            <option value="200$">200$</option>
                                            <option value="300$">300$</option>
                                        </select>
                                        {errors.dailyBudget && <p className="error">{errors.dailyBudget}</p>}
                                    </div>

                                    <div className="form-group ml-5">
                                        <label className="company_label">Budget Per View</label>
                                        <input
                                            type="number"
                                            step={.01}
                                            value={budgetPerView}
                                            onChange={(e) => setBudgetPerView(e.target.value)}
                                            placeholder="Enter Budget Per View"
                                            className="p-2 border rounded-md company_select h-[40px]"
                                        />
                                        {errors.budgetPerView && <p className="error">{errors.budgetPerView}</p>}
                                    </div>
                                </div>

                                <div className="flex w-full md:w-[60%]">
                                    <div className="form-group">
                                        <label className="company_label">Set Ad Duration</label>
                                        <ReactDatePicker
                                            selected={adStartDate}
                                            onChange={(date) => setAdStartDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Select Start Date"
                                            className="p-2 border rounded-md company_input h-[40px]"
                                        />

                                        {errors.adStartDate && <p className="error">{errors.adStartDate}</p>}
                                    </div>

                                    <div className="form-group ml-5">
                                        <label className="company_label">End Ad Duration</label>
                                        <ReactDatePicker
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
                                        onChange={(e) => setOpenEnd(e.target.checked)}
                                        className="mr-2 cursor-pointer company_input h-[40px]"
                                    />
                                    <div>Open End</div>
                                </div>

                                {/* Select Radius */}
                                <div className="form-group">
                                    <label className="company_label">Select Radius</label>
                                    <select
                                        value={radius2}
                                        onChange={(e) => setRadius2(e.target.value)}
                                        className="p-2 border rounded-md company_input h-[40px] w-full"
                                    >
                                        <option value="">Select Radius</option>
                                        <option value="5km">5 km</option>
                                        <option value="10km">10 km</option>
                                        <option value="15km">15 km</option>
                                        <option value="20km">20 km</option>
                                    </select>

                                    {errors.radius2 && <p className="error">{errors.radius2}</p>}
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

export default EditCampaign;

