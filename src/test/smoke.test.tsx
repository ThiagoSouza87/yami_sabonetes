import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('infra de testes', () => {
  it('renderiza React no jsdom com matchers do jest-dom', () => {
    render(<button>Adicionar</button>);
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
  });

  it('resolve o alias @/', async () => {
    const { cn } = await import('@/lib/utils');
    expect(cn('a', undefined, 'c')).toBe('a c');
  });
});
