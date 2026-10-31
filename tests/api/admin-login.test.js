// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import handler from '../../api/admin-login.js';

const SENHA = 'senha-forte-de-teste';

// res mínimo, no formato usado pelas funções da Vercel.
function criarRes() {
  const res = {
    statusCode: undefined,
    corpo: undefined,
    cabecalhos: {},
    status(codigo) { res.statusCode = codigo; return res; },
    json(corpo) { res.corpo = corpo; return res; },
    setHeader(nome, valor) { res.cabecalhos[nome.toLowerCase()] = valor; return res; },
  };
  return res;
}
const chamar = async (req) => {
  const res = criarRes();
  await handler(req, res);
  return res;
};

let senhaOriginal;
beforeEach(() => {
  senhaOriginal = process.env.ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD = SENHA;
});
afterEach(() => {
  if (senhaOriginal === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = senhaOriginal;
});

describe('POST /api/admin-login', () => {
  it('senha correta → 200 { ok: true }', async () => {
    const res = await chamar({ method: 'POST', body: { senha: SENHA } });
    expect(res.statusCode).toBe(200);
    expect(res.corpo).toEqual({ ok: true });
  });

  it('aceita body em string JSON (como a Vercel às vezes entrega)', async () => {
    const res = await chamar({ method: 'POST', body: JSON.stringify({ senha: SENHA }) });
    expect(res.statusCode).toBe(200);
  });

  it.each([
    ['senha errada', { senha: 'outra-senha' }],
    ['senha com mesmo prefixo', { senha: SENHA + 'x' }],
    ['senha vazia', { senha: '' }],
    ['sem o campo senha', {}],
    ['senha não-string', { senha: 123456 }],
    ['body ausente', undefined],
    ['body JSON inválido', '{quebrado'],
  ])('%s → 401 sem { ok: true }', async (_nome, body) => {
    const res = await chamar({ method: 'POST', body });
    expect(res.statusCode).toBe(401);
    expect(res.corpo.ok).not.toBe(true);
    expect(res.corpo.error).toBe('Senha incorreta.');
  });

  it.each(['GET', 'PUT', 'DELETE', 'OPTIONS'])('método %s → 405 com Allow: POST', async (method) => {
    const res = await chamar({ method, body: { senha: SENHA } });
    expect(res.statusCode).toBe(405);
    expect(res.cabecalhos.allow).toBe('POST');
  });

  it('sem ADMIN_PASSWORD → 500 genérico, sem vazar o motivo nem aceitar senha vazia', async () => {
    delete process.env.ADMIN_PASSWORD;
    for (const body of [{ senha: SENHA }, { senha: '' }, {}]) {
      const res = await chamar({ method: 'POST', body });
      expect(res.statusCode).toBe(500);
      expect(JSON.stringify(res.corpo)).not.toMatch(/ADMIN_PASSWORD/);
    }
  });

  it('ADMIN_PASSWORD vazia também é tratada como não configurada (500)', async () => {
    process.env.ADMIN_PASSWORD = '';
    const res = await chamar({ method: 'POST', body: { senha: '' } });
    expect(res.statusCode).toBe(500);
  });

  it('nunca devolve a senha na resposta e não deixa cachear', async () => {
    const certa = await chamar({ method: 'POST', body: { senha: SENHA } });
    const errada = await chamar({ method: 'POST', body: { senha: 'x' } });
    for (const res of [certa, errada]) {
      expect(JSON.stringify(res.corpo)).not.toContain(SENHA);
      expect(res.cabecalhos['cache-control']).toBe('no-store');
    }
  });
});
