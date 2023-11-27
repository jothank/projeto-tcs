import React, { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { styled } from "@mui/material/styles";
import LogoSemFundo from "../../assets/Logo sem fundo.png";

const StyledPaper = styled(Paper)({
  padding: 16,
  margin: "auto",
  maxWidth: 600,
  textAlign: "justify",
});


const ClickableIcon = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) => (
  <Button onClick={onClick} style={{ display: "flex", alignItems: "center" }}>
    {icon}
    <Typography variant="body1" style={{ marginLeft: 8 }}>
      {text}
    </Typography>
  </Button>
);

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const openModal = (title: any, content: any) => {
    setModalContent({ title, content });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <StyledPaper>
      <Avatar alt="Logo" src={LogoSemFundo} sx={{ width: "100%", height: "auto", marginBottom: 2 }} />
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Revolucionando a Gestão Financeira na Gastronomia com Tecnologia de Ponta
      </Typography>

      <Typography variant="body1">
        O GastroCustos é a solução disruptiva para a gestão financeira no setor gastronômico, alavancando a eficiência operacional e impulsionando o sucesso nos negócios.
      </Typography>

      <Typography variant="body1">
        Sua função primordial é automatizar e otimizar o cálculo de preços de produtos, oferecendo um controle abrangente sobre custos, ficha técnica e gestão financeira para restaurantes, bares e estabelecimentos similares.
      </Typography>

      <Typography variant="body1">
        Como um simulador de produção gastronômica, o GastroCustos fornece análises preditivas avançadas, relatórios em tempo real e uma abordagem inovadora na precificação, considerando variáveis dinâmicas, impulsionando a prosperidade sustentável dos estabelecimentos.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">
            <ClickableIcon
              icon={<FlashOnIcon />}
              text="Missão"
              onClick={() => openModal("Missão", "Impulsionar a máxima eficiência financeira em estabelecimentos gastronômicos por meio da aplicação de tecnologias inovadoras, promovendo a excelência operacional e a adaptação contínua.")}
            />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginBottom: 2 }}>
          <Typography variant="h5" >
            <ClickableIcon
              icon={<TrendingUpIcon />}
              text="Valores"
              onClick={() => openModal("Valores", (
                <>
                  <Typography variant="body1" style={{ textAlign: 'justify' }}>
                    <ListItem>
                      <ListItemText primary="Compromisso com a excelência impulsionada por dados e análises avançadas." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Busca incessante por inovação para atender às demandas em constante evolução do setor gastronômico." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Transparência e integridade em cada interação, baseadas em algoritmos e segurança digital." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Empatia tecnológica ao compreender os desafios específicos enfrentados pelos nossos clientes na era digital." />
                    </ListItem>
                  </Typography>
                </>
              ))}
            />
          </Typography>
        </Grid>
      </Grid>

      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>{modalContent.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ textAlign: 'justify' }}>{modalContent.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
}
