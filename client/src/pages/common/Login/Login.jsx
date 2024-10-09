import './Login.css';
import AuthContainer from "../../../components/AuthContainer/AuthContainer";
import Form from "./components/Form/Form";

const Login = () => {
    return (
        <div className="login">
            <AuthContainer>
                <Form />
            </AuthContainer>
        </div>
    );
};

export default Login;
