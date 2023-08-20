import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Button, ButtonGroup, Grid, Typography} from '@mui/material';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
  file: any;
}


const PdfViewer: React.FC<PdfViewerProps> = ({ file }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.3);
  const isMinZoom = scale < 0.4;
  const isMaxZoom = scale >= 2.0;


  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  function onDocumentLoadSuccess(item: any) {
    setNumPages(item.numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Grid container direction="column" style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#e4e4e4',
      overflowY: 'auto',
      overflowX: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
        <Document
          file={file}
          renderMode="canvas"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          onSourceError={console.error}
        >
          <Page 
          scale={scale} 
          pageNumber={pageNumber} 
          renderAnnotationLayer={false}
          renderTextLayer={false}
          />
        </Document>
      </Grid>
      <Typography color="textSecondary" style={{ fontSize: '12px' }}>
        {`${pageNumber || (numPages ? 1 : '--')} / ${numPages || '--'} ${(
          scale * 100
        ).toFixed()}%`}
      </Typography>
      <ButtonGroup
        disableElevation
        variant="outlined"
        size="small"
        style={{
          flex: 1,
          justifyContent: 'center',
          marginTop: '6px',
        }}
      >
        <Button disabled={pageNumber <= 1} onClick={previousPage}>
          <ArrowBackIosIcon />
        </Button>
        <Button disabled={isMinZoom} onClick={zoomOut}>
          <ZoomOutIcon />
        </Button>
        <Button disabled={isMaxZoom} onClick={zoomIn}>
          <ZoomInIcon />
        </Button>
        <Button disabled={pageNumber >= numPages!} onClick={nextPage}>
          <ArrowForwardIosIcon />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PdfViewer;
