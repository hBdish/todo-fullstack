import { Container, CssBaseline } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { CollapsibleTable } from '@components';
import { useStores } from '@services';
import { useEffect } from 'react';

const CompanyPage = observer(() => {
  const {
    companyStore,
    userStore: { user },
  } = useStores();

  useEffect(() => {
    void companyStore.getCompanyData(user.company.id);
  }, [user]);

  if (companyStore.isLoading) {
    return <>Loading</>;
  }

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <CollapsibleTable company={companyStore.company} />
    </Container>
  );
});

export { CompanyPage };
