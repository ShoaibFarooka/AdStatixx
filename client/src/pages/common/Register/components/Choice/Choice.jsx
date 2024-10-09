import '../../../../../styles/authForm.css';
import UserIcon from '../../../../../assets/icons/user.svg?react';
import CompanyIcon from '../../../../../assets/icons/company.svg?react';
import { Link } from 'react-router-dom';

const Choice = ({ type, setType, handleViewChange }) => {

    const handleChange = (value) => {
        if (value !== type) {
            setType(value);
        }
    };

    return (
        <div className="auth-form">
            <div className="title">Create your Account</div>
            <div className="description">Select your preferred account type:</div>
            <div className='input-form'>
                <div className='input-section'>
                    <div
                        className={`choice-option-container ${type === 'user' ? 'container-border-green' : ''}`}
                        onClick={() => handleChange('user')}
                    >
                        <div className='choice-option-sub-container'>
                            <div className='choice-option-icon-container'>
                                <UserIcon />
                            </div>
                            <div className='choice-option-name'>User</div>
                        </div>
                        <input
                            type='radio'
                            name='user'
                            id='user'
                            className={`choice-radio`}
                            value='user'
                            checked={type === 'user'}
                            readOnly
                        // onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div
                        className={`choice-option-container ${type === 'company' ? 'container-border-green' : ''}`}
                        onClick={() => handleChange('company')}
                    >
                        <div className='choice-option-sub-container'>
                            <div className='choice-option-icon-container'>
                                <CompanyIcon />
                            </div>
                            <div className='choice-option-name'>Company</div>
                        </div>
                        <input
                            type='radio'
                            name='company'
                            id='company'
                            className={`choice-radio`}
                            value='company'
                            checked={type === 'company'}
                            readOnly
                        // onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                </div>
                <button className='btn' onClick={handleViewChange}>Proceed</button>
            </div>
            <div className='navigation'>
                <div>Already have an account?</div>
                <Link to='/login' className='nav-link'>Log in here</Link>
            </div>
        </div>
    )
};

export default Choice;