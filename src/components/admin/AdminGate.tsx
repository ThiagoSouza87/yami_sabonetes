import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ADMIN_SESSAO_KEY = 'yami-admin-ok';

// A flag de sessão (não a senha) vive em sessionStorage: some ao fechar a aba.
// Se o storage estiver bloqueado, o acesso vale só em memória nesta visita.
const lerSessao = () => {
  try { return sessionStorage.getItem(ADMIN_SESSAO_KEY) === '1'; } catch { return false; }
};
const gravarSessao = () => {
  try { sessionStorage.setItem(ADMIN_SESSAO_KEY, '1'); } catch { /* só em memória */ }
};
const limparSessao = () => {
  try { sessionStorage.removeItem(ADMIN_SESSAO_KEY); } catch { /* nada a limpar */ }
};

const MSG_INDISPONIVEL = 'Não foi possível entrar. Tente novamente em instantes.';

const loginSchema = z.object({ senha: z.string().min(1, 'Informe a senha.') });
type LoginValores = z.infer<typeof loginSchema>;

interface AdminGateProps {
  children: (sair: () => void) => ReactNode;
}

export function AdminGate({ children }: AdminGateProps) {
  const [autenticado, setAutenticado] = useState(lerSessao);
  const [erro, setErro] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginValores>({ resolver: zodResolver(loginSchema) });

  const entrar = async ({ senha }: LoginValores) => {
    setErro('');
    try {
      const resposta = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });
      if (resposta.ok) {
        // Só libera com { ok: true } de verdade: um 200 qualquer (ex.: HTML de reescrita) não vale.
        const dados: unknown = await resposta.json().catch(() => null);
        if (dados && (dados as { ok?: unknown }).ok === true) {
          gravarSessao();
          setAutenticado(true);
        } else {
          setErro(MSG_INDISPONIVEL);
        }
      } else if (resposta.status === 401) {
        setErro('Senha incorreta.');
      } else {
        setErro(MSG_INDISPONIVEL);
      }
    } catch {
      setErro(MSG_INDISPONIVEL);
    }
  };

  const sair = () => {
    limparSessao();
    reset();
    setErro('');
    setAutenticado(false);
  };

  if (autenticado) return <>{children(sair)}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf6f0] p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Acesso restrito</CardTitle>
          <CardDescription>Informe a senha para gerenciar o estoque.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(entrar)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" autoComplete="current-password" {...register('senha')} />
              {errors.senha && <p className="text-sm text-red-600">{errors.senha.message}</p>}
              {erro && <p role="alert" className="text-sm text-red-600">{erro}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando…' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
