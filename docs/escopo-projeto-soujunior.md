# Escopo do projeto SouJunior

Documento de referência para a entrega do hackathon e a evolução da plataforma

Versão 1.0 · 24 de setembro de 2026

## 1 Contexto e finalidade

O projeto foi desenvolvido para o Hackathon da SouJunior, cujo desafio é criar uma landing page criativa e persuasiva para a campanha oficial no Apoia.se. A experiência deve explicar a causa, apresentar impacto e transparência, incentivar contribuições a partir de R$ 2 e facilitar o acesso aos canais da comunidade.

A solução amplia essa proposta com uma área autenticada para participantes e consoles de administração e moderação. A visão de produto é conectar a captação de apoio à participação contínua na comunidade, com reconhecimento de apoiadores, fóruns, eventos e ferramentas de gestão.

Este documento delimita a entrega atual, os requisitos da solução e as evoluções propostas. A landing page constitui a entrega central do desafio. A plataforma complementar combina integrações implementadas com interfaces demonstrativas. A existência de uma tela ou botão não representa, por si só, uma operação completa disponível em produção.

## 2 Objetivos e público

O objetivo principal é tornar clara a importância de apoiar a SouJunior e oferecer um caminho direto até sua campanha no Apoia.se. Como objetivos complementares, o projeto busca estimular a continuidade do apoio, facilitar a descoberta de atividades e organizar o trabalho das pessoas responsáveis pela comunidade.

Os públicos contemplados são visitantes interessados na causa, participantes da comunidade, apoiadores e integrantes da operação com papéis de moderador, administrador e superadministrador. A proposta de reconhecimento do apoio não estabelece pagamento como condição geral de participação na comunidade.

## 3 Limites da entrega

A entrega do hackathon compreende a landing page, a base de autenticação e perfil, a gestão integrada de usuários e a demonstração navegável dos módulos comunitários e operacionais. O prazo informado pela equipe motivou a manutenção de parte desses módulos em frontend com dados simulados.

Neste documento, “implementado” identifica código e integração presentes no repositório; “demonstrativo” identifica interfaces alimentadas por dados locais ou ações sem persistência; e “evolução proposta” identifica trabalho posterior. A homologação dos fluxos no ambiente de entrega permanece uma etapa própria de aceite.

Não há compromisso de prazo, orçamento ou adoção institucional para as evoluções propostas. Sua inclusão depende de priorização pela equipe e alinhamento com a SouJunior.

## 4 Mapa da entrega atual

| Módulo | Situação | Limite da entrega |
| --- | --- | --- |
| Landing page | Implementado | Conteúdo, seções e links externos; métricas e depoimentos exigem validação editorial |
| Autenticação | Implementado | Integração Supabase; depende da configuração de e-mail e OAuth no ambiente |
| Perfil | Implementado | Edição de nome e foto; conexão de provedores depende de configuração |
| Usuários e permissões | Implementado | Consulta, alteração de papel, banimento e reversão com controles no servidor |
| Painel do participante | Demonstrativo | Indicadores e trilha de apoio fixos, sem conciliação de contribuições |
| Prêmios | Demonstrativo | Conquistas ilustrativas, sem concessão automática ou resgate |
| Fórum | Demonstrativo | Categorias navegáveis; publicação, respostas e curtidas sem persistência |
| Eventos | Demonstrativo | Agenda e telas de gestão; inscrições e aprovações não concluídas |
| Publicações e moderação | Demonstrativo | Listagem, busca e filtros; ações editoriais não concluídas |
| Doações e auditoria | Demonstrativo | Dados locais, sem sincronização financeira ou trilha real de auditoria |

## 5 Requisitos funcionais

### RF01 Apresentação da causa e conversão

A landing page deve apresentar causa, destinação de recursos, impacto, níveis de apoio, depoimentos, transparência, ecossistema e perguntas frequentes. As chamadas de contribuição devem direcionar para https://apoia.se/soujunior. A solução não processa pagamentos dentro da aplicação. Discord, WhatsApp e GitHub devem estar acessíveis por links oficiais validados.

### RF02 Identidade e acesso

A aplicação deve oferecer cadastro e login por e-mail e senha, confirmação de cadastro, recuperação e redefinição de senha, saída da sessão e fluxo de autenticação com Google. As áreas privadas devem verificar autenticação e papel no servidor. O uso de provedores externos depende da configuração das credenciais e URLs de retorno.

### RF03 Perfil e gestão de usuários

O participante deve poder editar nome de exibição e foto de perfil. A gestão de usuários deve permitir consulta e busca, visualização de papel e status, banimento, reversão de banimento e alteração de papel dentro das permissões implementadas. Ações administrativas devem apresentar resultado de sucesso ou erro e atualizar a listagem quando aplicável.

### RF04 Jornada de apoio e reconhecimento

O painel deve demonstrar tempo de apoio, contribuição acumulada, conquistas e progresso na trilha de reconhecimento. Os prêmios representam selos e marcos de participação, com nomes como Primeiro Commit e Fundador. A confirmação do apoio, as condições de elegibilidade e a concessão automática são evoluções propostas. Prêmios materiais, sorteios e benefícios financeiros não fazem parte da entrega atual.

### RF05 Comunidade e operação

O fórum deve demonstrar a organização de conversas em oito comunidades: Dev, DevOps, Data, PM Produtos, QA, UX, Agile e Clube do Livro. A agenda deve apresentar atividades e chamadas de participação. Os consoles devem demonstrar acompanhamento de publicações, eventos, indicadores e doações; o superadministrador também dispõe de uma interface de auditoria. Os dados e as ações ainda demonstrativos devem ser identificados na apresentação da entrega.

## 6 Papéis e responsabilidades de acesso

| Papel | Área principal | Responsabilidade prevista |
| --- | --- | --- |
| Visitante | Landing page e login | Conhecer a causa, acessar canais e seguir para o Apoia.se |
| Participante | Dashboard e perfil | Consultar a jornada demonstrativa, eventos, prêmios e fórum; editar perfil |
| Moderador | Console de moderação | Acompanhar publicações e eventos nas interfaces demonstrativas |
| Administrador | Console administrativo | Gerir usuários e consultar módulos operacionais demonstrativos |
| Superadministrador | Console de superadministração | Gerir papéis e usuários e consultar a interface adicional de auditoria |

Os consoles verificam papéis específicos: ADMIN, MODERATOR e SUPER_ADMIN. No comportamento atual, ser superadministrador não concede automaticamente acesso à rota do console de administrador. O perfil é acessível a usuários autenticados.

As ações administrativas impedem o banimento da própria conta e a alteração do próprio papel. Administradores não podem modificar superadministradores nas ações verificadas; a alteração de papel por administrador está limitada à promoção de usuário comum para moderador. Papéis são mantidos em metadados de aplicação do Supabase e alterados por operações de servidor.

## 7 Requisitos de qualidade e arquitetura

A base técnica utiliza Next.js 16, React 19, TypeScript, Tailwind, shadcn/ui e Supabase. O projeto adota o sistema visual Industry, com componentes compartilhados, tokens de tema e identidade consistente entre a landing page e os painéis. A abertura da landing page utiliza uma visualização tridimensional com Three.js.

Como requisitos de aceite, a aplicação deve funcionar em telas móveis e desktop, oferecer navegação por teclado e foco visível, utilizar rótulos compreensíveis nos formulários e manter contraste adequado. Esses itens representam metas de qualidade e não uma certificação de acessibilidade já obtida.

As rotas e ações privadas devem verificar a sessão e as permissões no servidor. Credenciais privilegiadas devem permanecer no servidor. Formulários devem validar os dados e informar erros sem expor informações sensíveis. Dados reais de membros não devem ser usados como conteúdo público de demonstração.

A landing page possui estrutura de metadados, sitemap e robots. O aceite técnico deve incluir lint, verificação de tipos e testes pertinentes aos fluxos integrados. A existência de testes no repositório não substitui a execução e a verificação do ambiente publicado.

## 8 Fora do escopo da entrega atual

- Processamento de pagamentos, assinatura ou cancelamento dentro da aplicação.
- Sincronização automática com o Apoia.se e conciliação de contribuições.
- Concessão automática, resgate ou entrega de prêmios e benefícios.
- Persistência de tópicos, comentários, curtidas e decisões de moderação.
- Inscrição, confirmação de presença, aprovação e cancelamento efetivos de eventos.
- Contabilidade, emissão fiscal e relatórios financeiros oficiais.
- Auditoria operacional real, exportações completas e atualização de indicadores em tempo real.
- Aplicativo móvel nativo e substituição integral de Discord, WhatsApp ou GitHub.

## 9 Critérios de aceite da entrega

Os critérios abaixo orientam a homologação pela equipe. Não representam resultados de testes já executados.

| ID | Critério | Evidência esperada |
| --- | --- | --- |
| CA01 | Landing page apresenta a causa, apoio, transparência e canais | Revisão das seções e dos links oficiais em desktop e mobile |
| CA02 | Conteúdo institucional é verificável | Fontes e autorização para métricas e depoimentos, ou identificação explícita de demonstração |
| CA03 | Cadastro, login, recuperação e logout funcionam no ambiente | Execução dos fluxos com contas de teste; provedores habilitados verificados |
| CA04 | Acesso respeita autenticação e papel | Tentativas permitidas e negadas para cada console e ação privada |
| CA05 | Perfil e usuários mantêm alterações autorizadas | Persistência conferida após recarregar; restrições administrativas verificadas |
| CA06 | Módulos demonstrativos são navegáveis e identificados | Navegação, buscas e filtros sem apresentar mocks como operações reais |
| CA07 | Entrega técnica pode ser reproduzida | Configuração documentada e resultados de lint, tipos e testes aplicáveis |

A apresentação pode demonstrar os módulos complementares sem executar botões ainda sem operação implementada. A aceitação da demonstração não equivale à liberação desses módulos para uso real pela comunidade.

## 10 Dependências e riscos

A operação dos fluxos integrados depende de um projeto Supabase configurado, variáveis de ambiente, credenciais administrativas protegidas, serviço de e-mail e provedores OAuth habilitados. A demonstração dos consoles exige contas com os papéis correspondentes.

A evolução da integração com o Apoia.se depende da confirmação de um mecanismo autorizado e tecnicamente viável para obter contribuições e associá-las às contas da comunidade. Não se pressupõe disponibilidade de API, webhook ou acesso aos dados dos apoiadores.

O principal risco de comunicação é apresentar métricas, doações e conquistas demonstrativas como dados reais. A mitigação é validar as fontes com a SouJunior e identificar claramente a natureza dos exemplos. Os níveis de apoio e os benefícios também devem ser aprovados antes de assumir compromissos com apoiadores.

Para a expansão do produto, será necessário definir e versionar o modelo de dados, as migrações e as políticas de acesso dos módulos persistentes. A ausência dessas definições impede considerar fórum, eventos, prêmios e finanças prontos para produção.

## 11 Evolução proposta e decisões pendentes

Primeiro, consolidar a entrega: validar conteúdo e links, homologar autenticação, perfil e usuários e corrigir problemas identificados na demonstração. Em seguida, definir dados, permissões e persistência para fórum, publicações e eventos.

A etapa de apoio e reconhecimento deverá estabelecer a correspondência entre conta e contribuição, tratamento de cancelamentos e pagamentos pendentes e regras de concessão ou revogação de selos. A integração com o Apoia.se só deve avançar após confirmação de viabilidade e autorização.

Por fim, estruturar auditoria real, notificações, relatórios e observabilidade conforme a necessidade operacional. Essa sequência é uma proposta de priorização, sem datas ou estimativas aprovadas.

Permanecem para decisão: responsáveis por conteúdo e operação; fontes oficiais das métricas; regras dos prêmios; acesso a eventuais benefícios exclusivos; mecanismo de integração financeira; e prioridade dos módulos após o hackathon. Alterações de escopo devem registrar objetivo, impacto e critérios de aceite antes da implementação.

## 12 Referências

Desafio oficial do Hackathon SouJunior: https://hackathon.soujunior.tech/#/2_desafio_site_soujunior.tech

Campanha oficial de apoio: https://apoia.se/soujunior

Referências técnicas do projeto: README.md; docs/routes.md; docs/auth.md; docs/architecture.md; docs/database.md; componentes de landing page e plataforma em app/; ações em lib/actions/; configurações de navegação em components/common/nav-configs.ts; dados demonstrativos em lib/mock/admin/ e nos componentes do dashboard.
