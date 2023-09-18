import axios from "axios";
import { convertRawViews, parseVideoDuration, timesVideo } from "./index";
import { YOUTUBE_API_URL } from "./constants";
import { HomePageVideos } from "../Types";



export const parseData = (
  items: any[],
  channelsData: any[],
  videoIds: string[],
  channelIds: string[],
  videosData: any[]
) => {
  try {
    const channelsMap: Record<string, string> = {};

    channelsData.forEach(
      (channel: {
        id: string;
        snippet: { thumbnails: { default: { url: string } } };
      }) => {
        channelsMap[channel.id] = channel.snippet.thumbnails.default.url;
      }
    );

    const parsedData: HomePageVideos[] = [];
    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number
      ) => {
        const channelImage = channelsMap[item.snippet.channelId];

        if (channelImage)
          parsedData.push({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            duration: parseVideoDuration(
              videosData[index].contentDetails.duration
            ),
            views: convertRawViews(videosData[index].statistics.viewCount),
            videoAge: timesVideo(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: item.snippet.channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
      }
    );

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};


