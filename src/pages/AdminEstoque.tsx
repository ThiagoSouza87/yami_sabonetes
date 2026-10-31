import { AdminGate } from '@/components/admin/AdminGate';
import { EstoqueLista } from '@/components/admin/EstoqueLista';
import { EstoqueResumo } from '@/components/admin/EstoqueResumo';
import { Button } from '@/components/ui/button';

export default function AdminEstoque() {
  return (
    <AdminGate>
      {(sair) => (
        <main className="min-h-screen bg-[#faf6f0] px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Estoque</h1>
              <Button variant="outline" size="sm" onClick={sair}>Sair</Button>
            </header>
            <EstoqueResumo />
            <EstoqueLista />
          </div>
        </main>
      )}
    </AdminGate>
  );
}
