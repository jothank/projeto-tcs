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


const IconeClicavel = ({ icone, texto, onClick }: { icone: React.ReactNode, texto: string, onClick: () => void }) => (
  <Button onClick={onClick} style={{ display: "flex", alignItems: "center" }}>
    {icone}
    <Typography variant="body1" style={{ marginLeft: 8 }}>
      {texto}
    </Typography>
  </Button>
);

export default function Home() {
  const [modalAberto, setModalAberto] = useState(false);
  const [conteudoModal, setConteudoModal] = useState({ titulo: "", conteudo: "" });

  const abrirModal = (titulo: any, conteudo: any) => {
    setConteudoModal({ titulo, conteudo });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <StyledPaper>
       <Avatar alt="Logo" src={LogoSemFundo} style={{ width: 380, height: 150, marginBottom: 0 }} />
      <Typography variant="h4">
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
            <IconeClicavel
              icone={<FlashOnIcon />}
              texto="Missão"
              onClick={() => abrirModal("Missão", "Impulsionar a máxima eficiência financeira em estabelecimentos gastronômicos por meio da aplicação de tecnologias inovadoras, promovendo a excelência operacional e a adaptação contínua.")}
            />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5">
            <IconeClicavel
              icone={<TrendingUpIcon />}
              texto="Valores"
              onClick={() => abrirModal("Valores", (
                <>
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
                </>
              ))}
            />
          </Typography>
        </Grid>
      </Grid>

      <Dialog open={modalAberto} onClose={fecharModal}>
        <DialogTitle>{conteudoModal.titulo}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{conteudoModal.conteudo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
}
