import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { NavMenu } from "../components/navigation/NavMenu";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { useAuth } from "../store/auth/useAuth";
import classNames from "classnames";
import {
  addToFavorites,
  removeFromFavorites,
  toggleFavorites,
} from "../store/favorites/actions/favorite.actions";
import { database } from "../firebase.config";
import { SideList } from "../components/sideList/SideList";
import { Button } from "../components/button/Button";

export const WatchPage = () => {
  const { id } = useParams();
  const favoriteFlag = useAppSelector((state) =>
    state.favorites.favorites.map((el) => el.id).includes(id)
  );
  const currentPlaying = useAppSelector(
    (state) => state.mainApp.currentPlaying
  );
  const testData = useAppSelector((state) =>
    state.mainApp.currentPlaying
      ? {
          id: state.mainApp.currentPlaying.videoId,
          title: state.mainApp.currentPlaying.title,
          description: state.mainApp.currentPlaying.description,
        }
      : {}
  );
  const [favoriteStateFlag, setFavoriteStateFlag] =
    useState<boolean>(favoriteFlag);
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(favoriteFlag);

  const { isAuth, uid, email } = useAuth();

  const favoriteButtonTitle = favoriteFlag
    ? "Убрать из избранного"
    : "Добавить в избранное";

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  const handleFavoritesClick = () => {
    if (isAuth) {
      dispatch(toggleFavorites(testData));
      setFavoriteStateFlag(favoriteFlag);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      {currentPlaying && (
        <div className="max-h-screen overflow-hidden">
          <div style={{ height: "7.5vh" }}>
            <NavMenu />
          </div>

          <div className="flex w-full" style={{ height: "92.5vh" }}>
            <div>
              <SideList />
            </div>
            <div className="flex gap-y-10 gap-x-5 p-7 mx-20 mr-0 w-full overflow-auto">
              <div style={{ maxWidth: "800px" }}>
                <div>
                  <iframe
                    width="800"
                    height="502"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                  <div className="mt-5">
                    <p className="text-xl">{currentPlaying.title}</p>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-gray-400">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.views} views
                        </span>
                        <span> {currentPlaying.age} ago</span>
                      </div>
                      <div className="flex items-center gap-4 uppercase">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="text-xl" />
                          <strong>{currentPlaying.likes}</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiDislike className="text-xl" />
                          <strong>dislike</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <FaShare className="text-xl" />
                          <strong>share</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <HiScissors className="text-xl" />
                          <strong>clip</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <MdOutlinePlaylistAdd className="text-xl" />
                          <strong>save</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                      <div className="flex items-center gap-5 mr-5 mt-4">
                        <div>
                          <img
                            src={currentPlaying.channelInfo.image}
                            alt=""
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div className="w-5/6">
                          <h5 className="text-sm">
                            <strong>{currentPlaying.channelInfo.name}</strong>
                          </h5>
                          <h6 className="text-gray-400 text-xs">
                            {currentPlaying.channelInfo.subscribers} subscribers
                          </h6>
                        </div>
                        <div>
                          <button
                            onClick={handleFavoritesClick}
                            className={classNames(
                              "uppercase",
                              {
                                "bg-red-600": favoriteFlag,
                                "bg-green-600": !favoriteFlag,
                              },
                              "rounded-sm p-2 text-sm tracking-wider"
                            )}>
                            {favoriteButtonTitle}
                          </button>
                        </div>
                      </div>
                      <div
                        className={`${
                          !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                        } text-sm w-11/12`}>
                        <pre
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                          className="whitespace-pre-wrap">
                          {currentPlaying.description}
                        </pre>
                      </div>
                      <div>
                        <button
                          className="uppercase text-sm cursor-pointer"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}>
                          Show {showMoreStatus ? "less" : "more"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mr-24 flex flex-col gap-3">
                {getRecommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />;
                  })}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};