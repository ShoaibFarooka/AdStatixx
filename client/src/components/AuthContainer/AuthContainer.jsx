import './AuthContainer.css';
import IllustrationIcon from '../../assets/icons/illustration.svg?react';

const AuthContainer = ({ children }) => {
    return (
        <div className="auth-container">
            <div className="container" id="container-1">
                <IllustrationIcon />
            </div>
            <div className="container" id="container-2">
                {children}
            </div>
        </div>
    );
};

export default AuthContainer;
