import React, { useState } from 'react';
import { FiEye } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import plan from '../../../assets/images/company.svg'; // replace with actual path
import logo from '../../../assets/images/campaign.svg'
import back from "../../../assets/icons/back.svg"

const MyCampaigns = () => {
  const navigate = useNavigate();
  const [showCompanyStatus, setShowCompanyStatus] = useState(true);
  const campaigns = [
    {
      _id: '1',
      status: 'active',
      info: { name: 'Campaign A' },
      budget: { totalBudget: 500 },
      duration: { startDate: '2024-11-01', endDate: '2024-11-30' },
      acceptanceCriteria: { minimumViews: 1000 },
    },
    {
      _id: '2',
      status: 'inactive',
      info: { name: 'Campaign B' },
      budget: { totalBudget: 300 },
      duration: { startDate: '2024-12-01', endDate: '2024-12-31' },
      acceptanceCriteria: { minimumViews: 800 },
    },
  ];

  const handleEditClick = (campaign) => {
    console.log(`Editing campaign:`, campaign);
  };



  return (
    <div>

      {showCompanyStatus ? <div className="campaigns">
        <div
          onClick={() => navigate("/company/campaigns/add-campaign")}
          className="bg-[#6AB541] text-white w-[180px] sm:w-[234px] h-[50px] rounded-[10px] flex justify-center items-center mb-6 cursor-pointer"
        >
          Create Campaign +
        </div>

        <div className="main_table">
          <div className="heading flex items-center space-x-2">
            <img src={plan} alt="Plan icon" />
            <span>Campaigns</span>
          </div>

          <div className="campaign-table">
            <table className="table">
              <thead>
                <tr className="campaign_tr">
                  <th className="campaign_th">Campaign Name</th>
                  <th className="campaign_th">Earning</th>
                  <th className="campaign_th">Time Left</th>
                  <th className="campaign_th">Views</th>
                  <th className="campaign_th">Impression</th>
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
                    <tr className="campaign_tr" key={campaign._id || index}>

                      <td className="campaign_td">{campaign.info.name}</td>
                      <td className="campaign_td">{campaign.budget.totalBudget}$</td>
                      <td className="campaign_td">
                        {campaign.duration.startDate} - {campaign.duration.endDate}
                      </td>
                      <td className="campaign_td">{campaign.acceptanceCriteria.minimumViews}</td>
                      <td className="campaign_td">{campaign.acceptanceCriteria.minimumViews}</td>
                      <td className="campaign_td flex space-x-2 justify-center p-1 cursor-pointer items-center">
                        <button className="edit-btn" onClick={() => setShowCompanyStatus(false)}>
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div> :
        <div>
          <CompanyState setShowCompanyStatus={setShowCompanyStatus} />
        </div>
      }
    </div>
  );
};

export default MyCampaigns;


const CompanyState = ({ setShowCompanyStatus }) => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  return (
    <div>
      <div className="flex mt-4 mb-4 items-center cursor-pointer" onClick={() => setShowCompanyStatus(true)}>
        <img src={back} alt="back" className='mr-3' />

        <span className='text-xl font-bold'>Back</span>
      </div>

      <div className='pt-[61px] pl-[48px] pr-[36px] pb-[48px] bg-white rounded-2xl relative'>

        <span className="text-[#6AB541] bg-[#F0F8EC] text-[13px] font-bold px-[17px] py-[7px] rounded-[5px] absolute top-8 right-10">Active</span>

        <div className='flex relative'>
          <div>
            <img src={logo} alt="back" className='mr-9 w-[141px] h-[141px] rounded-full' />
          </div>

          <div className='max-w-[824px]'>
            <span className=' font-bold text-xl'>Campaign Name</span>

            <p className='pt-6'>Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Rorem ipsum dolor sit amet.</p>


            <div className="flex mt-[21px] text-center">
              <div className='mr-6'>
                <p className="font-semibold text-sm ">Remaining Budget</p>
                <p className="w-[117px] h-[30px] rounded-[5px] bg-[#F8F8F8] flex justify-center items-center font-normal text-[13px] mt-2">$200</p>
              </div>
              <div>
                <p className="font-semibold text-sm mr-6">Budget Per View</p>
                <p className="w-[117px] h-[30px] rounded-[5px] bg-[#F8F8F8] flex justify-center items-center font-normal text-[13px] mt-2">$50</p>
              </div>

              <div className='mr-6'>
                <p className="font-semibold text-sm ">Remaining Budget</p>
                <p className="w-[117px] h-[30px] rounded-[5px] bg-[#F8F8F8] flex justify-center items-center font-normal text-[13px] mt-2">$200</p>
              </div>
              <div>
                <p className="font-semibold text-sm ">Budget Per View</p>
                <p className="w-[117px] h-[30px] rounded-[5px] bg-[#F8F8F8] flex justify-center items-center font-normal text-[13px] mt-2">$50</p>
              </div>
            </div>

            <div className='flex mt-7'>
              <button className='bg-[#6AB541] py-[18px] w-[235px] rounded-[10px] text-white font-bold mr-5'>
                Accept Campaign
              </button>

              <button className='border border-[#6AB541] text-[#6AB541] py-[18px] w-[235px] rounded-[10px]'>
                Download Assets
              </button>
            </div>

            <div className="flex flex-col items-center space-y-2 absolute right-0 bottom-2">
              <div className="flex space-x-8 text-gray-600 text-sm font-bold">
                <span>Days</span>
                <span>Hours</span>
                <span>Minutes</span>
              </div>
              <div className="flex space-x-4 text-gray-400 text-3xl font-semibold">
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}