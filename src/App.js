import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import { AppProvider } from './components/providers/AppProvider';
import Layout from './components/Layout'
import data from './data.json'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }
  input:invalid {
    border: 2px dashed red;
  }
`


function App() {
  return (
    <AppProvider data={data}>
      <GlobalStyle />
      <Layout />
    </AppProvider>
  );
}

export default App;
