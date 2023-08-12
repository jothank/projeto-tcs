import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import AnalyticsNewsUpdate from './componentes/AnalyticsNewsUpdate';
import AnalyticsOrderTimeline from './componentes/AnalyticsOrderTimeline';
import AnalyticsTrafficBySite from './componentes/AnalyticsTrafficBySite';
import AnalyticsTasks from './componentes/AnalyticsTasks';
import { _analyticOrderTimeline, _analyticPost, _analyticTraffic } from '../../_mock/arrays';

export default function BasicTable(){
   
    return(
        <>
         <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate title="News Update" list={_analyticPost} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline title="Order Timeline" list={_analyticOrderTimeline} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite title="Traffic by Site" list={_analyticTraffic} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        
        
        
        
        
        </>
    )
}