import { Box, Stack, Typography } from '@mui/material';
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
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        {targetMuscleExercises.length ? (
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {targetMuscleExercises.map((item) => (
              <Box
                key={item.id}
                itemId={item.id}
                title={item.id}
                m="0 40px"
                paddingY="20px"
              >
                <ExerciseCard exercise={item} />
              </Box>
            ))}
          </ScrollMenu>
        ) : (
          <Loader />
        )}
      </Box>
      <Typography variant="h3" mb={5}>
        Exercises that use the same equipment
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        {equipmentExercises.length ? (
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {equipmentExercises.map((item) => (
              <Box
                key={item.id}
                itemId={item.id}
                title={item.id}
                m="0 40px"
                paddingY="20px"
              >
                <ExerciseCard exercise={item} />
              </Box>
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
