import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '@styles/form.css';
import HideIcon from '../assets/HideIcon.svg';
import ViewIcon from '../assets/ViewIcon.svg';

const Form = ({ title, fields, buttonText, onSubmit, footerContent, backgroundColor = "white" }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form
            className="form bg-white text-black p-8"
            style={{ backgroundColor: backgroundColor }}
            onSubmit={handleSubmit(onFormSubmit)}
            autoComplete="off"
        >
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {fields.map((field, index) => (
                <div className="container_inputs mb-4" key={index}>
                    {field.label && <label className="block text-sm font-semibold mb-1" htmlFor={field.name}>{field.label}</label>}
                    {field.fieldType === 'input' && (
                        <input
                            {...register(field.name, {
                                required: field.required ? 'Este campo es obligatorio' : false,
                                minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : false,
                                maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : false,
                                pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : false,
                                validate: field.validate || {},
                            })}
                            name={field.name}
                            placeholder={field.placeholder}
                            type={field.type === 'password' && field.name === 'password' ? (showPassword ? 'text' : 'password') :
                                field.type === 'password' && field.name === 'newPassword' ? (showNewPassword ? 'text' : 'password') :
                                field.type}
                            defaultValue={field.defaultValue || ''}
                            disabled={field.disabled}
                            onChange={field.onChange}
                            className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                    {field.type === 'password' && field.name === 'password' && (
                        <span className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            <img src={showPassword ? ViewIcon : HideIcon} alt="Toggle Password" />
                        </span>
                    )}
                    {field.type === 'password' && field.name === 'newPassword' && (
                        <span className="toggle-password-icon" onClick={toggleNewPasswordVisibility}>
                            <img src={showNewPassword ? ViewIcon : HideIcon} alt="Toggle Password" />
                        </span>
                    )}
                    <div className={`error-message ${errors[field.name] || field.errorMessageData ? 'visible' : ''}`}>
                        {errors[field.name]?.message || field.errorMessageData || ''}
                    </div>
                </div>
            ))}
            {buttonText && <button type="submit" className="bg-black text-white font-semibold rounded-md py-2 px-4 w-full hover:bg-gray-800">{buttonText}</button>}
            {footerContent && <div className="footerContent mt-4 text-center text-black">{footerContent}</div>}
        </form>
    );
};

export default Form;
