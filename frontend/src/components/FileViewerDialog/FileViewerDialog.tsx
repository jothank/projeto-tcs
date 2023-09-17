import PictureAsPdfIcon from '@mui/icons-material/Print';
import Dialog from '@mui/material/Dialog';
import React, { useMemo } from 'react';
// import FileDownloader from '../FileDownloader';
import PdfViewer from '../../components/FileViewerDialog';
import { base64ToUint8Array } from './types';
import { Grid, Divider, Tooltip, IconButton } from '@mui/material';

interface FileViewerDialogProps {
  document: DigitalDocumentDTO;
  print?: boolean;
}
export interface DigitalDocumentDTO {
  id?: number;
  bytes?: any;
  nome?: string;
  title?: string;
}


const FileViewerDialog = ({
  open,
  print,
  document,
  title,
  handleClose,
  actionButton,
  actionButtonLabel,
  ...rest
}: any) => {
  const parsedFile = useMemo(() => {
    let result;

    if (document) {
      const cleanBase64 = document.bytes!.split(',')[1];
      const byteArray = base64ToUint8Array(cleanBase64);
      result = URL.createObjectURL(
        new File([byteArray], document?.nome! ?? 'comprovante'),
      );
    }
    return result;
  }, [document]);

  const printPdf = () => {
    const cleanBase64 = document.bytes!.split(',')[1];
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new Blob([byteArray], { type: 'application/pdf;base64' });
    const fileURL = URL.createObjectURL(file);

    window.open(fileURL)?.print();
  };

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        maxWidth="md"
        fullWidth
        handleConfirm={handleClose}
        contentDividers
        keepMounted={false}
        showOneButton
        actionButtonLabel={actionButtonLabel as any}
        actionButton={actionButton}
        {...rest}
        customTitle={
          <Grid container alignItems="center">
            {title}
            <Divider
              style={{ height: 40, margin: '1rem' }}
              orientation="vertical"
              variant="middle"
            />
          
            {print && (
              <Tooltip
                disableInteractive
                title="Clique para imprimir"
                placement="top"
                arrow
              >
                <IconButton onClick={printPdf} disabled={false} size="large">
                  <PictureAsPdfIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        }
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item container alignItems="center" direction="column">
            {document! && document?.nome?.includes('.pdf') ||
            document?.nome?.includes('.PDF') ? (
              <PdfViewer file={parsedFile} />
            ) : (
              <img
                src={document?.bytes!}
                alt="Comprovante"
              />
            )}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default FileViewerDialog;
