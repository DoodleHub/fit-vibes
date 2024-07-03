import { Box, Typography } from '@mui/material';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { LeftArrow, RightArrow } from './HorizontalScrollbar';
import Loader from './Loader';

import { Exercise } from '../types';
import ExerciseCard from './ExerciseCard';

type SimilarExercisesProps = {
  targetMuscleExercises: Exercise[];
  equipmentExercises: Exercise[];
};

const SimilarExercises = ({
  targetMuscleExercises,
  equipmentExercises,
}: SimilarExercisesProps) => {
  return (
    <Box
      sx={{
        mt: { lg: '50px', xs: '0' },
        mb: { lg: '50px', xs: 0 },
        p: { lg: '20px', xs: '10px' },
      }}
    >
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', mb: '20px' }}>
        {targetMuscleExercises.length ? (
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {targetMuscleExercises.map((item) => (
              <ExerciseCard key={item.id} itemId={item.id} exercise={item} />
            ))}
          </ScrollMenu>
        ) : (
          <Loader />
        )}
      </Box>
      <Typography variant="h3" mb={5}>
        Exercises that use the same equipment
      </Typography>
      <Box sx={{ position: 'relative', width: '100%' }}>
        {equipmentExercises.length ? (
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {equipmentExercises.map((item) => (
              <ExerciseCard key={item.id} itemId={item.id} exercise={item} />
            ))}
          </ScrollMenu>
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default SimilarExercises;
