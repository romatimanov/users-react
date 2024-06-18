import { useQuery } from "react-query";
import "./user.css";
import { useParams } from "react-router-dom";
import { fetchAnsfer, fetchModule } from "../Module/Module";
import { useUser } from "../UserContext";
import { useEffect } from "react";
import tel from "../image/tel.png";
import mail from "../image/mail.png";

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

  return (
    <div className="container">
      <div className="user-content">
        <div className="user-info">
          <p className="user-info__text">
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.
          </p>
          <p className="user-info__text">
            В работе с клиентами недостаточно просто решить конкретную проблему
            или помочь справиться с трудностями. Не менее важно уделять внимание
            обмену знаниями: "Один из самых позитивных моментов — это осознание
            того, что ты помог клиенту перейти на совершенно новый уровень
            компетентности, уверенность в том, что после окончания проекта у
            клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно".
          </p>
          <p className="user-info__text">
            Помимо разнообразных проектов для клиентов финансового сектора,
            Сорин ведет активную предпринимательскую деятельность. Он является
            совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </p>
        </div>
        <div className="user-contact">
          <a className="user-contact__link" href="tel:+79543334455">
            <img src={tel} alt="tel" />
            <span>+7 (954) 333-44-55</span>
          </a>
          <a className="user-contact__link" href="mailto:sykfafkar@gmail.com">
            <img src={mail} alt="mail" />
            <span>sykfafkar@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
