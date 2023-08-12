
import { Stack, Box } from '@mui/material';
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import logoTop from '/logo/logo_branco.png'
import logoStart from '/logo/logoXDB.png'


type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  return (
    <StyledRoot>

      <Box
        component="img"
        src={logoTop}
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>

      <img
      style={{ width: 'auto', height: '60%', cursor: 'pointer' }} 
      src={logoStart} 
      alt='logo'/>

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
