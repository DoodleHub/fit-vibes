export type Exercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
};

type Thumbnail = {
  height: number;
  url: string;
  width: number;
};

export type ExerciseVideo = {
  channelId: string;
  channelName: string;
  description?: string;
  lengthText: string;
  publishedTimeText: string;
  thumbnails: Thumbnail[];
  title: string;
  videoId: string;
  viewCountText: string;
};

export type ExerciseVideoContent = {
  video: ExerciseVideo;
};
