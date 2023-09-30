import { Link } from "react-router-dom";
import { NavMenu } from "../components/navigation/NavMenu";
import { SideList } from "../components/sideList/SideList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeSearchTerm } from "../store";
import { useAuth } from "../store/auth/useAuth";
import { useEffect } from "react";
import { updateStateHistory } from "../store/history/action/historyAction";
import { PageContent } from "../components/pageWrappContent/PageWrappContent";
import { HistoryContent } from "../components/historyContent/HistoryContent";

export const HistoryPage = () => {
  const { isAuth } = useAuth();
  const history = useAppSelector((state) => state.history.history);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateStateHistory());
  }, [isAuth]);

  console.log("history", history);
  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <NavMenu />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <div>
          <SideList />
        </div>
        <PageContent title={"History"}>
          {history.length ? (
            <ul className="w-full">
              {history.map((el) => (
                <HistoryContent link={el} />
              ))}
            </ul>
          ) : (
            "Нет истории"
          )}
        </PageContent>
      </div>
    </div>
  );
};