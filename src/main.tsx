import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';  // <-- import this
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'; 
import App from './App';
import './App.css'

const queryClient = new QueryClient();
const theme = {
  fontFamily: 'Poppins, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme} >
      <ModalsProvider> 
        <Notifications position="top-right"   className="custom-notification"/>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </QueryClientProvider>
);
