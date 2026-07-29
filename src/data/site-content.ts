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
    heading: 'Antes de elevar a carga, reduza a incerteza sobre o equipamento.',
    introduction:
      'Freio, corrente, comando e segurança fazem parte do mesmo sistema. A avaliação precisa enxergar o conjunto antes da intervenção.',
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
    heading: 'Recupere pressão, vazão e previsibilidade de uso.',
    introduction:
      'A triagem conecta o sintoma à bomba, ao acionamento e aos componentes antes de definir o serviço.',
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
    heading: 'Equipamento de via parado não espera uma resposta genérica.',
    introduction:
      'A avaliação considera esforço, impacto, aplicação e condição de entrada para orientar a intervenção.',
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
    heading: 'Trocar peça sem entender a falha só adia a próxima parada.',
    introduction:
      'Folga, desgaste e desalinhamento são sinais. O diagnóstico organiza o que precisa ser recuperado, substituído e verificado.',
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
    heading: 'Vazamento é sintoma. O diagnóstico precisa enxergar o conjunto.',
    introduction:
      'Cilindros, bombas, prensas e unidades hidráulicas exigem leitura de pressão, força, movimento e condição dos componentes.',
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
    heading: 'Resposta irregular pede diagnóstico além da linha de ar.',
    introduction:
      'Vazamento, pressão e acionamento precisam ser avaliados em conjunto para recuperar uma resposta operacional consistente.',
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
    heading: 'Desarme recorrente não se resolve com tentativa e erro.',
    introduction:
      'Alimentação, comando, proteção e componentes entram na mesma leitura antes da intervenção e da verificação funcional.',
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
    heading: 'Três décadas devolvendo equipamentos à operação — com informação junto.',
    introduction:
      'Desde 1994, a Jotta transforma experiência de oficina em diagnóstico, execução controlada e registros que ajudam o cliente a decidir.',
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
    heading: 'Sete frentes técnicas. Um único padrão de controle.',
    introduction:
      'Do equipamento de elevação ao conjunto hidráulico, a disciplina muda. A lógica permanece: entender, intervir, testar e registrar.',
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
    heading: 'A peça certa resolve a falha. A evidência certa reduz a próxima dúvida.',
    introduction:
      'A Jotta conecta aplicação, procedimento, teste e documentação para que o cliente saiba o que entrou, o que foi feito e o que está sendo entregue.',
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
    heading: 'Cada etapa fecha uma incerteza antes da entrega.',
    introduction:
      'Da solicitação ao registro final, o Método Jotta organiza decisões, responsabilidades e evidências em sete movimentos.',
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
    heading: 'Capacidade não se declara. Se demonstra.',
    introduction:
      'Os cases serão publicados somente quando contexto, intervenção, teste e documentação puderem ser apresentados com autorização.',
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
    heading: 'Quem decide manutenção precisa de critério, não de conteúdo genérico.',
    introduction:
      'Conteúdo revisado para transformar sintomas, processo e documentação em decisões técnicas mais bem informadas.',
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
    heading: 'Avalie a capacidade da Jotta antes de colocar um ativo na bancada.',
    introduction:
      'Estrutura, disciplinas, processo e documentação reunidos em um material para homologação e avaliação técnica.',
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
    heading: 'Descreva o equipamento. A triagem começa com contexto, não com chute.',
    introduction:
      'Um formulário, todos os dados essenciais e nenhum passo escondido. A equipe recebe o contexto necessário para definir o próximo contato.',
    meta: {
      title: 'Solicitar Avaliação Técnica | Jotta Manutenções',
      description:
        'Informe nome, telefone, empresa e tipo de equipamento para iniciar um contato técnico com a equipe da Jotta.',
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

export interface AuthorizedBrand {
  name: string;
  file: string;
  scope: string;
}

/**
 * Assistências técnicas autorizadas. Cada marca é prova verificável de terceiro —
 * não incluir nenhuma sem autorização vigente confirmada pela Jotta.
 */
export const authorizedBrands: AuthorizedBrand[] = [
  { name: 'Bosch', file: 'bosch.png', scope: 'Ferramentas elétricas' },
  { name: 'Makita', file: 'makita.png', scope: 'Ferramentas elétricas' },
  { name: 'DeWalt', file: 'dewalt.png', scope: 'Ferramentas elétricas' },
  { name: 'Milwaukee', file: 'milwaukee.png', scope: 'Ferramentas elétricas' },
  { name: 'Kärcher', file: 'karcher.png', scope: 'Lavadoras industriais' },
  { name: 'Ingersoll Rand', file: 'ingersoll.png', scope: 'Pneumática e elevação' },
  { name: 'Kito', file: 'kito.png', scope: 'Talhas e elevação' },
  { name: 'Cattini', file: 'cattini.png', scope: 'Talhas e elevação' },
  { name: 'Berg', file: 'berg.png', scope: 'Talhas e elevação' },
  { name: 'Paletrans', file: 'paletrans.png', scope: 'Movimentação de carga' },
  { name: 'Bovenau', file: 'bovenau.png', scope: 'Movimentação de carga' },
  { name: 'Puma', file: 'puma.png', scope: 'Compressores' },
  { name: 'Bozza', file: 'bozza.png', scope: 'Compressores' },
  { name: 'Branco', file: 'branco.png', scope: 'Motores e geradores' },
  { name: 'Marcon', file: 'marcon.png', scope: 'Equipamentos industriais' },
];

export interface ShowcaseBrand {
  name: string;
  logo: string;
  /** Linha de produto atendida. */
  line: string;
  claim: string;
  /** Fundo da marca. A ordem da lista alterna matiz para a troca ficar perceptível. */
  color: string;
  /** Cor do texto sobre o fundo da marca. */
  ink: 'light' | 'dark';
  /** Slug do vídeo em /media/marcas/{video}.mp4 + poster .jpg */
  video: string;
  /** Movimento que o clipe mostra — vira o rótulo sob o vídeo. */
  motionLabel: string;
  specs: [string, string][];
}

/** A ordem alterna matiz de propósito: em sequência, duas marcas de cor próxima
 *  fazem a troca de fundo passar despercebida. */
export const showcaseBrands: ShowcaseBrand[] = [
  {
    name: 'Cattini',
    logo: 'cattini.png',
    line: 'Macacos série MAMMUT',
    claim: 'Elevação hidráulica de alta capacidade. O cilindro é testado sob carga antes da liberação.',
    color: '#f2b705',
    ink: 'dark',
    video: 'cattini',
    motionLabel: 'CURSO DO CILINDRO',
    specs: [
      ['LINHA', 'MAMMUT'],
      ['SISTEMA', 'Hidráulico'],
      ['ESCOPO', 'Cilindro, vedação e teste'],
    ],
  },
  {
    name: 'Bovenau',
    logo: 'bovenau.png',
    line: 'Empilhadeiras e movimentação',
    claim: 'Elevação, mastro e acionamento são avaliados em conjunto antes de liberar a carga.',
    color: '#1b4f8a',
    ink: 'light',
    video: 'bovenau',
    motionLabel: 'ELEVAÇÃO DO MASTRO',
    specs: [
      ['LINHA', 'Movimentação'],
      ['SISTEMA', 'Elétrico-hidráulico'],
      ['ESCOPO', 'Mastro, comando e teste'],
    ],
  },
  {
    name: 'Kärcher',
    logo: 'karcher.png',
    line: 'Extratoras e lavadoras',
    claim: 'Bomba, pressão e acionamento são verificados juntos — o sintoma raramente está na mangueira.',
    color: '#ffed00',
    ink: 'dark',
    video: 'karcher',
    motionLabel: 'CIRCUITO DE SUCÇÃO',
    specs: [
      ['LINHA', 'Industrial'],
      ['SISTEMA', 'Alta pressão'],
      ['ESCOPO', 'Bomba, vedação e pressão'],
    ],
  },
  {
    name: 'Makita',
    logo: 'makita.png',
    line: 'Ferramentas elétricas',
    claim: 'Motor, escova, rolamento e acionamento entram na mesma leitura antes da intervenção.',
    color: '#007681',
    ink: 'light',
    video: 'makita',
    motionLabel: 'ACIONAMENTO DO MANDRIL',
    specs: [
      ['LINHA', 'Profissional'],
      ['SISTEMA', 'Elétrico'],
      ['ESCOPO', 'Motor, escova e mandril'],
    ],
  },
];

export interface VideoRecord {
  id: string;
  title: string;
  description: string;
  duration: string;
  /** 16/9 nos institucionais, 9/16 nos clipes verticais. */
  ratio: '16/9' | '9/16';
}

/**
 * Registros em vídeo do canal da Jotta. Entram como facade do YouTube: o embed
 * real só é injetado no clique, então nenhuma página paga o custo do player
 * nem grava cookie de terceiro em quem não assistiu.
 *
 * Fora desta lista: "Capacidade que surpreende", que é b-roll sem locução e
 * virou o loop do herói e os stills das páginas.
 */
export const videoRecords: VideoRecord[] = [
  {
    id: 'FbFb9d2CqxI',
    title: 'Compromisso e capacidade',
    description:
      'Apresentação institucional: trajetória, frentes de atuação, rede autorizada e estrutura.',
    duration: '2:38',
    ratio: '16/9',
  },
  {
    id: 'YHC0VrAqHoo',
    title: 'Assistência autorizada Milwaukee',
    description:
      'A parceria com a Milwaukee e o alcance do atendimento na região metropolitana de Belo Horizonte.',
    duration: '0:35',
    ratio: '16/9',
  },
  {
    id: 'KdiIpVvG9-c',
    title: 'Estrutura preparada',
    description: 'Percurso pela oficina mostrando como os processos ficam organizados.',
    duration: '0:29',
    ratio: '9/16',
  },
  {
    id: 'wJ6IFrumids',
    title: 'Indústria de manutenção',
    description: 'Como a operação da Jotta se organiza para atender demanda industrial.',
    duration: '1:03',
    ratio: '9/16',
  },
  {
    id: 'vqsPWl8DwgM',
    title: 'Teste de bomba elétrica',
    description: 'Verificação funcional registrada antes da liberação do equipamento.',
    duration: '0:32',
    ratio: '9/16',
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
