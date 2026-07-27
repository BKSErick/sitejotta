export type RouteKind =
  | 'home'
  | 'company'
  | 'solutions'
  | 'solution'
  | 'assistance'
  | 'method'
  | 'cases'
  | 'content'
  | 'book'
  | 'contact'
  | 'legal';

export interface PageMeta {
  title: string;
  description: string;
}

export interface PublicRoute {
  path: string;
  kind: RouteKind;
  label: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  meta: PageMeta;
  solutionSlug?: string;
}

export interface Solution {
  slug: string;
  number: string;
  shortName: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  context: string;
  applications: string[];
  warningSigns: string[];
  cta: string;
  meta: PageMeta;
}

export const solutions: Solution[] = [
  {
    slug: 'talhas-eletricas',
    number: '01',
    shortName: 'Talhas elétricas',
    eyebrow: 'ELEVAÇÃO E MOVIMENTAÇÃO',
    heading: 'Manutenção de talhas elétricas com controle técnico em cada etapa.',
    introduction:
      'Diagnóstico, intervenção, testes e documentação para equipamentos aplicados à elevação e movimentação de cargas.',
    context:
      'Freios, cabos ou correntes, comandos, motores e dispositivos de segurança precisam ser avaliados como partes de um mesmo sistema.',
    applications: ['Talhas de cabo de aço', 'Talhas de corrente', 'Trole elétrico', 'Comandos e acessórios'],
    warningSigns: ['Ruído ou vibração anormal', 'Falha de acionamento', 'Desgaste aparente', 'Operação irregular'],
    cta: 'Solicitar avaliação de uma talha',
    meta: {
      title: 'Manutenção de Talhas Elétricas | Jotta Manutenções',
      description:
        'Conheça o atendimento da Jotta para talhas elétricas, com diagnóstico, manutenção, testes e documentação conforme o escopo aprovado.',
    },
  },
  {
    slug: 'lavadoras-industriais',
    number: '02',
    shortName: 'Lavadoras industriais',
    eyebrow: 'LIMPEZA INDUSTRIAL',
    heading: 'Manutenção de lavadoras para recuperar desempenho e previsibilidade de uso.',
    introduction:
      'Atendimento técnico a equipamentos de limpeza utilizados em oficinas, plantas e rotinas de manutenção.',
    context:
      'Vazão, pressão, acionamento e condição dos componentes precisam ser avaliados em conjunto antes da liberação do equipamento.',
    applications: ['Lavadoras de alta pressão', 'Lavadoras de piso', 'Bombas e acessórios', 'Sistemas de acionamento'],
    warningSigns: ['Perda de pressão', 'Vazamento', 'Falha de acionamento', 'Desempenho instável'],
    cta: 'Solicitar avaliação de uma lavadora',
    meta: {
      title: 'Manutenção de Lavadoras Industriais | Jotta Manutenções',
      description:
        'Atendimento técnico para lavadoras industriais com avaliação de pressão, vazão, acionamento, componentes e condição operacional.',
    },
  },
  {
    slug: 'ferrovia',
    number: '03',
    shortName: 'Ferrovia',
    eyebrow: 'VIA PERMANENTE',
    heading: 'Manutenção de equipamentos ferroviários para rotinas que exigem disponibilidade em campo.',
    introduction:
      'Atendimento a equipamentos de via permanente, incluindo tirefonadeiras, furadeiras de dormente e equipamentos de socaria.',
    context:
      'Equipamentos ferroviários trabalham sob esforço, impacto e condições severas. A avaliação considera a aplicação e a condição de entrada.',
    applications: ['Tirefonadeiras', 'Furadeiras de dormente', 'Socadores', 'Ferramentas de via permanente'],
    warningSigns: ['Perda de rendimento', 'Partida irregular', 'Desgaste por impacto', 'Falha em campo'],
    cta: 'Solicitar avaliação de equipamento ferroviário',
    meta: {
      title: 'Manutenção de Equipamentos Ferroviários | Jotta Manutenções',
      description:
        'Manutenção de equipamentos de via permanente com diagnóstico da condição de entrada, intervenção, testes e registros do serviço.',
    },
  },
  {
    slug: 'mecanica-industrial',
    number: '04',
    shortName: 'Mecânica industrial',
    eyebrow: 'MECÂNICA',
    heading: 'Manutenção mecânica orientada pela condição real do equipamento.',
    introduction:
      'Atendimento a equipamentos e ferramentas mecânicas utilizados na operação e na manutenção industrial.',
    context:
      'Folga, desgaste, desalinhamento e falha de componentes exigem diagnóstico antes da substituição ou recuperação.',
    applications: ['Redutores', 'Ferramentas mecânicas', 'Conjuntos rotativos', 'Dispositivos industriais'],
    warningSigns: ['Folga excessiva', 'Desalinhamento', 'Aquecimento', 'Desgaste de componentes'],
    cta: 'Solicitar avaliação mecânica',
    meta: {
      title: 'Manutenção Mecânica Industrial | Jotta Manutenções',
      description:
        'Avaliação e manutenção mecânica de equipamentos industriais com diagnóstico de desgaste, folga, alinhamento e condição funcional.',
    },
  },
  {
    slug: 'hidraulica-industrial',
    number: '05',
    shortName: 'Hidráulica industrial',
    eyebrow: 'HIDRÁULICA',
    heading: 'Manutenção de conjuntos hidráulicos com diagnóstico, teste e registro.',
    introduction:
      'Atendimento a cilindros, bombas, prensas e outros equipamentos hidráulicos utilizados em aplicações industriais.',
    context:
      'Perda de força, vazamento e instabilidade podem ter causas diferentes. A intervenção começa pela compreensão do conjunto.',
    applications: ['Cilindros', 'Bombas hidráulicas', 'Prensas', 'Unidades e conjuntos hidráulicos'],
    warningSigns: ['Perda de força', 'Vazamento', 'Movimento irregular', 'Queda de pressão'],
    cta: 'Solicitar avaliação hidráulica',
    meta: {
      title: 'Manutenção Hidráulica Industrial | Jotta Manutenções',
      description:
        'Diagnóstico e manutenção de cilindros, bombas, prensas e conjuntos hidráulicos com testes e registro do serviço realizado.',
    },
  },
  {
    slug: 'pneumatica-industrial',
    number: '06',
    shortName: 'Pneumática industrial',
    eyebrow: 'PNEUMÁTICA',
    heading: 'Manutenção pneumática para equipamentos que dependem de resposta consistente.',
    introduction:
      'Atendimento a compressores, bombas propulsoras, chaves de impacto, cilindros e outros equipamentos pneumáticos.',
    context:
      'Queda de desempenho, vazamento e funcionamento irregular precisam ser analisados além do sintoma aparente.',
    applications: ['Compressores', 'Chaves de impacto', 'Cilindros pneumáticos', 'Bombas propulsoras'],
    warningSigns: ['Vazamento de ar', 'Baixa pressão', 'Resposta lenta', 'Funcionamento intermitente'],
    cta: 'Solicitar avaliação pneumática',
    meta: {
      title: 'Manutenção Pneumática Industrial | Jotta Manutenções',
      description:
        'Atendimento a compressores, cilindros, chaves de impacto e conjuntos pneumáticos com diagnóstico, manutenção e testes.',
    },
  },
  {
    slug: 'eletrica-industrial',
    number: '07',
    shortName: 'Elétrica industrial',
    eyebrow: 'ELÉTRICA',
    heading: 'Manutenção elétrica com verificação funcional e documentação do serviço.',
    introduction:
      'Atendimento a geradores, painéis, ferramentas elétricas, máquinas de solda, paleteiras e outros equipamentos industriais.',
    context:
      'Falhas elétricas podem envolver alimentação, comando, proteção e componentes. A avaliação considera o equipamento como sistema.',
    applications: ['Geradores', 'Painéis e comandos', 'Máquinas de solda', 'Ferramentas elétricas'],
    warningSigns: ['Falha de partida', 'Desarme recorrente', 'Aquecimento', 'Comando sem resposta'],
    cta: 'Solicitar avaliação elétrica',
    meta: {
      title: 'Manutenção Elétrica Industrial | Jotta Manutenções',
      description:
        'Manutenção elétrica de geradores, painéis, ferramentas e equipamentos industriais com verificação funcional e documentação.',
    },
  },
];

const coreRoutes: PublicRoute[] = [
  {
    path: '/',
    kind: 'home',
    label: 'Início',
    eyebrow: 'MANUTENÇÃO INDUSTRIAL · DESDE 1994',
    heading: 'Manutenção industrial com método, documentação e rastreabilidade.',
    introduction:
      'Da condição de entrada à entrega, a Jotta organiza diagnóstico, intervenção, testes e registros para reduzir incertezas no atendimento.',
    meta: {
      title: 'Jotta Manutenções | Manutenção Industrial em João Monlevade',
      description:
        'Manutenção de equipamentos industriais com diagnóstico, execução, testes, laudos e rastreabilidade a partir de João Monlevade, Minas Gerais.',
    },
  },
  {
    path: '/empresa/',
    kind: 'company',
    label: 'Empresa',
    eyebrow: 'JOTTA MANUTENÇÕES · DESDE 1994',
    heading: 'Experiência construída onde manutenção precisa virar disponibilidade.',
    introduction:
      'Uma trajetória ligada à indústria, à recuperação de equipamentos e à responsabilidade de devolver cada ativo com informação.',
    meta: {
      title: 'Empresa | Jotta Manutenções desde 1994',
      description:
        'Conheça a trajetória, a estrutura e os compromissos técnicos da Jotta Manutenções, empresa de João Monlevade com atuação desde 1994.',
    },
  },
  {
    path: '/solucoes/',
    kind: 'solutions',
    label: 'Soluções',
    eyebrow: 'SETE FRENTES · UMA LÓGICA DE EXECUÇÃO',
    heading: 'Capacidade multidisciplinar para diferentes equipamentos e contextos.',
    introduction:
      'Identifique a disciplina mais próxima da sua necessidade e envie o contexto do equipamento para uma triagem técnica.',
    meta: {
      title: 'Soluções em Manutenção Industrial | Jotta Manutenções',
      description:
        'Explore sete frentes de manutenção industrial: talhas, lavadoras, ferrovia, mecânica, hidráulica, pneumática e elétrica.',
    },
  },
  {
    path: '/assistencia/',
    kind: 'assistance',
    label: 'Assistência Técnica',
    eyebrow: 'ASSISTÊNCIA TÉCNICA',
    heading: 'Procedimento correto, peça correta e evidência do que foi executado.',
    introduction:
      'A assistência técnica aproxima o serviço dos requisitos de cada fabricante e organiza a documentação necessária para o cliente.',
    meta: {
      title: 'Assistência Técnica Industrial | Jotta Manutenções',
      description:
        'Conheça o processo de assistência técnica da Jotta, com peças, testes, laudos, ART quando aplicável, garantia e rastreabilidade.',
    },
  },
  {
    path: '/metodo/',
    kind: 'method',
    label: 'Método Jotta',
    eyebrow: 'MÉTODO JOTTA · 07 ETAPAS',
    heading: 'Do chamado à entrega, cada etapa precisa deixar evidência.',
    introduction:
      'Um fluxo para organizar decisões, responsabilidades e documentos durante a manutenção de equipamentos industriais.',
    meta: {
      title: 'Método de Manutenção Industrial | Jotta Manutenções',
      description:
        'Conheça o fluxo da Jotta: solicitação, diagnóstico, orçamento, execução, teste, documentação e entrega do equipamento.',
    },
  },
  {
    path: '/cases/',
    kind: 'cases',
    label: 'Cases',
    eyebrow: 'CASES TÉCNICOS',
    heading: 'Evidências organizadas para quem precisa avaliar capacidade.',
    introduction:
      'Os registros públicos seguem uma estrutura de contexto, diagnóstico, intervenção, testes e documentação autorizada.',
    meta: {
      title: 'Cases de Manutenção Industrial | Jotta Manutenções',
      description:
        'Veja como a Jotta estrutura registros técnicos de manutenção com contexto, diagnóstico, intervenção, testes e documentação autorizada.',
    },
  },
  {
    path: '/conteudo/',
    kind: 'content',
    label: 'Conteúdo',
    eyebrow: 'CONTEÚDO TÉCNICO',
    heading: 'Informação para quem decide sobre manutenção, disponibilidade e risco.',
    introduction:
      'Artigos e registros revisados para apoiar decisões técnicas e comerciais relacionadas a equipamentos industriais.',
    meta: {
      title: 'Conteúdo Técnico | Jotta Manutenções',
      description:
        'Conteúdo sobre manutenção industrial, equipamentos, diagnóstico, documentação, garantia e disponibilidade operacional.',
    },
  },
  {
    path: '/book-tecnico/',
    kind: 'book',
    label: 'Book Técnico',
    eyebrow: 'BOOK TÉCNICO',
    heading: 'Um panorama da estrutura, das capacidades e do método da Jotta.',
    introduction:
      'Consulte o material consolidado para processos de homologação, apresentação interna e avaliação de capacidade.',
    meta: {
      title: 'Book Técnico | Jotta Manutenções',
      description:
        'Acesse o Book Técnico da Jotta com estrutura, áreas de atuação, processo, documentação e informações institucionais.',
    },
  },
  {
    path: '/contato/',
    kind: 'contact',
    label: 'Solicitação técnica',
    eyebrow: 'SOLICITAÇÃO TÉCNICA',
    heading: 'Quanto melhor o contexto, mais precisa pode ser a triagem.',
    introduction:
      'Informe a empresa, o equipamento e a condição atual para que a equipe possa definir o próximo contato.',
    meta: {
      title: 'Solicitar Avaliação Técnica | Jotta Manutenções',
      description:
        'Descreva sua empresa, equipamento e condição operacional para iniciar uma triagem técnica com a equipe da Jotta.',
    },
  },
  {
    path: '/privacidade/',
    kind: 'legal',
    label: 'Privacidade',
    eyebrow: 'PRIVACIDADE E DADOS',
    heading: 'Como os dados enviados pelo site devem ser tratados.',
    introduction:
      'Esta página apresenta os princípios de tratamento das informações fornecidas em solicitações e contatos digitais.',
    meta: {
      title: 'Política de Privacidade | Jotta Manutenções',
      description:
        'Consulte os princípios de privacidade aplicáveis aos dados enviados pelos formulários e canais digitais da Jotta Manutenções.',
    },
  },
  {
    path: '/cookies/',
    kind: 'legal',
    label: 'Cookies',
    eyebrow: 'PREFERÊNCIAS DE NAVEGAÇÃO',
    heading: 'Cookies necessários, escolhas claras e medição responsável.',
    introduction:
      'Entenda quais recursos são necessários ao funcionamento do site e como preferências de medição devem ser controladas.',
    meta: {
      title: 'Política de Cookies | Jotta Manutenções',
      description:
        'Veja como o site da Jotta utiliza recursos essenciais e como as preferências de cookies e medição podem ser administradas.',
    },
  },
];

const solutionRoutes: PublicRoute[] = solutions.map((solution) => ({
  path: `/solucoes/${solution.slug}/`,
  kind: 'solution',
  label: solution.shortName,
  eyebrow: `SOLUÇÃO ${solution.number} · ${solution.eyebrow}`,
  heading: solution.heading,
  introduction: solution.introduction,
  meta: solution.meta,
  solutionSlug: solution.slug,
}));

export const publicRoutes: PublicRoute[] = [
  ...coreRoutes.slice(0, 3),
  ...solutionRoutes,
  ...coreRoutes.slice(3),
];

export const routeByPath = new Map(publicRoutes.map((route) => [route.path, route]));

export function normalizePathname(pathname: string): string {
  if (pathname === '/') {
    return pathname;
  }

  return `${pathname.replace(/\/+$/, '')}/`;
}

export function findRoute(pathname: string): PublicRoute | undefined {
  return routeByPath.get(normalizePathname(pathname));
}

export function findSolution(slug?: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
