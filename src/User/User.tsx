import { useQuery } from "react-query";
import "./user.css";
import { useParams } from "react-router-dom";
import { fetchAnsfer, fetchModule } from "../Module/Module";
import { useUser } from "../UserContext";
import { useEffect } from "react";

const fetchUserById = (userId: number) =>
  fetchModule(`https://reqres.in/api/users/${userId}`);

export type User = {
  data: { avatar: string; first_name: string; last_name: string };
};

export function User() {
  const { id } = useParams();
  const { setUser } = useUser();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["user", id], () => fetchUserById(Number(id)));

  useEffect(() => {
    setUser(userData);
  }, [userData, setUser]);

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  const { data } = userData;

  return (
    <div className="user">
      <div className="user-avatar">
        <img className="user-img" src={data.avatar} alt="avatar" />
      </div>
      <div className="user-text__group">
        <h2 className="user-title">
          {data.first_name} {data.last_name}
        </h2>
        <p className="user-text">Партнер</p>
      </div>
    </div>
  );
}
