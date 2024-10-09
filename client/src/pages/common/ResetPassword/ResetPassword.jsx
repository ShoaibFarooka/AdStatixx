import './ResetPassword.css';
import AuthContainer from '../../../components/AuthContainer/AuthContainer';
import Form from './components/Form/Form';

const ResetPassword = () => {
    return (
        <div className="reset-password">
            <AuthContainer>
                <Form />
            </AuthContainer>
        </div>
    )
};

export default ResetPassword;
