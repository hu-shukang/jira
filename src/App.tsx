import React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { LoginScreen } from 'screens/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <ProjectListScreen /> */}
        <LoginScreen />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
