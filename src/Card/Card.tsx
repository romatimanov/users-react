import "./card.css";
import favorite from "../image/favorite.svg";
import { User } from "../Users/Users";

type Props = {
  data: User;
  onClick: () => void;
};

export function Card({ data, onClick }: Props) {
  return (
    <article className="card" onClick={onClick}>
      <div className="card-avatar">
        <img className="card-img" src={data.avatar} alt="avatar" />
      </div>
      <h2 className="card-title">
        {data.first_name} {data.last_name}
      </h2>
      <div className="card-favorite">
        <button className="card-btn">
          <img src={favorite} alt="favorite" />
        </button>
      </div>
    </article>
  );
}
