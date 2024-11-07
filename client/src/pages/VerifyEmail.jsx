import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contex/AuthContext"; // Importamos el contexto de autenticación
import { useState } from "react";
import { set } from "mongoose";

const VerifyEmail = () => {
    const { sendEmailResetPassword, errors } = useAuth(); // Usamos la función de login desde el contexto
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm(); // Para manejar el formulario
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            
            setLoading(true);
            const res = await sendEmailResetPassword(data.email); // Enviamos los datos al login del contexto
            setLoading(false);
            if(res.message) {
                navigate("/recuperar-contraseña/verificar-codigo");
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Recuperar contraseña</h2>

              

                {/* Mostrar errores del servidor */}
                {errors.length > 0 && (
                    <div className="bg-red-500 bg-rose-300 text-black text-center p-2 rounded mb-4">
                        {errors[0]}
                    </div>
                )}

                {/* Formulario de Login */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                        />
                        {formErrors.email && <span className="text-red-500 text-sm">El correo es requerido</span>}
                    </div>

               

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Verificar correo"}
                    </button>
                </form>

          
            </div>
        </div>
    );
};

export default VerifyEmail;