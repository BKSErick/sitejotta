# Design — Meta Pixel nos sites de demonstração

## Objetivo

Usar o dataset/pixel do CRM Erick (`1175331711422463`) para formar audiência de
remarketing a partir das visitas aos sites publicados da Jotta e da Metalthec,
sem registrar as visitas internas do Erick.

## Escopo aprovado

- Instalar o mesmo Pixel nos dois sites.
- Enviar `PageView` e `ViewContent`, distinguindo cada projeto pelo
  `content_name`.
- Carregar o Pixel somente após consentimento opcional.
- Aceitar `?crm_no_track=1` para gravar uma exclusão permanente no navegador.
- Aceitar `?crm_track=1` para remover a exclusão.
- Não usar IP como fonte de verdade: IP residencial pode mudar.
- Não implementar identificação individual de deals nesta etapa.

## Fluxo

1. A página processa a preferência interna antes de tentar carregar o Pixel.
2. Visitante sem escolha vê o banner de cookies.
3. `Aceitar medição` grava consentimento e inicializa o Pixel.
4. `Somente essenciais` mantém o Pixel bloqueado.
5. Navegador com exclusão interna nunca carrega `fbevents.js`, mesmo que tenha
   consentido anteriormente.

## Publicação

- Jotta: repositório `BKSErick/sitejotta`, domínio
  `https://sitejotta.vercel.app/`.
- Metalthec: repositório `BKSErick/SiteMETALTHEC`, domínio
  `https://site-metalthec.vercel.app/`.
- O projeto OpenAI Sites da Jotta permanece apenas como homologação; o alvo
  público desta entrega é o Vercel solicitado pelo usuário.

## Verificação

- Testes de preferência, consentimento e exclusão interna.
- Lint, typecheck, testes e build da Jotta.
- Teste Node e checagem sintática da Metalthec.
- Smoke público confirmando deploy e ausência do Pixel no modo interno.
