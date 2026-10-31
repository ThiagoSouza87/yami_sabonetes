import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminGate } from '@/components/admin/AdminGate';

const resposta = (status: number, corpo: unknown) =>
  Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(corpo) } as Response);

const fetchMock = vi.fn();

beforeEach(() => {
  sessionStorage.clear();
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const abrir = () => render(<AdminGate>{() => <div>CONTEÚDO SECRETO</div>}</AdminGate>);
const campoSenha = () => screen.getByLabelText(/senha/i);
const entrar = () => userEvent.click(screen.getByRole('button', { name: /entrar/i }));

describe('AdminGate — sem sessão', () => {
  it('mostra só o login, sem nenhum conteúdo protegido', () => {
    abrir();
    expect(screen.getByRole('heading', { name: /acesso restrito/i })).toBeInTheDocument();
    expect(campoSenha()).toHaveAttribute('type', 'password');
    expect(screen.queryByText('CONTEÚDO SECRETO')).not.toBeInTheDocument();
  });

  it('senha incorreta: mostra "Senha incorreta." e continua sem sessão', async () => {
    fetchMock.mockReturnValue(resposta(401, { error: 'Senha incorreta.' }));
    abrir();
    await userEvent.type(campoSenha(), 'errada');
    await entrar();

    expect(await screen.findByText('Senha incorreta.')).toBeInTheDocument();
    expect(screen.queryByText('CONTEÚDO SECRETO')).not.toBeInTheDocument();
    expect(sessionStorage.getItem('yami-admin-ok')).toBeNull();
  });

  it('senha correta: chama POST /api/admin-login e libera o conteúdo', async () => {
    fetchMock.mockReturnValue(resposta(200, { ok: true }));
    abrir();
    await userEvent.type(campoSenha(), 'a-senha-certa');
    await entrar();

    expect(await screen.findByText('CONTEÚDO SECRETO')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/admin-login');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ senha: 'a-senha-certa' });
    expect(sessionStorage.getItem('yami-admin-ok')).toBe('1');
    expect(screen.queryByRole('heading', { name: /acesso restrito/i })).not.toBeInTheDocument();
  });

  it('a senha digitada nunca é guardada no navegador', async () => {
    fetchMock.mockReturnValue(resposta(200, { ok: true }));
    abrir();
    await userEvent.type(campoSenha(), 'a-senha-certa');
    await entrar();
    await screen.findByText('CONTEÚDO SECRETO');

    const tudo = JSON.stringify({ ...sessionStorage }) + JSON.stringify({ ...localStorage });
    expect(tudo).not.toContain('a-senha-certa');
  });
});

describe('AdminGate — sessão', () => {
  it('Sair volta ao login e apaga a sessão', async () => {
    fetchMock.mockReturnValue(resposta(200, { ok: true }));
    render(
      <AdminGate>
        {(sair) => (
          <div>
            CONTEÚDO SECRETO
            <button onClick={sair}>Sair</button>
          </div>
        )}
      </AdminGate>,
    );
    await userEvent.type(campoSenha(), 'a-senha-certa');
    await entrar();
    await userEvent.click(await screen.findByRole('button', { name: 'Sair' }));

    expect(screen.getByRole('heading', { name: /acesso restrito/i })).toBeInTheDocument();
    expect(screen.queryByText('CONTEÚDO SECRETO')).not.toBeInTheDocument();
    expect(sessionStorage.getItem('yami-admin-ok')).toBeNull();
  });

  it('recarregar na mesma aba mantém a sessão (sem pedir senha nem chamar a API)', () => {
    sessionStorage.setItem('yami-admin-ok', '1');
    abrir();
    expect(screen.getByText('CONTEÚDO SECRETO')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('flag de sessão com valor estranho não libera o acesso', () => {
    sessionStorage.setItem('yami-admin-ok', 'true');
    abrir();
    expect(screen.queryByText('CONTEÚDO SECRETO')).not.toBeInTheDocument();
  });

  it('sessionStorage bloqueado: pede senha, e ainda entra em memória nesta visita', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('bloqueado'); });
    fetchMock.mockReturnValue(resposta(200, { ok: true }));
    abrir();
    expect(screen.getByRole('heading', { name: /acesso restrito/i })).toBeInTheDocument();

    await userEvent.type(campoSenha(), 'a-senha-certa');
    await entrar();
    expect(await screen.findByText('CONTEÚDO SECRETO')).toBeInTheDocument();
  });
});

describe('AdminGate — validação e erros', () => {
  it('senha vazia: mostra "Informe a senha." e não chama a API', async () => {
    abrir();
    await entrar();
    expect(await screen.findByText('Informe a senha.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['erro 500 do servidor', () => resposta(500, { error: 'Acesso indisponível no momento.' })],
    ['falha de rede', () => Promise.reject(new TypeError('Failed to fetch'))],
  ])('%s: mensagem genérica de indisponibilidade, sem liberar acesso', async (_nome, falha) => {
    fetchMock.mockImplementation(falha);
    abrir();
    await userEvent.type(campoSenha(), 'qualquer');
    await entrar();

    expect(await screen.findByText(/não foi possível entrar/i)).toBeInTheDocument();
    expect(screen.queryByText('Senha incorreta.')).not.toBeInTheDocument();
    expect(screen.queryByText('CONTEÚDO SECRETO')).not.toBeInTheDocument();
  });

  it.each([
    ['HTML (ex.: reescrita devolvendo index.html)', () => Promise.resolve({ ok: true, status: 200, json: () => Promise.reject(new SyntaxError('Unexpected token <')) } as Response)],
    ['JSON vazio', () => resposta(200, {})],
    ['{ ok: false }', () => resposta(200, { ok: false })],
    ['{ ok: "true" } (texto)', () => resposta(200, { ok: 'true' })],
    ['null', () => resposta(200, null)],
  ])('200 com corpo que não é { ok: true } — %s — NÃO libera o acesso', async (_nome, falsa) => {
    fetchMock.mockImplementation(falsa);
    abrir();
    await userEvent.type(campoSenha(), 'qualquer');
    await entrar();

    expect(await screen.findByText(/não foi possível entrar/i)).toBeInTheDocument();
    expect(screen.queryByText('CONTEÚDO SECRETO')).not.toBeInTheDocument();
    expect(sessionStorage.getItem('yami-admin-ok')).toBeNull();
  });

  it('enquanto valida: botão desabilitado ("Entrando…") e sem envio duplicado', async () => {
    let liberar: (r: Response) => void = () => {};
    fetchMock.mockReturnValue(new Promise<Response>((res) => { liberar = res; }));
    abrir();
    await userEvent.type(campoSenha(), 'a-senha-certa');
    await entrar();

    const botao = await screen.findByRole('button', { name: /entrando/i });
    expect(botao).toBeDisabled();
    await userEvent.click(botao);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    liberar({ ok: true, status: 200, json: () => Promise.resolve({ ok: true }) } as Response);
    expect(await screen.findByText('CONTEÚDO SECRETO')).toBeInTheDocument();
  });

  it('depois de errar, dá para tentar de novo e a mensagem anterior some', async () => {
    fetchMock
      .mockReturnValueOnce(resposta(401, { error: 'Senha incorreta.' }))
      .mockReturnValueOnce(resposta(200, { ok: true }));
    abrir();
    await userEvent.type(campoSenha(), 'errada');
    await entrar();
    await screen.findByText('Senha incorreta.');

    await userEvent.clear(campoSenha());
    await userEvent.type(campoSenha(), 'certa');
    await entrar();
    await waitFor(() => expect(screen.getByText('CONTEÚDO SECRETO')).toBeInTheDocument());
    expect(screen.queryByText('Senha incorreta.')).not.toBeInTheDocument();
  });
});
