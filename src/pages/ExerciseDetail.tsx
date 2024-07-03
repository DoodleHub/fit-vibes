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
      fetchExerciseVideosData(exerciseDetailData);
      fetchRelatedExerciseData(exerciseDetailData);
      window.scrollTo({ top: -1, behavior: 'smooth' });
    };

    fetchExercisesData();
  }, [id]);

  const fetchExerciseVideosData = async (exerciseDetailData: Exercise) => {
    const exerciseVideosData = await fetchData(
      `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
      youtubeOptions
    );

    const formattedExerciseVideosData = exerciseVideosData.contents.map(
      (content: ExerciseVideoContent) => content.video
    );

    setExerciseVideos(formattedExerciseVideosData);
  };

  const fetchRelatedExerciseData = async (exerciseDetailData: Exercise) => {
    const targetMuscleExercisesData = await fetchData(
      `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
      exerciseOptions
    );
    setTargetMuscleExercises(targetMuscleExercisesData);

    const equipmentExercisesData = await fetchData(
      `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
      exerciseOptions
    );
    setEquipmentExercises(equipmentExercisesData);
  };

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
