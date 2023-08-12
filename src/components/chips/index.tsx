import { Avatar, Chip, Stack } from '@mui/material';
import { useState } from 'react';


type ChipData = {
  label: string;
  avatar: string;
  onClick: () => void;
};

type Props = {
  variant?: 'filled' | 'outlined' | 'soft';
  chipsData: ChipData[];
};

export default function Chips({ variant = 'filled', chipsData }: Props) {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);

  const handleChipClick = (index: number) => {
    setSelectedChip(selectedChip === index ? null : index);
   chipsData[index].onClick()
    console.log(selectedChip)
  }


  return (
    <>
      <Stack direction="row" spacing={2} style={{ marginTop: '5%' }}>
        {chipsData?.map((chipData, index) => (
          <Chip
            key={index}
            variant={variant}
            clickable
            label={chipData.label}
            avatar={<Avatar>{chipData.avatar}</Avatar>}
            onClick={()=> handleChipClick (index)}
            sx={{
              marginRight: '12px',
              backgroundColor: selectedChip === index ? '#1C4C77' : '',
              color: selectedChip === index ? "#FFFFFF" : undefined,
              '&:hover': {
                backgroundColor: selectedChip === index ? '#1C4C77' : '',
                color: '#FFFFF'
              }
            }}
          />
        ))}
      </Stack>
    </>
  );
}