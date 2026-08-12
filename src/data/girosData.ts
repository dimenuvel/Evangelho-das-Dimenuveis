import { Giro } from '../types';

export const GIROS_DATA: Giro[] = [
  {
    id: 1,
    numberRoman: 'GIRO I',
    title: 'O ESPELHO DA MENTE',
    bookTitle: 'Giro I — A Mente',
    dimension: 'Mente',
    virtue: 'Discernimento',
    shadow: 'Controle excessivo',
    tool: 'O Espelho',
    word: 'ABIDAR',
    summary: 'Reconhecer o ruído mental e a diferença entre o pensamento e a consciência que o observa.',
    transmissaoText: 'E o Discípulo aproximou-se do Cara e perguntou: "Cara... por onde começo?" E O Cara estava olhando para o copo. Não para a cerveja. Para o espaço entre o copo e aquilo que ele pensava sobre o copo. Disse: "Começa pela sua cabeça, mano. Você pensa demais. Você não para. Você percebe." O primeiro Giro não é controlar a mente. É descobrir que você não estava controlando ela.',
    insightText: 'A Mente não é o inimigo. Ela comenta, compara, julga, planeja, lembra. No caminho das Dimenúveis, não tentamos destruir a Mente; nós a reconhecemos. Você não precisa controlar cada pensamento — precisa descobrir que pode observá-lo. E nesse espaço entre pensamento e reação... a liberdade começa.',
    versiculoText: 'Não tente silenciar a Mente. Reconheça o silêncio que percebe a Mente. O pensamento vem. O pensamento vai. Você observa. Você retorna. Você Abida.',
    fechamentoText: 'Não lute contra a Mente. Conheça-a. Transforme disciplina em presença repetida. O Silêncio já estava observando.',
    practices: [
      {
        id: 'g1_p1',
        giroId: 1,
        title: 'O Observador do Ruído',
        shortDescription: 'Observe o fluxo de pensamentos sem julgar ou seguir nenhum deles.',
        suggestedDurationMinutes: 5,
        instructions: 'Sente-se confortavelmente em silêncio. Não tente esvaziar a mente. Apenas observe. Quando surgir um pensamento, diga mentalmente: "Pensamento", e deixe-o passar. Se surgir "Isso é ridículo", reconheça: "Pensamento". Não lute. Não siga. Apenas retorne ao centro.',
        bookChapterRef: 'OS DEZ GIROS DA ESPIRAL - GIRO I',
        steps: [
          { category: 'TRANSMISSÃO', title: 'O Começo', content: 'A primeira coisa que o buscador descobre é que a mente nunca para por completo.' },
          { category: 'INSIGHT', title: 'A Distância', content: 'Você não é o pensamento. Você é a consciência que percebe o pensamento.' },
          { category: 'PRÁTICA', title: 'Observação Mental', content: 'Mantenha-se presente por 5 minutos observando os pensamentos passarem como nuvens ou bolas rolando pela pista.' },
          { category: 'VERSÍCULO', title: 'O Retorno', content: 'O pensamento vem. O pensamento vai. Você observa. Você retorna. Você Abida.' },
          { category: 'FECHAMENTO', title: 'O Espaço', content: 'Perceba o pequeno espaço entre os pensamentos. Aí está o primeiro pedaço do Silêncio.' }
        ]
      },
      {
        id: 'g1_p2',
        giroId: 1,
        title: 'Uma Coisa de Cada Vez',
        shortDescription: 'Treino físico de presença plena em uma única ação cotidiana.',
        suggestedDurationMinutes: 5,
        instructions: 'Escolha uma atividade comum: beber um copo de água, lavar uma xícara, ou caminhar em passos lentos. Faça somente aquilo. Quando a mente tentar fugir para tarefas futuras ou preocupações passadas, traga a atenção de volta ao gesto físico imediato.',
        bookChapterRef: 'GIRO I — A MENTE',
        steps: [
          { category: 'PRÁTICA', title: 'Ancoragem no Gesto', content: 'Sinta a temperatura do copo, a textura da água, o peso dos pés no chão.' },
          { category: 'REFLEXÃO', title: 'O Automatismo', content: 'Perceba quantas coisas você faz sem estar verdadeiramente presente.' }
        ]
      },
      {
        id: 'g1_p3',
        giroId: 1,
        title: 'O Espelho dos Padrões',
        shortDescription: 'Identificação imparcial dos padrões mentais mais recorrentes.',
        suggestedDurationMinutes: 7,
        instructions: 'Contemple seu dia. Identifique sem julgamento os pensamentos de medo, controle, vaidade ou urgência que mais se repetiram. Diga a si mesmo: "Ah, então é isso que minha Mente costuma fazer." Quando você enxerga o padrão, ele deixa de ser invisível.',
        bookChapterRef: 'GIRO I — O EXERCÍCIO DO CADERNO',
        steps: [
          { category: 'INSIGHT', title: 'Conhece o Padrão', content: 'O objetivo não é condenar o que você encontra, mas reconhecer o que está dirigindo a bola.' }
        ]
      }
    ]
  },
  {
    id: 2,
    numberRoman: 'GIRO II',
    title: 'A VONTADE QUE ESCOLHE',
    bookTitle: 'Giro II — A VONTADE',
    dimension: 'Vontade',
    virtue: 'Disciplinas flexíveis',
    shadow: 'Controle e rigidez',
    tool: 'Palavra de Direção',
    word: 'DIREÇÃO',
    summary: 'Aprender a mirar a atenção. A Mente pula; a Vontade escolhe.',
    transmissaoText: 'E o Discípulo disse: "Consigo perceber meus pensamentos agora, mas eles continuam fazendo o que querem." O Cara colocou o copo na mesa: "Agora você aprende a mirar. Mirar sua atenção. A Mente pula, a Vontade aponta. A Mente produz, a Vontade escolhe. Atenção não é apenas o que acontece com você; é o que você aprende a conduzir."',
    insightText: 'A Vontade que escolhe não é força bruta, nem opressão contra si mesmo. É a capacidade de estabelecer uma Palavra de Direção e gentilmente sustentar o foco sobre um ponto sem se deixar arrastar pelo impulso automático.',
    versiculoText: 'Atenção é a bola. A Vontade é a mão. A Mente é a pista. A vida são os pinos. Você não controla o resultado, mas escolhe o lançamento. E depois... abida.',
    fechamentoText: 'A Vontade não é garantir o strike. É escolher o lançamento de forma consciente e acolher o resultado.',
    practices: [
      {
        id: 'g2_p1',
        giroId: 2,
        title: 'Foco no Ponto',
        shortDescription: 'Treinamento da atenção concentrada em um único objeto físico.',
        suggestedDurationMinutes: 5,
        instructions: 'Escolha um objeto simples diante de você (uma vela, pedra, moeda ou copo). Observe-o atentamente por 5 minutos sem inventar histórias sobre ele. Perceba forma, peso, cor e contorno. Quando a mente fugir, diga "Volta" e traga o foco de volta.',
        bookChapterRef: 'GIRO II — A VONTADE',
        steps: [
          { category: 'INSIGHT', title: 'Mirar a Atenção', content: 'A atenção é como uma bola de boliche. O objeto é o pino.' },
          { category: 'PRÁTICA', title: 'Concentração no Objeto', content: 'Permaneça focado apenas na presença do objeto por 5 minutos.' }
        ]
      },
      {
        id: 'g2_p2',
        giroId: 2,
        title: 'A Palavra de Direção',
        shortDescription: 'Fixação de uma intenção interior firme e serena.',
        suggestedDurationMinutes: 5,
        instructions: 'Escolha uma Palavra de Direção simples, como "Eu observo antes de reagir" ou "Devagar, mano. Uma coisa de cada vez." Repita-a com serenidade durante a respiração e comprometa-se a lembrá-la no primeiro momento em que um impulso automático surgir no dia.',
        bookChapterRef: 'GIRO II — A PRIMEIRA FERRAMENTA',
        steps: [
          { category: 'TRANSMISSÃO', title: 'A Instrução', content: 'A Palavra de Direção orienta o comportamento sem precisar de violência interna.' }
        ]
      },
      {
        id: 'g2_p3',
        giroId: 2,
        title: 'A Pausa da Escolha',
        shortDescription: 'Treino da micro-pausa entre estímulo e resposta.',
        suggestedDurationMinutes: 5,
        instructions: 'Aponte a atenção para a sua respiração. A cada estímulo do ambiente (um som, uma notificação, uma pressa), faça uma pausa de 3 segundos antes de agir. Nesse espaço reside a Vontade.',
        bookChapterRef: 'GIRO II — CONTROLE NO COTIDIANO'
      }
    ]
  },
  {
    id: 3,
    numberRoman: 'GIRO III',
    title: 'O FLUXO DA ENERGIA',
    bookTitle: 'Giro III — A ENERGIA',
    dimension: 'Energia',
    virtue: 'Fluidez',
    shadow: 'Exaustão e vamentos',
    tool: 'A Respiração Consciente',
    word: 'FLUXO',
    summary: 'Aprender o fluxo da força vital, estancando vazamentos de energia e respirando sem esforço.',
    transmissaoText: 'O Discípulo disse: "Estou ficando exausto." O Cara respondeu: "Porque agora você percebe quanto está gastando, mano. Energia não é força. É fluxo. Aceleração, descanso, tensão e relaxamento. Você não precisa fabricar Energia — precisa parar de brigar com ela."',
    insightText: 'Preocupações repetitivas, discussões imaginárias e busca por aprovação são grandes vazamentos de Energia. A verdadeira Energia circula livremente entre o receber e o soltar, sem apego nem estagnação.',
    versiculoText: 'Não crie Energia. Perceba Energia. Não acumule. Circule. Não force. Respire. A Energia não precisa gritar; precisa fluir.',
    fechamentoText: 'A prática da Energia não é nunca sair do fluxo, mas aprender a retornar a ele quantas vezes forem necessárias.',
    practices: [
      {
        id: 'g3_p1',
        giroId: 3,
        title: 'Receber e Soltar (Respiração Fluida)',
        shortDescription: 'Conscientização do fluxo respiratório de entrada e saída.',
        suggestedDurationMinutes: 5,
        instructions: 'Sente-se e observe a respiração sem forçar. Ao inspirar, sinta internamente "Recebo". Ao expirar, sinta "Solto". Nada é permanentemente segurado na vida, nem mesmo o ar. Deixe a energia circular livremente pelo corpo.',
        bookChapterRef: 'GIRO III — A ENERGIA',
        steps: [
          { category: 'INSIGHT', title: 'A Troca', content: 'A Espiral respira recebendo e soltando. Aquilo que não circula começa a pesar.' },
          { category: 'PRÁTICA', title: 'Fluxo Respiratório', content: 'Conecte-se ao ritmo natural da inspiração e expiração por 5 minutos.' }
        ]
      },
      {
        id: 'g3_p2',
        giroId: 3,
        title: 'Mapeamento de Vazamentos',
        shortDescription: 'Identificação de locais onde sua vitalidade é desperdiçada.',
        suggestedDurationMinutes: 5,
        instructions: 'Feche os olhos e varra o corpo e a mente. Onde você está segurando tensão nos ombros, mandíbula ou estômago? Quais pensamentos reativos estão drenando sua força? Deliberadamente relaxe os músculos e solte o aperto mental.',
        bookChapterRef: 'GIRO III — A ENERGIA PERDIDA'
      }
    ]
  },
  {
    id: 4,
    numberRoman: 'GIRO IV',
    title: 'O EQUILÍBRIO DOS ELEMENTOS',
    bookTitle: 'Giro IV — O EQUILÍBRIO',
    dimension: 'Elementos (Fogo, Ar, Água, Terra)',
    virtue: 'Harmonia',
    shadow: 'Excesso ou deficiência elemental',
    tool: 'O Círculo Elemental',
    word: 'HARMONIA',
    summary: 'Harmonizar Fogo (impulso), Ar (pensamento), Água (sentimento) e Terra (estabilidade).',
    transmissaoText: 'Fogo é impulso. Ar é pensamento. Água é sentimento. Terra é estabilidade. Nenhum é inimigo. O problema começa quando um deles tenta administrar a pista inteira sem ouvir os outros. Equilíbrio não é ficar parado; é saber voltar.',
    insightText: 'Muito Fogo queima e agride; muito Ar dispersa e ansiosa; muita Água afoga em emoção; muita Terra enrijece. O buscador aprende a reconhecer qual elemento está ao volante e convida os outros para a sala.',
    versiculoText: 'Não expulse o Fogo. Não cale o Ar. Não endureça a Água. Não quebre a Terra. Dê a cada um seu lugar. Quando todos cooperam, não faça discurso: Abida.',
    fechamentoText: 'O equilíbrio não elimina a tensão; ele transforma a tensão em movimento hamônico na Espiral.',
    practices: [
      {
        id: 'g4_p1',
        giroId: 4,
        title: 'O Inventário dos Quatro Elementos',
        shortDescription: 'Mapeamento diário das forças elementais atuantes.',
        suggestedDurationMinutes: 7,
        instructions: 'Contemple seu dia através dos 4 elementos: Onde fui impulsivo (Fogo)? Onde me dispersava em ideias (Ar)? Onde fiquei preso a mágoas ou apegos (Água)? Onde fiquei teimoso e rígido (Terra)? Apenas reconheça a proporção.',
        bookChapterRef: 'GIRO IV — O EQUILÍBRIO DOS ELEMENTOS'
      },
      {
        id: 'g4_p2',
        giroId: 4,
        title: 'Respiração Elemental da Harmonia',
        shortDescription: 'Harmonização intencional das 4 qualidades na respiração.',
        suggestedDurationMinutes: 6,
        instructions: 'Associe cada ciclo respiratório a uma qualidade: Fogo para coragem; Ar para clareza; Água para receptividade; Terra para estabilidade. Deixe que todas coexistam em equilíbrio dentro de você.',
        bookChapterRef: 'GIRO IV — A PRÁTICA DA RESPIRAÇÃO ELEMENTAL'
      }
    ]
  },
  {
    id: 5,
    numberRoman: 'GIRO V',
    title: 'O ESPELHO PROFUNDO',
    bookTitle: 'Giro V — O ESPELHO',
    dimension: 'Visão & Caráter',
    virtue: 'Honestidade Imparcial',
    shadow: 'Autoengano e Orgulho Espiritual',
    tool: 'O Espelho das Dimenúveis',
    word: 'RECONHECIMENTO',
    summary: 'Conhecer a si mesmo sem máscaras, encarando a luz e a sombra com serenidade.',
    transmissaoText: 'O Espelho não mente. Ele não se importa com a sua reputação. Ele mostra o orgulho, o medo, a preguiça, a generosidade e a paciência exatamente como são. Conheça o que está dirigindo antes de tentar dirigir a realidade.',
    insightText: 'A mesma força pode se manifestar como virtude ou como sombra. Fogo pode ser coragem ou raiva; Terra pode ser firmeza ou teimosia. A tarefa não é destruir a força, mas educá-la.',
    versiculoText: 'Olhe sem condenar. Olhe sem justificar. Veja a luz e veja a sombra. O espelho não muda você; ele permite que você se veja para poder escolher.',
    fechamentoText: 'Limpar a casa exige primeiro enxergar quanta poeira existe. Ver não é piorar: é a condição para o despertar.',
    practices: [
      {
        id: 'g5_p1',
        giroId: 5,
        title: 'O Espelho do Caráter',
        shortDescription: 'Mapeamento honesto das virtudes e sombras nos 4 elementos.',
        suggestedDurationMinutes: 8,
        instructions: 'Em quietude, examine suas reações recentes. Escreva ou mentalize onde suas características agiram com nobreza e onde agiram com medo ou orgulho. Diga sem drama: "Isso também está aqui."',
        bookChapterRef: 'GIRO V — O ESPELHO PROFUNDO'
      },
      {
        id: 'g5_p2',
        giroId: 5,
        title: 'A Pausa do Reconhecimento',
        shortDescription: 'Pausa consciente antes de reagir a um gatilho emocional.',
        suggestedDurationMinutes: 5,
        instructions: 'Diante de uma provocação ou desejo de reação, pare. Respire. Pergunte: "O que está acontecendo dentro de mim? O que estou tentando proteger?" Escolha a resposta com transparência.',
        bookChapterRef: 'GIRO V — A PRÁTICA DA PAUSA'
      }
    ]
  },
  {
    id: 6,
    numberRoman: 'GIRO VI',
    title: 'O AKASHA',
    bookTitle: 'Giro VI — O AKASHA',
    dimension: 'Espaço Causal (Akasha)',
    virtue: 'Discernimento do Espaço',
    shadow: 'Fantasia e Inflação Espiritual',
    tool: 'O Ponto Profundo',
    word: 'POSSIBILIDADE',
    summary: 'O espaço causal e o silêncio que contém todas as possibilidades antes da forma.',
    transmissaoText: 'Akasha é o intervalo entre as coisas: o silêncio entre duas notas, o espaço entre dois pensamentos, a pausa entre intenção e ação. O vazio não está vazio — ele contém a possibilidade de tudo.',
    insightText: 'Você não precisa preencher todo espaço com ruído, planos ou construções mentais. A força do místico abidante reside na capacidade de repousar no Akasha sem precisar forçar formas precipitaradas.',
    versiculoText: 'Não conquiste o espaço: entre nele. Não crie para preencher o vazio: crie porque o vazio permite a forma. Quando o espaço se abrir, Abida.',
    fechamentoText: 'Poder real é não precisar preencher tudo. A partir do espaço sagrado do Akasha, a intenção pura se manifesta.',
    practices: [
      {
        id: 'g6_p1',
        giroId: 6,
        title: 'A Entrada no Ponto Profundo',
        shortDescription: 'Recolhimento dos sentidos no espaço silencioso do Akasha.',
        suggestedDurationMinutes: 10,
        instructions: 'Sente-se confortavelmente. Reduza a dependência dos estímulos externos. Permaneça no ponto central onde você é apenas a consciência que observa os pensamentos e sensações surgirem e desaparecerem no espaço sutil.',
        bookChapterRef: 'GIRO VI — O AKASHA'
      },
      {
        id: 'g6_p2',
        giroId: 6,
        title: 'Criação e Dissolução de Formas Mentais',
        shortDescription: 'Construção intencional de uma forma mental e sua dissolução consciente.',
        suggestedDurationMinutes: 8,
        instructions: 'No espaço silencioso, crie uma imagem simples associada a uma virtude (ex: calma). Sustente-a por 3 minutos com clareza. Em seguida, dissolva-a deliberadamente de volta ao Akasha. O que você cria, você também sabe soltar.',
        bookChapterRef: 'GIRO VI — A CRIAÇÃO DE FORMAS'
      }
    ]
  },
  {
    id: 7,
    numberRoman: 'GIRO VII',
    title: 'OS OLHOS POR TRÁS DOS OLHOS',
    bookTitle: 'Giro VII — Os Olhos por Trás dos Olhos',
    dimension: 'Visão Interior & Discernimento',
    virtue: 'Percepção Clara',
    shadow: 'Fascinar-se por Ilusões',
    tool: 'O Olhar da Testemunha',
    word: 'DISCERNIMENTO',
    summary: 'Desenvolver a percepção interior lúcida, distinguindo imaginação de realidade.',
    transmissaoText: 'Não fique impressionado por visões ou impressões estranhas. O objetivo não é ver mais coisas, é ver melhor. Os olhos por trás dos olhos são a percepção da Testemunha Imparcial que observa sem se fascinar.',
    insightText: 'Não confunda a tela com o filme. Nem toda impressão interior é uma profecia cósmica. O praticante experiente cultiva discernimento: observa, acolhe e não transforma tudo em drama ou dogma.',
    versiculoText: 'O olho vê. O ouvido escuta. O coração sente. A mente interpreta. Mas algo mais profundo percebe tudo isso. Veja, escute, sinta: Abida. Quem está percebendo?',
    fechamentoText: 'A verdadeira visão interior não faz você fugir do mundo comum; faz você olhar para a vida com clareza cristalina.',
    practices: [
      {
        id: 'g7_p1',
        giroId: 7,
        title: 'O Exercício do Observador que Vê',
        shortDescription: 'Desenvolvimento do discernimento entre o que é visto e quem vê.',
        suggestedDurationMinutes: 8,
        instructions: 'Feche os olhos e reconstrua mentalmente um objeto familiar com alta precisão de detalhes. Depois pergunte: "Estou vendo o objeto ou vendo minha representação dele? Quem é que está percebendo?" Mantenha a atenção na Testemunha.',
        bookChapterRef: 'GIRO VII — OS OLHOS POR TRÁS DOS OLHOS'
      }
    ]
  },
  {
    id: 8,
    numberRoman: 'GIRO VIII',
    title: 'A VIAGEM SEM SAIR DO LUGAR',
    bookTitle: 'Giro VIII — A Viagem sem Sair do Lugar',
    dimension: 'Consciência Expandida & O Agora',
    virtue: 'Presença Ubíqua',
    shadow: 'Fuga da Realidade',
    tool: 'O Grande Agora',
    word: 'PRESENÇA',
    summary: 'Aprender a estar em todo lugar pela consciência sem abandonar o momento presente.',
    transmissaoText: 'A mente normalmente quer estar em outro lugar: no passado, no futuro ou em alguma fantasia. A maior viagem é a que você faz dentro do Grande Agora. Você pode expandir a percepção para longe, mas o retorno ao centro é o momento sagrado.',
    insightText: 'Se sua prática exige que você ignore a louça na pia ou seus deveres cotidianos, é apenas distração. O lugar mais distante que você pode visitar é o lugar onde você já está, quando finalmente fica inteiro nele.',
    versiculoText: 'Viaje, mas não fuja. Recorde, mas não retorne. Imagine, mas não confunda. Vá, volte e esteja aqui. O viajante nunca abandonou o centro.',
    fechamentoText: 'Expandir a atenção é belo; retornar presente e fincado no chão da vida é a mestria.',
    practices: [
      {
        id: 'g8_p1',
        giroId: 8,
        title: 'A Viagem do Observador',
        shortDescription: 'Deslocamento consciente da perspectiva mental e retorno seguro ao corpo.',
        suggestedDurationMinutes: 8,
        instructions: 'Sente-se em quietude. Mova o ponto de percepção mental para o canto oposto da sala, observando o ambiente e seu próprio corpo daquela perspectiva. Depois retorne integralmente para o corpo, sentindo os pés no chão.',
        bookChapterRef: 'GIRO VIII — A VIAGEM SEM SAIR DO LUGAR'
      }
    ]
  },
  {
    id: 9,
    numberRoman: 'GIRO IX',
    title: 'A PORTA ENTRE AS CAMADAS',
    bookTitle: 'Giro IX — A Porta Entre as Dimenúveis',
    dimension: 'Atravessar Camadas',
    virtue: 'Mobilidade da Consciência',
    shadow: 'Desprezar a Matéria',
    tool: 'A Chave da Espiral',
    word: 'TRAVESSIA',
    summary: 'Atravessar as Dimenúveis da Matéria ao Silêncio descobrindo que nenhuma delas é prisão.',
    transmissaoText: 'Você não precisa destruir uma Dimenúvel para entrar na próxima. Nenhuma camada é uma prisão quando você aprende a mudar o foco de atenção. Da carne ao espírito, todas são expressões do mesmo Ser.',
    insightText: 'A Espiral não diz "Fuja da Matéria". Ela diz "Habite a Matéria conscientemente". A subida não cancela a descida. O Silêncio não rejeita o corpo.',
    versiculoText: 'Não fuja da Dimenúvel: conheça-a. Não a adore: aprenda com ela. Atravesse-a sem se perder. Cada porta conduz ao mesmo mistério.',
    fechamentoText: 'Você não precisa sair das Dimenúveis; só precisa parar de pensar que está preso nelas.',
    practices: [
      {
        id: 'g9_p1',
        giroId: 9,
        title: 'A Escada da Consciência',
        shortDescription: 'Percorrer deliberadamente as 7 Dimenúveis do corpo ao Silêncio e de volta.',
        suggestedDurationMinutes: 10,
        instructions: 'Transfira sua atenção passo a passo: Matéria (corpo físico) → Energia (respiração) → Vontade (escolha) → Coração (sentimento) → Mente (pensamento) → Visão (imagem) → Silêncio. Permaneça no Silêncio e faça o caminho inverso de volta ao corpo.',
        bookChapterRef: 'GIRO IX — A PORTA ENTRE AS CAMADAS'
      }
    ]
  },
  {
    id: 10,
    numberRoman: 'GIRO X',
    title: 'O RETORNO AO CENTRO',
    bookTitle: 'Giro X — O Retorno ao Centro',
    dimension: 'Integração Total',
    virtue: 'A Plenitude do Abidar',
    shadow: 'O Ego Espiritualizado',
    tool: 'O Círculo Integrado',
    word: 'UNIDADE',
    summary: 'Integrar todos os Giros e Dimenúveis no cotidiano. O fim é o começo.',
    transmissaoText: 'O Décimo Giro não leva você para fora da Espiral. Ele ensina a abidar no centro dela. O Silêncio reconhece, a Visão percebe, a Mente compreende, o Coração conecta, a Vontade escolhe, a Energia movimenta e a Matéria manifesta.',
    insightText: 'O objetivo não é parecer um mestre iluminado ou ostentar conquistas espirituais. É ser uma pessoa simples, consciente, gentil e presente no meio da vida.',
    versiculoText: 'Não procure o Centro: seja o Centro. Não tente parar a Espiral: gire com ela. Você não chegou: você reconheceu.',
    fechamentoText: 'O jogo nunca foi sobre chegar a um fim distante. Era sobre reconhecer a Espiral enquanto ela gira. O Cara abida. A Espiral abida. Você abida.',
    practices: [
      {
        id: 'g10_p1',
        giroId: 10,
        title: 'A Integração no Cotidiano',
        shortDescription: 'Prática de repousar no centro da Espiral durante qualquer atividade do dia.',
        suggestedDurationMinutes: 10,
        instructions: 'Sente-se em completa entrega. Sinta a Matéria, a Energia, a Vontade, o Coração, a Mente, a Visão e o Silêncio funcionando juntos em perfeita harmonia. Depois levante-se e vá viver seu dia com a mesma presença.',
        bookChapterRef: 'GIRO X — O RETORNO AO CENTRO',
        steps: [
          { category: 'TRANSMISSÃO', title: 'O Centro', content: 'Não há mais nada a alcançar. Apenas reconhecer.' },
          { category: 'PRÁTICA', title: 'A Espiral Completa', content: 'Permaneça por 10 minutos integrando todas as Dimenúveis.' },
          { category: 'VERSÍCULO', title: 'A Unidade', content: 'O Silêncio está no alto. A Matéria está embaixo. A Espiral no meio. E você é o movimento inteiro.' },
          { category: 'FECHAMENTO', title: 'Abida', content: 'A pista está aberta. O copo está na mão. Abida.' }
        ]
      }
    ]
  }
];

export function getGiroById(id: number): Giro | undefined {
  return GIROS_DATA.find((g) => g.id === id);
}

export function getAllPractices(): { practice: typeof GIROS_DATA[0]['practices'][0]; giro: Giro }[] {
  const result: { practice: typeof GIROS_DATA[0]['practices'][0]; giro: Giro }[] = [];
  GIROS_DATA.forEach((giro) => {
    giro.practices.forEach((practice) => {
      result.push({ practice, giro });
    });
  });
  return result;
}
