import React, { useState,  useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, ButtonBase, Card, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import fetchJsonp from 'fetch-jsonp';
import { IEmpresas, addEmpresaApi, editEmpresaApi, listAllEmpresasApi } from '../../services/api.emprestas';
import { useFeedback } from '../../context/Feedback';

interface CnpjData {

  cnpj: string,
  nome: string;
  telefone: string;
  email: string;
  logradouro: string;
  numero: string;
  comp: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
}

export default function Profile() {
  const { themeStretch } = useSettingsContext();
  const [cnpj, setCnpj] = useState('');
  const [searching, setSearching] = useState(false);
  const [cnpjData, setCnpjData] = useState<CnpjData | null>(null);
  const { addFeedback } = useFeedback();
  const [empresas, setEmpresas] = useState<IEmpresas[]>([]);

  useEffect(() => {
    // Carregar os dados do localStorage ao iniciar a página
    const savedData = localStorage.getItem('savedCnpjData');
    if (savedData) {
      setCnpjData(JSON.parse(savedData));
    }
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await listAllEmpresasApi();
      setEmpresas(response.data);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };

  const handleEditEmpresa = async (empresaId: number, novosDadosEmpresa: IEmpresas) => {
    try {
      const response = await editEmpresaApi(empresaId, novosDadosEmpresa);
      console.log('Empresa editada:', response.data);
  
      // Chama a função para atualizar a lista de empresas após a edição
      const updatedEmpresas = await listAllEmpresasApi();
      console.log('Lista de empresas atualizada:', updatedEmpresas.data);
    } catch (error) {
      console.error('Erro ao editar empresa:', error);
    }
  };

  const handleSearch = async () => {
    if (cnpj && !searching) {
      setSearching(true);
  
      try {
        const response = await fetchJsonp(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
        const data = await response.json();
        console.log('dados', data)
        if (data.status === 'OK') {
          console.log('Encontrado');
          setCnpjData(data); // Atualiza os dados do CNPJ no estado cnpjData
        } else {
          console.log('CNPJ não encontrado');
        }
      } catch (error) {
        console.log('Erro na busca:', error);
      } finally {
        setSearching(false); // Coloque o setSearching(false) dentro do bloco finally
      }
    }
  };

  const handleAddEmpresa = async () => {
    if (cnpjData) {
      const novaEmpresaData = {
        cnpj: cnpjData.cnpj,
        nome: cnpjData.nome,
        telefone: cnpjData.telefone,
        email: cnpjData.email,
        logradouro: cnpjData.logradouro,
        numero: cnpjData.numero,
        bairro: cnpjData.bairro,
        cidade: cnpjData.municipio,
        cep: cnpjData.cep,
        uf: cnpjData.uf,
      };
  
      try {
        await addEmpresaApi(novaEmpresaData);
        console.log('Empresa adicionada com os dados do CNPJ');
        addFeedback({
          type: 'success',
          title: '',
          description: 'Empresa adicionada com sucesso.'
        });
      } catch (error) {
        console.error('Erro ao adicionar Empresa:', error);
        addFeedback({
          type: 'error',
          title: '',
          description: 'Erro ao adicionar empresa.'
        });
      }
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Gerenciamento de Empresa</title>
      </Helmet>
      <Container maxWidth={themeStretch && false}>
        <Paper
          elevation={3}
          style={{
            padding: '2rem',
            marginTop: '2rem',
            height: 'auto', // Removido o valor fixo de altura
          }}
        >
          {/* Conteúdo do Card */}
          <Typography
            variant="h3"
            paragraph
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '30%',
            }}
          >
            Gerenciamento de Empresa
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '2%' }}>
            <Grid item xs={6}>
              <TextField
                id="outlined-required"
                label="CNPJ"
                fullWidth
                value={cnpj}
                onChange={(event) => setCnpj(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
                onClick={handleSearch}
                disabled={searching}
              >
                Buscar
              </Button>
            </Grid>
            {/* Outros campos do Card */}
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Nome"
                fullWidth
                value={cnpjData?.nome || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Telefone"
                fullWidth
                value={cnpjData?.telefone || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Email"
                fullWidth
                value={cnpjData?.email || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* Campos de Endereço */}
            <Grid item xs={8}>
              <TextField
                id="outlined-required"
                label="Logradouro"
                fullWidth
                value={cnpjData?.logradouro || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Número"
                fullWidth
                value={cnpjData?.numero || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Bairro"
                fullWidth
                value={cnpjData?.bairro || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Cidade"
                fullWidth
                value={cnpjData?.municipio || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="CEP"
                fullWidth
                value={cnpjData?.cep || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-required"
                label="Estado"
                fullWidth
                value={cnpjData?.uf || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{
                  border: '1px solid blue',
                }}
                onClick={handleAddEmpresa}
              >
                Adicionar
              </Button>
              {/* <Button
                sx={{
                  border: '1px solid blue',
                  marginLeft: '2%',
                }}
                onClick={() => handleEditEmpresa(empresaEditar?.id, novosDadosEmpresa)}
              >
                Editar
              </Button> */}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
  
}
