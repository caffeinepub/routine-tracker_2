import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RoutineList from './components/RoutineList';
import AddRoutineForm from './components/AddRoutineForm';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <Dashboard />
              <AddRoutineForm />
              <RoutineList />
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
              <AIAssistant />
            </div>
          </div>
        </div>
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
