import { useState } from "react";
import plan from "../../../../assets/images/company.svg"
import "../Campaigns.css"
import tick from "../../../../assets/icons/tick.svg"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCampaign = () => {
    const [campaignName, setCampaignName] = useState('');
    const [description, setDescription] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [step, setStep] = useState(1);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [radius, setRadius] = useState('');
    const [dailyBudget, setDailyBudget] = useState('');
    const [budgetPerView, setBudgetPerView] = useState('');
    const [adStartDate, setAdStartDate] = useState(null);
    const [adEndDate, setAdEndDate] = useState(null);
    const [openEnd, setOpenEnd] = useState(false);

    const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
    const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ campaignName, description, caption, image, dailyBudget, budgetPerView, adStartDate, adEndDate, openEnd, radius });
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
                        <div className={`z-10 w-[38px] h-[38px] rounded-full flex justify-center items-center ${step >= 1 ? 'bg-[#6AB541]' : 'bg-white border-[#6AB541] border'}`}>
                            {step >= 1 && <img src={tick} alt="" />}
                        </div>
                        <div className={`z-10 w-[38px] h-[38px] rounded-full flex justify-center items-center ${step == 3 ? 'bg-[#6AB541]' : 'bg-white border-[#6AB541] border'}  ${step == 2 ? 'bg-[#D4EAC8]' : ''}`}>
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
                                        className="p-2"
                                    />
                                </div>

                                <div className="form-group relative">
                                    <label>Campaign Image or Video</label>
                                    <input type="file" multiple onChange={handleImageUpload} id="upload-button" />
                                    <label htmlFor="upload-button" className="upload-btn ">
                                        {image ? image.name : 'image.png'}
                                    </label>

                                    <span className="absolute border-[#6AB541] border flex justify-center items-center h-[60px] w-[126px] right-0 top-8 text-[#6AB541] rounded-lg font-normal">Upload</span>
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
                            </div>
                        )}

                        {step == 2 && (
                            <div>
                                {/* Displaying New Fields as per the Image */}
                                <div className="flex w-full md:w-[60%] ">
                                    <div className="form-group ">
                                        <label>Select Age</label>
                                        <select
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="">Select Age</option>
                                            <option value="20-34">20-34</option>
                                            <option value="35-50">35-50</option>
                                            <option value="51+">51+</option>
                                        </select>
                                    </div>

                                    <div className="form-group ml-5">
                                        <label>Select Gender</label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Add Postal Code</label>
                                    <input
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        placeholder="Enter Postal Code"
                                        className="p-2 border rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Select Radius</label>
                                    <select
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        className="p-2 border rounded-md"
                                    >
                                        <option value="">Select Radius</option>
                                        <option value="5km">5 km</option>
                                        <option value="10km">10 km</option>
                                        <option value="15km">15 km</option>
                                        <option value="20km">20 km</option>
                                    </select>
                                </div>
                            </div>
                        )}


                        {step == 3 && (
                            <div >
                                <div className="flex w-full md:w-[60%]">
                                    <div className="form-group">
                                        <label>Select Daily Budget</label>
                                        <select
                                            value={dailyBudget}
                                            onChange={(e) => setDailyBudget(e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="">Select Daily Budget</option>
                                            <option value="100$">100$</option>
                                            <option value="200$">200$</option>
                                            <option value="300$">300$</option>
                                        </select>
                                    </div>

                                    <div className="form-group ml-5">
                                        <label>Budget Per View</label>
                                        <input
                                            type="text"
                                            value={budgetPerView}
                                            onChange={(e) => setBudgetPerView(e.target.value)}
                                            placeholder="Enter Budget Per View"
                                            className="p-2 border rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full md:w-[60%]">
                                    <div className="form-group">
                                        <label>Set Ad Duration</label>
                                        <ReactDatePicker
                                            selected={adStartDate}
                                            onChange={(date) => setAdStartDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Select Start Date"
                                            className="p-2 border rounded-md"
                                        />
                                    </div>

                                    <div className="form-group ml-5">
                                        <label>End Ad Duration</label>
                                        <ReactDatePicker
                                            selected={adEndDate}
                                            onChange={(date) => setAdEndDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Select End Date"
                                            className="p-2 border rounded-md"
                                        />
                                    </div>
                                </div>


                                <div className="form-group flex items-center ">
                                    <input
                                        type="checkbox"
                                        checked={openEnd}
                                        onChange={(e) => setOpenEnd(e.target.checked)}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <div>Open End</div>
                                </div>

                                {/* Select Radius */}
                                <div className="form-group">
                                    <label>Select Radius</label>
                                    <select
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        className="p-2 border rounded-md"
                                    >
                                        <option value="">Select Radius</option>
                                        <option value="5km">5 km</option>
                                        <option value="10km">10 km</option>
                                        <option value="15km">15 km</option>
                                        <option value="20km">20 km</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="flex">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="proceed-btn mr-4 bg-[#6AB541] text-white w-[150px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
                                    Back
                                </button>
                            )}
                            {step < 3 ? (
                                <button type="button" onClick={nextStep} className="proceed-btn bg-[#6AB541] text-white w-[150px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
                                    Proceed
                                </button>
                            ) : (
                                <button type="submit" className="proceed-btn bg-[#6AB541] text-white w-[150px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer">
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default AddCampaign;

