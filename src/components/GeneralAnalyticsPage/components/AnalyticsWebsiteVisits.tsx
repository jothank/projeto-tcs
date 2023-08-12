import { ApexOptions } from 'apexcharts';
// @mui
import { Card, CardHeader, Box, CardProps, TableContainer } from '@mui/material';
import Chart, { useChart } from '../../Charts';
// components
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { ICertificate, listAllCertificatesApi } from '../../../services/dashboard.services';
import CustomTable from '../../../pages/Dashboard/components/Table';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    labels: string[];
    colors?: string[];
    series: {
      name: string;
      type: string;
      fill?: string;
      data: number[];
    }[];
    options?: ApexOptions;
  };
}



interface Column {
  id: 'ticketNumber' | 'name' | 'domain' | 'dataVenc' | 'description' | 'subdescription' | 'subName';
  label: string;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: Column[] = [
  
  { id: 'name', label: '', align: 'left' },
  { id: 'domain', label: '', align: 'left' },
  { id: 'dataVenc', label: '', align: 'right' },
];

const handleRevogar = () => {
  console.log('revogar')
};

const handleDetalhes = () => {
  console.log('reemisão')
};

const actions = [
  // { label: 'Reemitir', onClick: handleReemit },
  { label: 'Revogar', onClick: handleRevogar },
  { label: 'Detalhes', onClick: handleDetalhes },
];

const chipsData = [
  {
    label: 'Perto de Expirar',
    avatar: '6',
    onClick: () => {
      console.log('Redirecionamento para a URL 1');
    },
  },
  {
    label: 'Concluídos',
    avatar: '6',
    onClick: () => {
      console.log('Redirecionamento para a URL 2');
    },
  },
  {
    label: 'Expirados',
    avatar: '6',
    onClick: () => {
      console.log('Redirecionamento para a URL 2');
    },
  },
  {
    label: 'Emissão Solicitada',
    avatar: '16',
    onClick: () => {
      console.log('Redirecionamento para a URL 2');
    },
  }

];


export default function AnalyticsWebsiteVisits({ title, subheader, chart, ...other }: Props) {
  const { labels, colors, series, options } = chart;
  const [certificados, setCertificados] = useState<ICertificate[]>()
  const formattedLabels = labels && labels.map((labelItem) => {
    const date = new Date(labelItem)
    return format(date, 'dd/MM/yyyy', { locale: ptBR })

  })




  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill) as string[],
    },
    labels: formattedLabels || [],
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} Emitidos`;
          }
          return value;
        },
      },
    },
    ...options,
    // locales: [ptBR]
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart type="line" series={series} options={chartOptions} height={364} />
      </Box>

      <TableContainer sx={{
        width: '100%',
      }}>
        <CustomTable columns={columns} data={certificados} actions={actions} chipsData={chipsData}/>
      </TableContainer>
    </Card>
  );
}
