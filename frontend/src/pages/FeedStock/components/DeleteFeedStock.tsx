import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface DeletFeedStockProps {
  onDelete: () => void; // Defina o tipo da prop onDelete como uma função sem argumentos que não retorna nada
}

export default function DeletFeedStock(props: DeletFeedStockProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    props.onDelete(); // Chame a função onDelete quando o botão de exclusão for clicado
    handleClose(); // Feche o modal após a exclusão (se desejar)
  };

  return (
    <div>
      <Button onClick={handleOpen}>Excluir</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deletar Registro
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Você deseja mesmo deletar esse registro?
          </Typography>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleDelete}>Excluir</Button>
        </Box>
      </Modal>
    </div>
  );
}
