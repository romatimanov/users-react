import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./register.css";
import { useState } from "react";
import pass from "../image/pass.png";
import showPass from "../image/show-pass.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("некоректный email").required("Ошибка"),
  password: yup.string().required("Ошибка"),
});

export function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);
  console.log(users);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      console.log("Вход выполнен успешно!");
      reset();
      const token = generateToken();
      localStorage.setItem("token", token);
      navigate("/users");
    } else {
      console.log("Неверное имя пользователя или пароль.");
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth">
      <h1 className="auth-title">Логин</h1>
      <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
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
          <span className="toggle-password" onClick={togglePasswordVisibility}>
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
        <button className="form-btn" type="submit">
          Войти
        </button>
        <button className="auth-btn" onClick={() => navigate("/")}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
