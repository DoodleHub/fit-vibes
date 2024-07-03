import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';

import { Exercise, ExerciseVideoContent } from '../types';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl =
        'https://youtube-search-and-download.p.rapidapi.com';
      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );

      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );

      if (!exerciseVideosData) {
        setExerciseVideos([]);
        return;
      }

      const formattedExerciseVideosData = exerciseVideosData.contents.map(
        (content: ExerciseVideoContent) => content.video
      );

      setExerciseVideos(formattedExerciseVideosData);
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) {
    return (
      <Stack height="100px" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises />
    </Box>
  );
};

export default ExerciseDetail;
