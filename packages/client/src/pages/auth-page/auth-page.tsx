import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '@services';

const AuthPage = observer(() => {
  const { loginStore } = useStores();

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type={'email'}
        onChange={(value) =>
          loginStore.setAuthDormData('email', value.target.value)
        }
      />
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type={'password'}
        onChange={(value) =>
          loginStore.setAuthDormData('password', value.target.value)
        }
      />
      <Button variant="contained" onClick={() => loginStore.login()}>
        Войти
      </Button>
    </div>
  );
});

export { AuthPage };
