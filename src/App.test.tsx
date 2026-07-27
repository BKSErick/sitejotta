import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('Jotta site experience', () => {
  it('renders the approved home positioning and primary CTA', () => {
    render(<App initialPath="/" />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /manutenção industrial com método, documentação e rastreabilidade/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /solicitar avaliação técnica/i }).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
  });

  it('renders a solution page from the typed route catalog', () => {
    render(<App initialPath="/solucoes/hidraulica-industrial/" />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /conjuntos hidráulicos com diagnóstico, teste e registro/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Cilindros')).toBeInTheDocument();
    expect(screen.getByText('Perda de força')).toBeInTheDocument();
  });

  it('renders an honest empty state for cases without approved proof', () => {
    render(<App initialPath="/cases/" />);

    expect(screen.getByText(/cases estão em processo de autorização editorial/i)).toBeInTheDocument();
    expect(screen.queryByText(/vale|usiminas|caixa/i)).not.toBeInTheDocument();
  });

  it('advances the technical request only after valid first-step data', () => {
    render(<App initialPath="/contato/" />);

    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getAllByText('Informe este dado para continuar.').length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText('Nome completo'), {
      target: { value: 'Marina Lopes' },
    });
    fireEvent.change(screen.getByLabelText('Empresa'), {
      target: { value: 'Indústria Horizonte' },
    });
    fireEvent.change(screen.getByLabelText('Cargo ou área'), {
      target: { value: 'Engenharia' },
    });
    fireEvent.change(screen.getByLabelText('E-mail corporativo'), {
      target: { value: 'marina@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Telefone ou WhatsApp'), {
      target: { value: '(31) 99999-0000' },
    });
    fireEvent.change(screen.getByLabelText('Cidade/UF ou unidade industrial'), {
      target: { value: 'João Monlevade/MG' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(screen.getByText('Etapa 2 de 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Área de atuação')).toBeInTheDocument();
  });

  it('renders a useful not-found state', () => {
    render(<App initialPath="/rota-inexistente/" />);

    expect(screen.getByRole('heading', { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /voltar ao início/i })).toHaveAttribute('href', '/');
  });
});
