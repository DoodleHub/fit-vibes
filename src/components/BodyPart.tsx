import { Stack, Typography } from '@mui/material';

import Icon from '../assets/icons/gym.png';

type BodyPartProps = {
  itemId: string;
  item: string;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;
  bodyPart: string;
};

const BodyPart = ({ item, setBodyPart, bodyPart }: BodyPartProps) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? '4px solid #FF2625' : '',
        backgroundColor: '#FFF',
        borderBottomLeftRadius: '20px',
        width: '270px',
        height: '280px',
        cursor: 'pointer',
        gap: '47px',
        m: '0 40px',
      }}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      }}
    >
      <img
        src={Icon}
        alt="dumbbell"
        style={{ width: '40px', height: '40px' }}
      />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
