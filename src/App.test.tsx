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
    // O visual do herói é um loop mudo do b-roll real da oficina. Precisa ser
    // muted para o autoplay passar na política dos navegadores.
    const heroVideo = document.querySelector('.home-hero__visual video');
    expect(heroVideo).toHaveAttribute(
      'aria-label',
      'Trabalho de precisão na bancada da oficina da Jotta'
    );
    expect(heroVideo).toHaveAttribute('poster', '/media/hero-oficina.jpg');
    expect(heroVideo).toHaveProperty('muted', true);
    expect(heroVideo).toHaveProperty('loop', true);
    expect(screen.getByRole('link', { name: /conhecer o método/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('form', { name: /triagem técnica rápida/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /quatro dados. nenhuma etapa escondida/i,
      })
    ).toBeInTheDocument();
  });

  it('renders a solution page from the typed route catalog', () => {
    render(<App initialPath="/solucoes/hidraulica-industrial/" />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /vazamento é sintoma/i,
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

  it('shows the complete technical request in one step and validates on submit', () => {
    render(<App initialPath="/contato/" />);

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(screen.getByLabelText('Empresa')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de equipamento')).toBeInTheDocument();
    expect(screen.queryByLabelText('Área de atuação')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Descrição do problema ou necessidade')
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/etapa 1 de 3/i)).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /enviar solicitação/i })
    );
    expect(screen.getByText('Informe seu nome completo.')).toBeInTheDocument();
    expect(screen.getByText('Informe o tipo de equipamento.')).toBeInTheDocument();
  });

  it('renders the premium assistance hero and the official location map', () => {
    render(<App initialPath="/assistencia/" />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /peça certa resolve a falha/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /estrutura operacional da jotta/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByTitle(/localização da jotta manutenções/i)
    ).toBeInTheDocument();
  });

  it('renders a useful not-found state', () => {
    render(<App initialPath="/rota-inexistente/" />);

    expect(screen.getByRole('heading', { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /voltar ao início/i })).toHaveAttribute('href', '/');
  });
});
