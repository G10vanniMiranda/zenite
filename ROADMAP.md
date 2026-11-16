# Zênite: análise e roadmap

## Análise do que havia

O site tinha duas partes: o hero (a ilha no céu) e um bloco de fechamento com os números da casa. O hero é forte; o resto não sustentava uma venda.

| Problema | Efeito |
|---|---|
| Os quatro links da nav ("Como funciona", "Simulação", "Obras", "Dúvidas") e os dois botões levavam para o mesmo bloco | Promessa quebrada: o visitante clica em "Simulação" e não há simulação |
| Nenhuma forma de contato | O site não gerava lead; a página terminava num rodapé |
| O prazo de 45 dias aparecia sem explicação | É o principal argumento da marca, mas sem etapas soa como slogan |
| Só uma casa como exemplo (conta de R$ 780) | Quem paga R$ 400 ou R$ 1.500 não se via ali |
| Nenhuma resposta às objeções comuns (conta zera? e à noite? telhado aguenta?) | O visitante sai para pesquisar e não volta |

## O que foi feito (fase 1)

Ordem da página, cada seção num arquivo próprio em `src/sections/`:

1. **Hero**: sem mudança, salvo o botão, que agora leva à simulação.
2. **O sistema dessa casa** (`fecho`): os números da casa do topo. O rodapé saiu daqui.
3. **Como funciona** (`etapas`): os 45 dias em quatro etapas (visita, distribuidora, instalação, vistoria), com uma barra que cresce ao entrar na tela.
4. **Simulação** (`simulacao`): slider de R$ 200 a R$ 2.000 que recalcula painéis, potência, geração, telhado, conta nova, economia no ano e retorno. A conta está em `src/data/simulacao.js`, calibrada para dar exatamente os números da casa do topo, com teste em `simulacao.test.js` (`npm test`).
5. **Sistemas** (`sistemas`): tabela com cinco faixas de conta, calculada pela mesma função, e a lista do que vem no preço. No celular a tabela vira cartões.
6. **Dúvidas** (`duvidas`): sete perguntas em `<details>`, acessíveis por teclado.
7. **Contato** (`contato`): volta ao céu da manhã (o sol é o asterisco da marca). Tem um formulário com nome, bairro e conta que valida e abre o WhatsApp com a mensagem e a simulação prontas. Nada é salvo no site. O rodapé com os links fica aqui.

A nav agora aponta para cada seção ("Obras" virou "Sistemas", porque não há obras reais para mostrar). As seções entram ao rolar (só `opacity` e `transform`); com movimento reduzido, tudo já aparece parado.

## Antes de lançar de verdade (P0)

- [ ] **Número de WhatsApp real** em `src/data/empresa.js`. O atual (`5562000000000`) é de exemplo.
- [ ] **Preço e tarifa reais** em `PARAM` (`src/data/simulacao.js`): custo por kWp por faixa de tamanho (sistemas pequenos custam mais por kWp), tarifa vigente da Equatorial Goiás e piso da conta por tipo de ligação.
- [ ] **Revisar o texto técnico** com o engenheiro responsável: prazos de cada etapa, garantias dos fabricantes usados, peso por painel.
- [ ] **Domínio próprio** na Vercel e `og:image` (print do hero) para quando o link for compartilhado no WhatsApp.

## Fase 2: confiança e conversão

- **Obras reais**: fotos de instalações, com autorização do cliente, conta antes e depois e cidade. Não inventar depoimentos nem selos.
- **Simulação parcelada**: parcela estimada lado a lado com a economia mensal.
- **Medição**: eventos de uso do slider, clique em "Pedir orçamento" e envio do formulário (Vercel Analytics ou Plausible, sem cookies de terceiros).
- **Backend de leads** (opcional): função na Vercel que grava o pedido numa planilha ou CRM antes de abrir o WhatsApp, com validação no servidor, limite de envios e aviso de privacidade (LGPD).

## Fase 3: busca local

- JSON-LD `LocalBusiness` com dados reais (endereço, telefone, horário, área atendida).
- `sitemap.xml`, `robots.txt` e canonical.
- Perfil da empresa no Google com o mesmo nome, telefone e endereço do site.
- Páginas por cidade atendida (Aparecida de Goiânia, Senador Canedo, Trindade), cada uma com obras daquela cidade.
- Conteúdo curto que responde busca real: bandeira tarifária, Lei 14.300 e Fio B, limpeza na seca.

## Fase 4: qualidade contínua

- Playwright no CI: prints do hero e da saída nos tamanhos do `CLAUDE.md`, mais um smoke test de cada seção, do slider e do formulário.
- Orçamento de Lighthouse (LCP da ilha, CLS zero) checado a cada deploy.
- Auditoria de acessibilidade com leitor de tela (slider, `<details>`, mensagens de erro do formulário).
