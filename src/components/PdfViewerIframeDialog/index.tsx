import { Box, DialogContent, Typography } from '@mui/material';
import React from 'react';

import { getBlobUrl } from '../../utils/files';
import { CustomDialog, CustomDialogProps } from '../CustomDialog';

interface PdfViewerIframeDialogProps extends CustomDialogProps {
  file: Blob | undefined;
}

export const PdfViewerIframeDialog: React.FC<PdfViewerIframeDialogProps> = ({
  file,
  ...rest
}: PdfViewerIframeDialogProps) => {
  return (
    <CustomDialog maxWidth="lg" showCloseButton showOneButton {...rest}>
      <DialogContent dividers>
        {file ? (
          <object
            data={getBlobUrl(file, 'pdf')}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ minHeight: '500px' }}
          >
            <Typography>
              Não foi possível carregar o arquivo. Verifique as configurações
              para abertura de pdf do seu navegador e tente novamente
            </Typography>
          </object>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography>Arquivo não encontrado</Typography>
          </Box>
        )}
      </DialogContent>
    </CustomDialog>
  );
};
