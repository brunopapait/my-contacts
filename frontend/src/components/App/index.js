import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';

import Header from '../Header';

import Routes from '../../routes';

import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Header />
          <Routes />
        </Container>
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
