import { Box, Stack, Typography } from '@mui/material';

import { ExerciseVideo } from '../types';

type ExerciseVideosProps = {
  exerciseVideos: ExerciseVideo[];
  name: string;
};

const ExerciseVideos = ({ exerciseVideos, name }: ExerciseVideosProps) => {
  return (
    <Box sx={{ marginTop: { lg: '200px', xs: '20px' } }} p="20px">
      <Typography variant="h3" mb="33px">
        Watch{' '}
        <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>
          {name}
        </span>{' '}
        exercise videos
      </Typography>
      <Stack
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
        sx={{ flexDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0' } }}
      >
        {exerciseVideos?.slice(0, 6).map((item) => (
          <a
            key={item.videoId}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={item.thumbnails[0].url} alt={item.title} />
            <Box>
              <Typography variant="h5" color="#000">
                {item.title}
              </Typography>
              <Typography variant="h6" color="#000">
                {item.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
