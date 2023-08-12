import { useState } from 'react';
import { Checkbox, FormControlLabel, IconButton, Stack, MenuItem, Divider } from '@mui/material';
import Iconify from '../iconify/Iconify';
import MenuPopover from '../menu-popover/MenuPopover';



interface Task {
    id: string;
    label: string;
  }

interface TaskItemProps {
  task: Task;
  checked: boolean;
  onChange: () => void;
  completeIcon: string;
  completeText: string;
  editIcon: string;
  editText: string;
  shareIcon: string;
  shareText: string;
  deleteIcon: string;
  deleteText: string;
}

function TaskItem({
  task,
  checked,
  onChange,
  completeIcon,
  completeText,
  editIcon,
  editText,
  shareIcon,
  shareText,
  deleteIcon,
  deleteText
}: TaskItemProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkComplete = () => {
    handleClosePopover();
    console.log('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleClosePopover();
    console.log('SHARE', task.id);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', task.id);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.label}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton
          size="large"
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
        >
          <Iconify icon={completeIcon} /> {/* Utiliza o ícone personalizado */}
        </IconButton>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon={completeIcon} /> {/* Utiliza o ícone personalizado */}
          {completeText} {/* Utiliza o texto personalizado */}
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon={editIcon} /> {/* Utiliza o ícone personalizado */}
          {editText} {/* Utiliza o texto personalizado */}
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon={shareIcon} /> {/* Utiliza o ícone personalizado */}
          {shareText} {/* Utiliza o texto personalizado */}
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={deleteIcon} />
          {deleteText}
        </MenuItem>
      </MenuPopover>
    </>
  );
}