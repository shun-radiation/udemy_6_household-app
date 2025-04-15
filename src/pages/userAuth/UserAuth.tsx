import * as React from 'react';
// import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Grid, Link } from '@mui/material';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  //   '--template-frame-height': '0.9',
  //   height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  height: '100dvh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

interface AuthDataTypes {
  email: string;
  password: string;
}

export default function UserAuth(props: any) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [isSignIn, setIsSignIn] = React.useState(true);

  const navigate = useNavigate();

  //   ログイン処理
  const handleSignIn = async (data: AuthDataTypes) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      // window.location.reload();
    } catch (err) {
      console.error('サインアップ時のエラーは', err);
    }
  };

  //   新規登録処理
  const handleSignUp = async (data: AuthDataTypes) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
      // window.location.reload();
    } catch (err) {
      console.log('新規登録時のエラーは、', err);
    }
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && navigate('/');
    });
  });

  //   const { register, handleSubmit, errors } = useForm<AuthDataTypes>();

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  // : React.FormEvent<HTMLFormElement>
  //   const handleSubmit = (event: any) => {
  //     if (nameError || emailError || passwordError) {
  //       event.preventDefault();
  //       return;
  //     }
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       name: data.get('name'),
  //       lastName: data.get('lastName'),
  //       email: data.get('email'),
  //       password: data.get('password'),
  //     });
  //   };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const formData = new FormData(event.currentTarget);
    const data: AuthDataTypes = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    if (isSignIn) {
      await handleSignIn(data);
    } else {
      await handleSignUp(data);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            {isSignIn ? 'ログイン' : '新規登録'}
          </Typography>
          {/* <Box
            component='form'
            onSubmit={
              isSignIn ? handleSubmit(handleSignIn) : handleSubmit(handleSignUp)
            }
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          > */}
          <Box
            component='form'
            onSubmit={handleFormSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                required
                fullWidth
                id='email'
                placeholder='your@email.com'
                name='email'
                autoComplete='email'
                variant='outlined'
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                autoFocus
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                required
                fullWidth
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='new-password'
                variant='outlined'
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              //   onClick={validateInputs}
            >
              {isSignIn ? 'ログイン' : '新規登録'}
            </Button>
            <Grid container>
              <Link
                href='#'
                variant='body2'
                onClick={() => setIsSignIn((prev: any) => !prev)}
              >
                {isSignIn
                  ? 'アカウントをお持ちでない方はこちら'
                  : 'アカウントをお持ちの方はこちら'}
              </Link>
            </Grid>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
