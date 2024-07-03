import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Loader from '../components/Loader';

import { Exercise, ExerciseVideoContent } from '../types';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
  const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );

      setExerciseVideos([]);
      setTargetMuscleExercises([]);
      setEquipmentExercises([]);
      setExerciseDetail(exerciseDetailData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchExercisesData();
  }, [id]);

  useEffect(() => {
    const fetchExerciseVideosData = async () => {
      if (exerciseDetail) {
        const exerciseVideosData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetail.name}`,
          youtubeOptions
        );

        const formattedExerciseVideosData = exerciseVideosData.contents.map(
          (content: ExerciseVideoContent) => content.video
        );

        setExerciseVideos(formattedExerciseVideosData);
      }
    };

    fetchExerciseVideosData();
  }, [exerciseDetail]);

  useEffect(() => {
    const fetchRelatedExerciseData = async () => {
      if (exerciseDetail) {
        const targetMuscleExercisesData = await fetchData(
          `${exerciseDbUrl}/exercises/target/${exerciseDetail.target}`,
          exerciseOptions
        );
        setTargetMuscleExercises(targetMuscleExercisesData);

        const equipmentExercisesData = await fetchData(
          `${exerciseDbUrl}/exercises/equipment/${exerciseDetail.equipment}`,
          exerciseOptions
        );
        setEquipmentExercises(equipmentExercisesData);
      }
    };

    fetchRelatedExerciseData();
  }, [exerciseDetail]);

  if (!exerciseDetail) {
    return (
      <Stack height="200px" justifyContent="center" alignItems="center">
        <Loader />
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
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
