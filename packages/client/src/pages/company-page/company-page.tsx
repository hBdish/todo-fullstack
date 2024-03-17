import { Container, CssBaseline } from '@mui/material';
import { CollapsibleTable } from '@components';

const CompanyPage = () => {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />

      <CollapsibleTable />
    </Container>
  );
};

export { CompanyPage };
