import { useNavigate } from 'react-router-dom';
import { login } from '@services/auth.service.js';
import Form from '@components/Form';
import useLogin from '@hooks/auth/useLogin.jsx';
import '@styles/form.css';

const Login = () => {
    const navigate = useNavigate();
    const {
        errorEmail,
        errorPassword,
        errorData,
        handleInputChange
    } = useLogin();

    const loginSubmit = async (data) => {
        try {
            const response = await login(data);
            if (response.status === 'Success') {
                navigate('/home');
            } else if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="bg-white flex justify-center items-center h-screen font-montserrat">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <Form
                    title="Iniciar sesión"
                    fields={[
                        {
                            label: "Correo electrónico",
                            name: "email",
                            placeholder: "example@gmail.cl",
                            fieldType: 'input',
                            type: "email",
                            required: true,
                            minLength: 15,
                            maxLength: 30,
                            errorMessageData: errorEmail,
                            onChange: (e) => handleInputChange('email', e.target.value),
                            inputClassName: "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        },
                        {
                            label: "Contraseña",
                            name: "password",
                            placeholder: "**********",
                            fieldType: 'input',
                            type: "password",
                            required: true,
                            minLength: 8,
                            maxLength: 26,
                            pattern: /^[a-zA-Z0-9]+$/,
                            patternMessage: "Debe contener solo letras y números",
                            errorMessageData: errorPassword,
                            onChange: (e) => handleInputChange('password', e.target.value),
                            inputClassName: "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        },
                    ]}
                    buttonText="Iniciar sesión"
                    buttonClassName="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    onSubmit={loginSubmit}
                    footerContent={
                        <p className="mt-6 text-blue-500 text-center">
                            ¿No tienes cuenta?, <a href="/register" className="hover:underline">¡Regístrate aquí!</a>
                        </p>
                    }
                />
            </div>
        </main>
    );
};

export default Login;
