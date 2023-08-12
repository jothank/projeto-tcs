import React, { useCallback } from 'react';
import { DropzoneAreaProps, DropzoneArea } from 'material-ui-dropzone';
import { Typography } from '@mui/material';

import useStyles from './styles';
import { useFeedback } from '../../context/Feedback';
import { isNullOrEmpty } from '../../utils/validation';
import { convertBytes, truncate } from '../../utils/formats';

interface FilePickerProps extends DropzoneAreaProps {
  fieldName: string;
  dropzoneText?: string;
  errorMessage?: string;
  large?: boolean;
  fileNameMaxSize?: number;
}

export const FilePicker: React.FC<FilePickerProps> = props => {
  const classes = useStyles();
  const { addFeedback } = useFeedback();
  const { dropzoneText, errorMessage, large, fileNameMaxSize, ...rest } = props;

  const getDropRejectMessage = useCallback(
    (rejectedFile: File, acceptedFiles: string[], maxFileSize: number) => {
      let message = `Arquivo ${truncate(rejectedFile.name, 15)} rejeitado. `;
      if (!acceptedFiles.includes(rejectedFile.type)) {
        message += 'O tipo do arquivo não é suportado. ';
      }
      if (rejectedFile.size > maxFileSize) {
        message += `O arquivo é muito grande. Tamanho máximo: ${convertBytes(
          maxFileSize,
        )}. `;
      }
      return message;
    },
    [],
  );

  const getFileLimitExceedMessage = useCallback(
    (filesLimit: number) =>
      `A quantidade máxima de arquivos foi excedida. Somente ${filesLimit} são suportados.`,
    [],
  );

  const checkFileNameSize = useCallback(
    (files: File[]) => {
      const result = files;
      if (fileNameMaxSize && !isNullOrEmpty(files)) {
        const fileBigName = files.find(
          item => item.name.length > fileNameMaxSize,
        );
        if (fileBigName) {
          const index = files.findIndex(item => item.name === fileBigName.name);
          if (index >= 0) {
            result.splice(index, 1);
          }
          addFeedback({
            type: 'warning',
            description: `O nome do arquivo ${truncate(
              fileBigName.name,
              15,
            )} excede o tamanho permitido pelo sistema. Por favor, dê um novo nome para o arquivo e anexe-o novamente.`,
          });
        }
      }
      return result;
    },
    [addFeedback, fileNameMaxSize],
  );

  return (
    <>
      <DropzoneArea
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onDrop={(files: File[]) => {
          // eslint-disable-next-line no-param-reassign
          files = checkFileNameSize(files);
        }}
        showPreviews
        showPreviewsInDropzone={false}
        useChipsForPreview
        alertSnackbarProps={{ autoHideDuration: 7000 }}
        showAlerts={['error']}
        {...(large ? {} : { dropzoneClass: classes.dropZoneContainer })}
        getFileLimitExceedMessage={getFileLimitExceedMessage}
        getDropRejectMessage={getDropRejectMessage}
        dropzoneText={dropzoneText ?? 'Selecione um arquivo'}
        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Arquivo Selecionado: "
        classes={{
          ...(large
            ? {
                textContainer: classes.grey,
                icon: classes.grey,
              }
            : {
                textContainer: classes.textContainer,
                text: classes.text,
                icon: classes.icon,
              }),
        }}
        {...rest}
      />
      <Typography color="primary" className={classes.errorMessage}>
        {errorMessage ?? ''}
      </Typography>
    </>
  );
};
