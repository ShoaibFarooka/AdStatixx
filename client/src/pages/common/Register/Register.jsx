import { useState } from 'react';
import './Register.css';
import AuthContainer from "../../../components/AuthContainer/AuthContainer";
import Form from "./components/Form/Form";
import Choice from './components/Choice/Choice';

const Register = () => {
    const [type, setType] = useState('user');
    const [view, setView] = useState(0);

    const handleViewChange = () => {
        console.log('Type: ', type);
        if (view === 0) {
            setView(1);
        } else {
            setView(0);
        }
    };

    return (
        <div className="register">
            <AuthContainer>
                {view === 0 ?
                    <Choice type={type} setType={setType} handleViewChange={handleViewChange} />
                    :
                    <Form type={type} />
                }
            </AuthContainer>
        </div>
    );
};

export default Register;
