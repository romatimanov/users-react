import { useUser } from "../UserContext";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import exit from "../image/exit.png";
import arrowBack from "../image/arrow-back.png";
import { useEffect, useState } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const handleGoBack = () => {
    navigate("/users");
  };

  const showBackButton = !location.pathname.startsWith("/users/");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 798);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 798);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="container">
        <div
          className={
            showBackButton
              ? "header-content header-users"
              : "header-content header-user"
          }
        >
          {!showBackButton &&
            (isMobile ? (
              <img
                className="header-img"
                src={arrowBack}
                alt="Назад"
                onClick={handleGoBack}
              />
            ) : (
              <button className="header-btn" onClick={handleGoBack}>
                Назад
              </button>
            ))}
          {isMobile ? (
            <img
              className="header-img"
              src={exit}
              alt="Выход"
              onClick={handleLogout}
            />
          ) : (
            <button className="header-btn" onClick={() => handleLogout()}>
              Выйти
            </button>
          )}
        </div>
      </div>
      <div className="container">
        {showBackButton ? (
          <>
            <h1 className="header-title">Наша команда</h1>
            <p className="header-text">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.
            </p>
          </>
        ) : (
          user && (
            <div className="user">
              <div className="user-avatar">
                <img className="user-img" src={user.data.avatar} alt="avatar" />
              </div>
              <div className="user-text__group">
                <h2 className="user-title">
                  {user.data.first_name} {user.data.last_name}
                </h2>
                <p className="user-text">Партнер</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
