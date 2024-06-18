import "./card.css";
import favorite from "../image/favorite.svg";
import favoriteActive from "../image/favoriteActive.png";
import { UserType } from "../Users/Users";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavorite } from "../Reducer/FavoriteSlice";

type Props = {
  data: UserType;
  onClick: () => void;
};

export function Card({ data, onClick }: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isFavorite = favorites.includes(data.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(data.id));
  };

  return (
    <article className="card" onClick={onClick}>
      <div className="card-avatar">
        <img className="card-img" src={data.avatar} alt="avatar" />
      </div>
      <h2 className="card-title">
        {data.first_name} {data.last_name}
      </h2>
      <div className="card-favorite">
        <button className="card-btn" onClick={handleFavoriteClick}>
          <img src={isFavorite ? favoriteActive : favorite} alt="favorite" />
        </button>
      </div>
    </article>
  );
}
