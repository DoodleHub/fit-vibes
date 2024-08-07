import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { LeftArrow, RightArrow } from './HorizontalScrollbar';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import BodyPart from './BodyPart';

import { Exercise } from '../types';

type SearchExercisesProps = {
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  bodyPart: string;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;
};

const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
}: SearchExercisesProps) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExerciseData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises?limit=0',
        exerciseOptions
      );

      const searchedExercises = exerciseData.filter(
        (exercise: Exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      setExercises(searchedExercises);
      location.href = '#exercises';
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Stack
      alignItems="center"
      mt="37px"
      justifyContent="center"
      sx={{ p: { lg: '20px', xs: '10px' } }}
    >
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#FFF',
            borderRadius: '40px',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
          onKeyDown={handleInputKeyDown}
        />
        <Button
          type="submit"
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#FFF',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0',
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {bodyParts.map((item) => (
            <BodyPart
              key={item}
              itemId={item}
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          ))}
        </ScrollMenu>
      </Box>
    </Stack>
  );
};

export default SearchExercises;
