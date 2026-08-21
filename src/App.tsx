import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ClubeSabonete from './pages/ClubeSabonete';
import RotinaCuidados from './pages/RotinaCuidados';
import CuidadosDaPele from './pages/CuidadosDaPele';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clube" element={<ClubeSabonete />} />
            <Route path="/rotina" element={<RotinaCuidados />} />
            <Route path="/cuidados" element={<CuidadosDaPele />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
