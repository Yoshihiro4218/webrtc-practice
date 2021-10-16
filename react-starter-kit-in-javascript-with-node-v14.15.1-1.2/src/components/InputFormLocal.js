import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from "@material-ui/core";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Yoshihiro4218">
        Yoshi's github.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

export default function InputFormLocal({localPeerName, setLocalPeerName}) {
  const label = 'あなたの名前';
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isComposed, setIsComposed] = useState(false);

  useEffect(() => {
    const disabled = name === '';
    setDisabled(disabled);
  }, [name])

  console.log({name});

  const initializeLocalPeer = useCallback((e) => {
    console.log('initial!')
    setLocalPeerName(name);
    e.preventDefault();
  }, [name, setLocalPeerName]);

  if (localPeerName !== '') return <></>;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {label}を入力してください
          </Typography>
          <Box component="form" noValidate sx={{mt: 1}}>
            <TextField
              variant={"outlined"}
              margin="normal"
              required
              fullWidth
              label={label}
              name="name"
              autoFocus
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
              onKeyDown={(e) => {
                console.log('keyDown!')
                if (isComposed) return;
                if (e.target.value === '') return;
                if (e.key === 'Enter') initializeLocalPeer(e);
              }}
              onCompositionEnd={() => {
                setIsComposed(false)
              }}
              onCompositionStart={() => setIsComposed(true)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={"primary"}
              sx={{mt: 3, mb: 2}}
              disabled={disabled}
              onClick={(e) => initializeLocalPeer(e)}
            >
              決定
            </Button>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}}/>
      </Container>
    </ThemeProvider>
  );
}
