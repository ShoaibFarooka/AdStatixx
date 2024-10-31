import React, { useState } from 'react';
import AuthContainer from '../../../components/AuthContainer/AuthContainer';
import lock from '../../../assets/images/lock.svg'
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate()
    const handleOtpChange = (value, index) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = () => {
        const otpCode = otp.join('');
        console.log("Entered OTP:", otpCode);
        navigate("/login")
    };

    return (
        <AuthContainer >

            <div className="flex justify-center items-center">
                <div className="auth-form mt-20">

                    <div className='flex justify-center mb-[14px]'>
                        <img src={lock} alt="lock" />
                    </div>

                    <div className="title">Reset Password</div>
                    <p className="text-gray-500 mb-10">We sent you a code at <span className="text-green-500">johndoe@gmail.com</span></p>

                    <div className="flex space-x-3 mb-10">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                className="w-12 h-12 text-center text-2xl border rounded-[20px] focus:outline-none focus:border-green-500"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleVerify}
                        className="bg-[#6AB541] w-full h-[50px] rounded-[10px]"
                    >
                        Verify
                    </button>

                    <div className="mt-4">
                        <a href="/login" className="">← Back to Sign In</a>
                    </div>
                </div>
            </div>

        </AuthContainer>
    );
};

export default Verify;
