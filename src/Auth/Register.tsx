import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./auth.css";
import { useState } from "react";
import pass from "../image/pass.png";
import showPass from "../image/show-pass.png";
import { useDispatch } from "react-redux";
import { addUser } from "../Reducer/UserSlice";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const schema = yup.object().shape({
  email: yup.string().email("некоректный email").required("Ошибка"),
  password: yup.string().required("Ошибка"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Ошибка"),
  name: yup.string().required("Ошибка"),
});

export function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(addUser(data));
    reset();
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container container-auth">
      <div className="auth">
        <h1 className="auth-title">Регистрация</h1>
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label className="auth-label" htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              className={`auth-input ${errors.name ? "error" : ""}`}
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <div className="error-message">{errors.name.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <label className="auth-label" htmlFor="email">
              Электронная почта
            </label>
            <input
              id="email"
              className={`auth-input ${errors.email ? "error" : ""}`}
              type="text"
              {...register("email")}
            />
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <label className="auth-label" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              className={`auth-input ${errors.password ? "error" : ""}`}
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <img className="pass-img" src={showPass} alt="show" />
              ) : (
                <img className="pass-img" src={pass} alt="show" />
              )}
            </span>
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <label className="auth-label" htmlFor="confirmPassword">
              Подтвердите Пароль
            </label>
            <input
              id="confirmPassword"
              className={`auth-input ${errors.confirmPassword ? "error" : ""}`}
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <span
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <img className="pass-img" src={showPass} alt="show" />
              ) : (
                <img className="pass-img" src={pass} alt="show" />
              )}
            </span>
            {errors.confirmPassword && (
              <div className="error-message">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <button className="form-btn" type="submit">
            Зарегистрироваться
          </button>
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
