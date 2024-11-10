import React, { useEffect, useState } from 'react';
import logo from '../../../assets/images/campaign.svg'
import plan from "../../../assets/images/company.svg"
import back from "../../../assets/icons/back.svg"

const CampaignCard = ({ setSeeViewMore }) => {
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  const description = "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.  ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-[332px]  mx-auto relative">
      <span className="text-[#6AB541] bg-[#F0F8EC] text-[13px] font-bold px-[17px] py-[7px] rounded-[5px] absolute top-4 right-4">Active</span>

      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-[61px] h-[61px] rounded-full mr-[14.6px]" />

        <div>
          <h3 className="text-sm font-semibold">Campaign Name</h3>
        </div>
      </div>

      <p className="text-[13px] font-medium mt-[17px] leading-4 h-[79px]">
        {truncateText(description, 35)}
      </p>

      <div className="flex mt-[21px] text-center">
        <div className='mr-6'>
          <p className="font-semibold text-sm ">Remaining Budget</p>
          <p className="w-[117px] h-[30px] rounded-[5px] bg-[#F8F8F8] flex justify-center items-center font-normal text-[13px] mt-2">$200</p>
        </div>
        <div>
          <p className="font-semibold text-sm ">Budget Per View</p>
          <p className="w-[117px] h-[30px] rounded-[5px] bg-[#F8F8F8] flex justify-center items-center font-normal text-[13px] mt-2">$50</p>
        </div>
      </div>

      <button onClick={() => setSeeViewMore(false)} className="bg-[#6AB541] text-white font-bold w-full py-2 mt-4 mb-4 rounded-lg hover:bg-[#72c446] transition duration-300">
        View More
      </button>
    </div>
  );
};

const CampaignGrid = () => {
  const campaigns = Array(6).fill({
    description: "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
  });

  const [seeViewMore, setSeeViewMore] = useState(true)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-12-31T23:59:59"); // Set your target date here

    const countdown = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <>
      {seeViewMore ? <>
        <div className="flex mt-4 sm:mb-2">
          <img src={plan} alt="plan" className='mr-3' />

          <span>Add Campaign</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:p-4">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} description={campaign.description} setSeeViewMore={setSeeViewMore} />
          ))}
        </div>
      </> : <>
        <div className="flex mt-4 mb-4 items-center cursor-pointer" onClick={() => setSeeViewMore(true)}>
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
      </>
      }
    </>
  );
};

export default CampaignGrid;