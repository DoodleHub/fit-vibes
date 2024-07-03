import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import { Exercise } from '../types';

type ExerciseCardProps = {
  exercise: Exercise;
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            ml: '21px',
            color: '#FFF',
            background: '#FFA9A9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: '21px',
            color: '#FFF',
            background: '#FCC757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {exercise.target}
        </Button>
        <Typography
          ml="21px"
          color="#000"
          fontWeight="bold"
          mt="11px"
          pb="10px"
          textTransform="capitalize"
        >
          {exercise.name}
        </Typography>
      </Stack>
    </Link>
  );
};

export default ExerciseCard;
