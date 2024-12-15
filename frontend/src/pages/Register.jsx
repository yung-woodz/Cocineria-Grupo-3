import { useNavigate } from 'react-router-dom';
import { register } from '@services/auth.service.js';
import Form from '@components/Form';
import useRegister from '@hooks/auth/useRegister.jsx';
import '@styles/form.css';

const Register = () => {
    const navigate = useNavigate();
    const {
        errorEmail,
        errorRut,
        errorData,
        handleInputChange
    } = useRegister();

    const registerSubmit = async (data) => {
        try {
            const response = await register(data);
            if (response.status === 'Success') {
                navigate('/auth');
            } else if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.error("Error al registrar un usuario: ", error);
        }
    };

    return (
        <main className="bg-white flex justify-center items-center h-screen font-montserrat">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <Form
                    title="Crea tu cuenta"
                    fields={[
                        {
                            label: "Nombre completo",
                            name: "nombreCompleto",
                            placeholder: "Diego Alexis Salazar Jara",
                            fieldType: 'input',
                            type: "text",
                            required: true,
                            minLength: 15,
                            maxLength: 50,
                            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            patternMessage: "Debe contener solo letras y espacios",
                        },
                        {
                            label: "Correo electrónico",
                            name: "email",
                            placeholder: "example@gmail.cl",
                            fieldType: 'input',
                            type: "email",
                            required: true,
                            minLength: 15,
                            maxLength: 35,
                            errorMessageData: errorEmail,
                            onChange: (e) => handleInputChange('email', e.target.value),
                            inputClassName: "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        },
                        {
                            label: "Rut",
                            name: "rut",
                            placeholder: "23.770.330-1",
                            fieldType: 'input',
                            type: "text",
                            minLength: 9,
                            maxLength: 12,
                            required: true,
                            errorMessageData: errorRut,
                            onChange: (e) => handleInputChange('rut', e.target.value),
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
                            inputClassName: "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        },
                    ]}
                    buttonText="Registrarse"
                    buttonClassName="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    onSubmit={registerSubmit}
                    footerContent={
                        <p className="mt-6 text-blue-500 text-center">
                            ¿Ya tienes cuenta?, <a href="/auth" className="hover:underline">¡Inicia sesión aquí!</a>
                        </p>
                    }
                />
            </div>
        </main>
    );
};

export default Register;
