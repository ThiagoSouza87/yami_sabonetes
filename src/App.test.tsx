import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

const irPara = (caminho: string) => window.history.pushState({}, '', caminho);

beforeEach(() => sessionStorage.clear());
afterEach(() => irPara('/'));

describe('rotas', () => {
  it('/admin/estoque abre o acesso restrito (login), não a página 404', () => {
    irPara('/admin/estoque');
    render(<App />);
    expect(screen.getByRole('heading', { name: /acesso restrito/i })).toBeInTheDocument();
    expect(screen.queryByText(/404|não encontrad/i)).not.toBeInTheDocument();
  });

  it('/admin/estoque com sessão abre a tela de estoque', () => {
    sessionStorage.setItem('yami-admin-ok', '1');
    irPara('/admin/estoque');
    render(<App />);
    expect(screen.getByRole('heading', { name: /^estoque$/i })).toBeInTheDocument();
  });

  it('/admin (sem /estoque) não é uma rota: cai no 404, sem expor o login', () => {
    irPara('/admin');
    render(<App />);
    expect(screen.queryByRole('heading', { name: /acesso restrito/i })).not.toBeInTheDocument();
  });

  it('a vitrine pública não tem link para o admin', () => {
    irPara('/');
    const { container } = render(<App />);
    expect(container.querySelectorAll('a[href*="admin"]')).toHaveLength(0);
    expect(container.innerHTML.toLowerCase()).not.toContain('/admin');
  });
});
