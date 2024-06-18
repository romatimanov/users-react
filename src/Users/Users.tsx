import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./users.css";
import { Card } from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { fetchAnsfer, fetchModule } from "../Module/Module";
import arrow from "../image/arrow.png";

const fetchUsers = () => fetchModule("https://reqres.in/api/users");

export type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export function Users() {
  const [visibleUsers, setVisibleUsers] = useState(4);
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const navigate = useNavigate();

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  const handleCardClick = (userId: number) => {
    console.log(userId);
    navigate(`/users/${userId}`);
  };

  const handleShowMore = () => {
    setVisibleUsers((prev) => prev + 4);
  };

  return (
    <div className="container">
      <div className="users-main">
        <div className="users-content">
          {users.data.slice(0, visibleUsers).map((user: UserType) => (
            <Card
              key={user.id}
              data={user}
              onClick={() => handleCardClick(user.id)}
            />
          ))}
        </div>
        {visibleUsers < users.data.length && (
          <button onClick={handleShowMore} className="show-more__button">
            <span className="show-more__text"> Показать ещё</span>
            <img src={arrow} alt="arrow" />
          </button>
        )}
      </div>
    </div>
  );
}
