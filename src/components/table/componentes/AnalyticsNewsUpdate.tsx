import {
    Box,
    Stack,
    Link,
    Card,
    Button,
    Divider,
    Typography,
    CardHeader,
    CardProps,
  } from '@mui/material';
import { fToNow } from '../../../utils/formatTime';
import Scrollbar from '../../scrollbar/Scrollbar';


  type ItemProps = {
    id: string;
    title: string;
    description: string;
    postedAt: number | Date;
 
  };

  
interface Props extends CardProps {
    title?: string;
    subheader?: string;
    list: ItemProps[];
  }
  
  export default function AnalyticsNewsUpdate({ title, subheader, list, ...other }: Props) {
    return (
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
  
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {list.map((news) => (
              <NewsItem key={news.id} news={news} />
            ))}
          </Stack>
        </Scrollbar>
  
        <Divider />
  
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            size="small"
            color="inherit"
           
          >
            View all
          </Button>
        </Box>
      </Card>
    );
  }
  
  // ----------------------------------------------------------------------
  
  type NewsItemProps = {
    news: ItemProps;
  };
  
  function NewsItem({ news }: NewsItemProps) {
    const { title, description, postedAt } = news;
  
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box sx={{ minWidth: 240 }}>
          <Link color="inherit" variant="subtitle2" noWrap>
            {title}
          </Link>
  
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {description}
          </Typography>
        </Box>
  
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {fToNow(postedAt)}
        </Typography>
      </Stack>
    );
  }