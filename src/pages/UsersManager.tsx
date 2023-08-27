import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '../components/settings';
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from 'react';
import {  listNewUserAPI } from '../services/users.services';
import FileDownload from '@mui/icons-material/Description';
import DoneIcon from '@material-ui/icons/Done';
import { setCpfCnpjMask } from '../utils/masks';
import FileViewerDialog, { DigitalDocumentDTO } from '../components/FileViewerDialog/FileViewerDialog';
import { Chip, IconButton, Container, Paper, Typography, Button, Skeleton } from '@mui/material';
import { useFeedback } from '../context/Feedback';


interface dataListDTO {
  name: string,
  doc: string,
  email: string,
  approved: boolean,
  file: string,
  isOrg: boolean,
  id?: number,
}

export default function UserManager() {

  const columns = [
    {
      name: "name",
      label: "Nome",
    },
    {
      name: "doc",
      label: "Documento",
    },
    {
      name: "email",
      label: "E-mail",
    },
    {
      name: "isOrg",
      label: "Tipo",

      options: {
        filter: false,
        customBodyRender: (_value: any, tableMeta: any, _updateValue: any) => {
          return (
            _value ? <Chip color="primary" label="Empresa" /> : <Chip color="secondary" label="Pessoa Física" />

          );
        },
      },
    },
    {
      name: "approved",
      label: "Status",
      options: {
        filter: false,
        customBodyRender: (_value: any, tableMeta: any, _updateValue: any) => {
          return (
            _value ? <Chip color="primary" label="Aprovado" deleteIcon={<DoneIcon />} /> : <Chip onClick={() => console.log("aprovar")} label="Em analise" />
          );
        },
      },
    },
   
    {
      name: "id",
      label: " ",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (_value: any, tableMeta: any, _updateValue: any) => {

          const userIsApproved = dataUser?.find(user => user.id === _value);

         
        },
      },
    },

  ]
  const options = {
    download: true,
    filter: true,
    responsive: 'standard',
    print: true,
    selectableRows: 'none',
    viewColumns: false,
    enableNestedDataAccess: '.',
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 20, 50, 100],
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum registro foi encontrado",
        toolTip: "Organizar",
        columnHeaderTooltip: (column: { label: any; }) => `Organizar por ${column.label}`
      },
      pagination: {
        next: "Próxima Página",
        previous: "Voltar Página",
        rowsPerPage: "Linhas por Página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Ver Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "TODOS",
        title: "FILTROS",
        reset: "LIMPAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Esconder Colunas",
      },
      selectedRows: {
        text: "Linha(s) selecionadas",
        delete: "Apagar",
        deleteAria: "Apagar Linhas Selecionadas",
      },
    }
  };

  const { themeStretch } = useSettingsContext();
  const [openFileViewerDialog, setOpenFileViewerDialog] = useState(false);
  const [dataUser, setDataUser] = useState<dataListDTO[]>()
  const [fileToView, setFileToView] = useState<DigitalDocumentDTO>();
  const { addFeedback } = useFeedback();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getAllUsers();
  }, [addFeedback])


 


  const getAllUsers = () => {
    
    setLoading(true)

    listNewUserAPI().then(res => {
      const dataSet = res.data.map((item: any) => ({
        name: item.name,
        doc: setCpfCnpjMask(item.doc),
        email: item.email,
        approved: item.approved,
        file: item.file[0],
        isOrg: item.isOrganization,
        id: item._id,
      }))

      setDataUser(dataSet);

    }).catch(err => {
      console.log("error", err)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Helmet>
        <title>Gerenciamento de Clientes</title>
      </Helmet>

      {fileToView &&
        <FileViewerDialog
          open={openFileViewerDialog}
          title={fileToView?.nome}
          handleClose={() => setOpenFileViewerDialog(false)}
          document={fileToView}
        />
      }

      <Container maxWidth={themeStretch && false}>
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }} >
          <Typography variant="h3" paragraph>
            Gerenciamento de Clientes
          </Typography>
          {loading ?
            Array(13).fill('').map(
              (item: any, index: number) => {
                return (
                  <Skeleton key={index} variant="rectangular" height={30} style={{ marginTop: '1rem' }} />
                );
              },
            )
            :
            <MUIDataTable
              title=''
              data={dataUser as any}
              columns={columns}
              options={options as any}
            />
          }
        </Paper>
      </Container>
    </>
  );
}


