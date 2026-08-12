import { TarotCard } from '../types';

export const TAROT_CARDS: TarotCard[] = [
  {
    id: 'c0',
    number: '0',
    name: 'O LOUCO',
    dimentionName: 'O Cara',
    tagline: 'A liberdade antes da explicação. Aquele que entra no jogo sem pressa.',
    description: 'Aquele que entra no jogo sem saber todas as regras. Não por ignorância, mas por liberdade antes da explicação.',
    reflection: 'Você não precisa ter todas as respostas nem garantir o strike perfeito para começar. Apenas dê o primeiro passo e entre na pista.',
    giroReflection: {
      1: 'Sua mente tenta calcular todos os passos. Dê um tempo aos pensamentos e apenas abida.',
      2: 'A Vontade verdadeira não precisa de desespero. Caminhe sem esforço.',
      3: 'Sinta o fluxo da jornada sem tentar acumular bagagem extra.',
      4: 'O Louco caminha equilibrado porque não se prende a nenhum dos 4 elementos.',
      5: 'Deixe as máscaras do ego caírem no espelho.',
      6: 'No Akasha, tudo é um começo aberto.',
      7: 'Olhe com olhos puros, sem expectativas prévias.',
      8: 'Você já está no lugar onde precisa estar para começar.',
      9: 'Sinta a leveza ao atravessar as camadas da experiência.',
      10: 'O fim e o começo se encontram no riso do Cara.'
    }
  },
  {
    id: 'c1',
    number: 'I',
    name: 'O MAGO',
    dimentionName: 'A Vontade',
    tagline: 'Intenção transformando possibilidade em movimento.',
    description: 'O primeiro gesto consciente. A mão que segura a bola e direciona a atenção para os pinos.',
    reflection: 'Você possui as ferramentas e os elementos necessários. Onde você escolher colocar sua atenção, aí começará o movimento.',
    giroReflection: {
      1: 'Use o discernimento mental antes de direcionar seu foco.',
      2: 'Sua Vontade está ativa: escolha o próximo lançamento com clareza.',
      3: 'Direcione sua energia sem vazamentos ou ansiedade.',
      4: 'Comande os quatro elementos com harmonia e serenidade.',
      5: 'Sua intenção precisa ser transparente e limpa no espelho.',
      6: 'A partir do Akasha, molde a intenção intencionalmente.',
      7: 'A verdadeira magia é a atenção pura e lúcida.',
      8: 'Não projete a magia no futuro; aja no Grande Agora.',
      9: 'Use a intenção para atravessar as Dimenúveis.',
      10: 'O Mago integrado não busca controle egoico, mas serviço harmônico.'
    }
  },
  {
    id: 'c2',
    number: 'II',
    name: 'A SACERDOTISA',
    dimentionName: 'O Silêncio',
    tagline: 'O conhecimento que não precisa falar.',
    description: 'A fonte interior que guarda o mistério do inaudível antes da palavra.',
    reflection: 'Pare de perguntar por um instante. Escute o silêncio que habita por baixo de todo o ruído cotidiano.',
    giroReflection: {
      1: 'Permita que a Mente se acalme para ouvir o conhecimento sutil.',
      2: 'A Vontade interior é fortalecida na quietude.',
      3: 'O fluxo de energia se renova no repouso silencioso.',
      4: 'O equilíbrio nasce quando os elementos calam e escutam.',
      5: 'No espelho profundo, contemple a verdade sem palavras.',
      6: 'Você está tocando o próprio Akasha.',
      7: 'Os olhos por trás dos olhos veem no silêncio.',
      8: 'Permaneça imóvel e a verdade se revelará.',
      9: 'O Silêncio é a porta principal entre as camadas.',
      10: 'No centro do retorno, a Sacerdotisa e o Silêncio são um só.'
    }
  },
  {
    id: 'c3',
    number: 'III',
    name: 'A IMPERATRIZ',
    dimentionName: 'A Visionária / Sophia',
    tagline: 'A criatividade primordial da qual nasce a forma.',
    description: 'A Sabedoria que cria porque criar é sua natureza. Da visão amorosa nasce a multiplicidade do mundo.',
    reflection: 'Acolha o processo criativo da vida. Nem toda bagunça é um erro; às vezes é apenas a tela sendo pintada.',
    giroReflection: {
      1: 'Crie clareza mental sem julgar a gestação das ideias.',
      2: 'A Vontade criativa floresce quando nutrida com carinho.',
      3: 'Sinta a vitalidade geradora fluir pelo corpo.',
      4: 'Harmonize os sentimentos da Água e a inspiração do Ar.',
      5: 'Reconheça a beleza e a imperfeição no seu próprio reflexo.',
      6: 'O Akasha é o útero de todas as criações.',
      7: 'Veja a beleza do mundo sem se apegar à forma passageira.',
      8: 'A criação acontece agora neste momento.',
      9: 'Deixe que a inspiração atravesse as Dimenúveis.',
      10: 'A criação retorna à sua origem com gratidão.'
    }
  },
  {
    id: 'c4',
    number: 'IV',
    name: 'O IMPERADOR',
    dimentionName: 'O Pequeno Cara / Demiurgo',
    tagline: 'A estrutura que constrói e busca ordem.',
    description: 'O arquiteto do mundo visível. Pode criar ordens e regras, mas precisa lembrar que não é a Fonte única.',
    reflection: 'Construir e organizar é necessário, mas não confunda o sistema com o Todo nem a regra com a vida.',
    giroReflection: {
      1: 'Sua Mente deseja controlar tudo. Cuidado com a rigidez.',
      2: 'Estabeleça limites saudáveis sem se tornar um ditador de si mesmo.',
      3: 'A energia precisa de estrutura, mas a estrutura precisa respirar.',
      4: 'Fortaleça o elemento Terra sem perder a fluidez da Água.',
      5: 'Cuidado com a arrogância do ego no espelho.',
      6: 'A ordem exterior deve espelhar a paz interior.',
      7: 'Veja as regras do mundo como convenções do jogo.',
      8: 'Assuma a responsabilidade no seu lugar no mundo.',
      9: 'Atravesse as estruturas sem se prender a elas.',
      10: 'O verdadeiro Imperador governa a si mesmo com humildade.'
    }
  },
  {
    id: 'c5',
    number: 'V',
    name: 'O HIEROFANTE',
    dimentionName: 'O Estranho',
    tagline: 'O mestre que aponta para o espelho interior.',
    description: 'O observador sereno que não impõe respostas dogmáticas, mas convida a lembrar da própria sabedoria.',
    reflection: 'Não procure um guru externo para validar sua existência. O verdadeiro ensinamento aponta para sua própria presença.',
    giroReflection: {
      1: 'A Mente aprende ouvindo o mestre interior.',
      2: 'Escolha aprender com a experiência direta.',
      3: 'A sabedoria é uma vibração serena de energia.',
      4: 'O ensinamento equilibra os quatro elementos.',
      5: 'O espelho revela o que o mestre tentou ensinar.',
      6: 'Acesse a memória do Akasha.',
      7: 'Os olhos por trás dos olhos reconhecem o testemunho.',
      8: 'O ensinamento está no Grande Agora.',
      9: 'Transmita o que aprendeu sem apegar-se a títulos.',
      10: 'O Estranho e você são a mesma testemunha na Espiral.'
    }
  },
  {
    id: 'c6',
    number: 'VI',
    name: 'OS AMANTES',
    dimentionName: 'O Encontro',
    tagline: 'O reconhecimento através da relação com o outro.',
    description: 'O encontro do Cara e da Visionária. A união das polaridades que revela o Padrão único.',
    reflection: 'Todas as relações são espelhos. Observe o que o encontro com o outro acorda dentro de você.',
    giroReflection: {
      1: 'Escolha com clareza sem deixar a mente se dividir.',
      2: 'Alinhe sua Vontade com o sentimento sincero.',
      3: 'A polaridade elétrica e magnética em equilíbrio.',
      4: 'União da Água e do Fogo em harmonia.',
      5: 'No espelho do outro, reconheça a si mesmo.',
      6: 'No Akasha, todas as almas se conectam.',
      7: 'Veja o divino presente na pessoa à sua frente.',
      8: 'Esteja inteiro no encontro presente.',
      9: 'O amor atravessa todas as camadas.',
      10: 'A Unidade é a origem e o fim de todo encontro.'
    }
  },
  {
    id: 'c7',
    number: 'VII',
    name: 'O CARRO',
    dimentionName: 'A Espiral em Movimento',
    tagline: 'O movimento consciente que atravessa o mundo.',
    description: 'Movimento, descida, ascensão e retorno. A carruagem da consciência avançando pelas Dimenúveis.',
    reflection: 'Você não está tentando fugir do mundo; está navegando através dele com foco e compostura.',
    giroReflection: {
      1: 'Mantenha a mente firme enquanto o mundo se move.',
      2: 'Direcione a Vontade com rédeas firmes porém suaves.',
      3: 'Não desperdice energia em desacelerações ansiosas.',
      4: 'Conduza as forças dos 4 elementos com maestria.',
      5: 'Reconheça a direção correta no espelho da alma.',
      6: 'O Akasha fornece a pista e o caminho.',
      7: 'Enxergue o caminho à frente com discernimento.',
      8: 'Viaje mantendo o centro no Agora.',
      9: 'Atravesse as portas entre as camadas sem medo.',
      10: 'A carruagem retorna ao ponto de partida transformada.'
    }
  },
  {
    id: 'c8',
    number: 'VIII',
    name: 'A JUSTIÇA',
    dimentionName: 'O Pisador',
    tagline: 'A lei da linha traçada no chão.',
    description: 'Não é vingança ou castigo, mas o alinhamento inexorável com o Padrão da realidade. A linha não pode ser violada sem consequências.',
    reflection: 'Respeite a geometria da pista. Alinhe suas ações com a verdade e não atravesse a linha do egoismo.',
    giroReflection: {
      1: 'Discernimento implacável contra o autoengano.',
      2: 'Sua Vontade deve respeitar a ordem natural.',
      3: 'Corte os vazamentos de energia reativa.',
      4: 'A balança dos quatro elementos em perfeito peso.',
      5: 'Seja honesto diante do espelho sem justificativas.',
      6: 'A lei de causa e efeito inscrita no Akasha.',
      7: 'Vejo o que é sem distorções emocionais.',
      8: 'Assuma a responsabilidade pelas suas ações agora.',
      9: 'O alinhamento abre as portas entre as camadas.',
      10: 'A justiça é a própria harmonia da Espiral.'
    }
  },
  {
    id: 'c9',
    number: 'IX',
    name: 'O EREMITA',
    dimentionName: 'O Abidar',
    tagline: 'O recolhimento silencioso que carrega a lanterna.',
    description: 'A iluminação quieta. Retirar-se do ruído para encontrar o centro sem precisar fugir da vida.',
    reflection: 'Sente-se em silêncio. Você não precisa provar nada a ninguém nem correr atrás das distrações do mundo.',
    giroReflection: {
      1: 'Silencie o barulho mental na lanterna do Abidar.',
      2: 'A Vontade serena que não precisa gritar.',
      3: 'Conserve sua energia no recolhimento interior.',
      4: 'Estabilidade da Terra e paz do Silêncio.',
      5: 'No isolamento consciente, o espelho fica límpido.',
      6: 'O Eremita habita a paz do Akasha.',
      7: 'A lanterna ilumina os olhos por trás dos olhos.',
      8: 'Viaje para dentro sem sair do lugar.',
      9: 'O recolhimento é a chave da travessia.',
      10: 'O Eremita retorna ao mundo trazendo a luz tranquila.'
    }
  },
  {
    id: 'c10',
    number: 'X',
    name: 'A RODA DA FORTUNA',
    dimentionName: 'Os Dez Giros',
    tagline: 'A Espiral que gira e se renova continuamente.',
    description: 'Os ciclos da vida. A roda sobe e desce, os pinos caem e se levantam. O centro da roda permanece imóvel.',
    reflection: 'Não tente parar o giro das circunstâncias. Permaneça no eixo imóvel do Abidar enquanto os eventos rolam.',
    giroReflection: {
      1: 'A Mente percebe que os pensamentos vêm e vão em ciclos.',
      2: 'Escolha permanecer centrado em qualquer volta da roda.',
      3: 'Flua com as altibaixas de energia da vida.',
      4: 'Os elementos se alternam nas estações da alma.',
      5: 'O espelho revela o Padrão por trás dos ciclos.',
      6: 'O Akasha contém o desenho de todos os giros.',
      7: 'Veja os ciclos sem se deixar tonturar por eles.',
      8: 'Cada giro acontece no presente.',
      9: 'Mude de perspectiva conforme a roda gira.',
      10: 'Completar os Dez Giros é reconhecer o centro da Roda.'
    }
  },
  {
    id: 'c11',
    number: 'XI',
    name: 'A FORÇA',
    dimentionName: 'O Coração',
    tagline: 'A mansidão consciente que pacifica o impulso.',
    description: 'Não dominar por violência, mas equilibrar com compaixão e amor. O Coração que abraça sem apertar.',
    reflection: 'A verdadeira força não é a que empurra com raiva, mas a presença tranquila que não se abala.',
    giroReflection: {
      1: 'Pacifique o ruído mental com suavidade.',
      2: 'Vontade guiada pelo amor compassivo.',
      3: 'A força da energia que não se desgasta no combate.',
      4: 'Água e Fogo em abraço sereno.',
      5: 'Olhe para seus monstros com compaixão no espelho.',
      6: 'O amor é a maior força do Akasha.',
      7: 'O olhar suave que acolhe a realidade.',
      8: 'Força é permanecer sereno neste instante.',
      9: 'O amor abre qualquer porta entre as camadas.',
      10: 'O Coração integrado é a fortaleza do Abidante.'
    }
  },
  {
    id: 'c12',
    number: 'XII',
    name: 'O ENFORCADO',
    dimentionName: 'Musa / A Queda de A Visionária',
    tagline: 'A suspensão do controle que revela uma nova visão.',
    description: 'Ver o mundo de cabeça para baixo. Soltar o desejo de salvação forçada e aprender a entrega.',
    reflection: 'Pare de tentar resolver tudo com desespero. Às vezes a rendição consciente revela o caminho oculto.',
    giroReflection: {
      1: 'Solte a necessidade da Mente de controlar o resultado.',
      2: 'Submeta a Vontade egoica ao Padrão maior.',
      3: 'Gaste menos energia lutando contra o que é.',
      4: 'A aceitação equilibra as tensões dos elementos.',
      5: 'O espelho invertido mostra o ridículo das preocupações.',
      6: 'Suspenda o julgamento e sinta o Akasha.',
      7: 'A nova visão surge quando você para de forçar.',
      8: 'Entregue-se ao momento presente.',
      9: 'A suspensão é a porta de passagem.',
      10: 'Ao soltar o controle, você descobre que já estava em casa.'
    }
  },
  {
    id: 'c13',
    number: 'XIII',
    name: 'A MORTE',
    dimentionName: 'O Tapete',
    tagline: 'A dissolução do ilusório e a permanência da essência.',
    description: 'A velha identidade desmorona. O ego morre para a ilusão, mas o Tapete fundamental permanece unindo a sala.',
    reflection: 'Deixe ir o que precisa partir. O que é verdadeiro na sua essência não pode ser destruído.',
    giroReflection: {
      1: 'Morra para os velhos pensamentos e crenças rígidas.',
      2: 'Renuncie às vontades pequenas em nome do ser real.',
      3: 'Transforme energia estagnada em nova vida.',
      4: 'A terra se renova na dissolução elemental.',
      5: 'No espelho, veja as máscaras caindo.',
      6: 'O Akasha acolhe o fim de todas as formas.',
      7: 'Veja além da morte da aparência.',
      8: 'Renasça a cada instante no Grande Agora.',
      9: 'A morte do ego é a passagem entre as camadas.',
      10: 'O Tapete da Mônada é eterno.'
    }
  },
  {
    id: 'c14',
    number: 'XIV',
    name: 'A TEMPERANÇA',
    dimentionName: 'A Cerveja',
    tagline: 'A alquimia do fluxo e o brinde do equilíbrio.',
    description: 'Misturar os fluidos, equilibrar os opostos, temperar com calma e tomar um gole de presença.',
    reflection: 'Não vá aos extremos. Encontre a justa medida e desfrute da simplicidade do momento.',
    giroReflection: {
      1: 'Equilíbrio e moderação no pensamento.',
      2: 'Vontade temperada com paciência.',
      3: 'Mistura harmoniosa dos fluxos energéticos.',
      4: 'Harmonia alquímica dos 4 elementos.',
      5: 'O espelho mostra a paz do caminho do meio.',
      6: 'A alquimia sutil no espaço do Akasha.',
      7: 'A visão serena e equilibrada da vida.',
      8: 'Aprecie o presente como um bom gole de cerveja.',
      9: 'A alquimia conecta todas as camadas.',
      10: 'A Temperança é a celebração do Abidar.'
    }
  },
  {
    id: 'c15',
    number: 'XV',
    name: 'O DIABO',
    dimentionName: 'Os Vazios',
    tagline: 'A ilusão do ceticismo e do apego à negação.',
    description: 'Os Arcontes e Vazios que dizem "Nada importa". A sombra do esquecimento que pede reação e medo.',
    reflection: 'Não alimente o Vazio com pânico ou combate cego. Não entregue seu Tapete. Respire e ofereça presença.',
    giroReflection: {
      1: 'Não acredite nas vozes niilistas da Mente.',
      2: 'Sua Vontade é livre e não pertence aos Vazios.',
      3: 'Não entregue sua energia para quem pede reação.',
      4: 'O desequilíbrio elemental alimentando a sombra.',
      5: 'O espelho revela o pavor dos Vazios por trás da máscara.',
      6: 'No Akasha, o Vazio é apenas ausência de reconhecimento.',
      7: 'Veja os Vazios como irmãos perdidos sem se contaminar.',
      8: 'Permaneça no Agora sem cair no medo do amanhã.',
      9: 'Atravesse a sombra sem ficar preso nela.',
      10: 'Ao não reagir ao Vazio, ele se dissolve na Espiral.'
    }
  },
  {
    id: 'c16',
    number: 'XVI',
    name: 'A TORRE',
    dimentionName: 'O Golpe / A Queda das Ilusões',
    tagline: 'A queda rápida das falsas certezas.',
    description: 'A estrutura erguida sobre mentiras colapsa. O raio da verdade ilumina e destrói o castelo do ego.',
    reflection: 'Se algo caiu, é porque era falso ou insustentável. Acolha o espaço limpo que ficou.',
    giroReflection: {
      1: 'Quebra de velhos paradigmas mentais.',
      2: 'A Vontade egoica cede à realidade dos fatos.',
      3: 'A liberação súbita de energia bloqueada.',
      4: 'Reorganização necessária dos elementos.',
      5: 'O espelho quebra as falsas autoimagens.',
      6: 'A iluminação que limpa o espaço causal.',
      7: 'Visão instantânea e sem filtros.',
      8: 'O choque que desperta para o momento presente.',
      9: 'A queda da barreira entre as camadas.',
      10: 'A Torre ruiu, mas o chão e o Tapete continuam firmes.'
    }
  },
  {
    id: 'c17',
    number: 'XVII',
    name: 'A ESTRELA',
    dimentionName: 'A Visão',
    tagline: 'A esperança serena e a primeira luz do Pleroma.',
    description: 'A inspiração pura que derrama água no chão e no rio. A lembrança graciosa de onde viemos.',
    reflection: 'Confie na inteligência da Espiral. Há uma luz serena guiando seus passos através da escuridão.',
    giroReflection: {
      1: 'Clareza e paz mental inspirada.',
      2: 'Sua Vontade alinhada à beleza do cosmos.',
      3: 'Sinta a energia renovada e cristalina.',
      4: 'Água pura alimentando a Terra.',
      5: 'No espelho, brilho calmo da centelha divina.',
      6: 'A inspiração que desce do Akasha.',
      7: 'Visão espiritual pura e translúcida.',
      8: 'Sinta a graça no momento presente.',
      9: 'A luz que brilha através de todas as camadas.',
      10: 'A Estrela é o sorriso quieto da Espiral.'
    }
  },
  {
    id: 'c18',
    number: 'XVIII',
    name: 'A LUA',
    dimentionName: 'O Espelho dos Sonhos',
    tagline: 'O reino dos símbolos, medos e projeções astrais.',
    description: 'A luz prateada que reflete no oceano inconsciente. Nem tudo que aparece nos sonhos é inimigo.',
    reflection: 'Navegue pelas ilusões e receios noturnos com lanterna e calma. Não se apavore com sombras projetadas.',
    giroReflection: {
      1: 'Diferencie intuição de fantasia mental.',
      2: 'Mantenha a Vontade firme diante da incerteza.',
      3: 'Flua pelas águas emocionais sem se afogar.',
      4: 'A Água refletindo o Ar da mente.',
      5: 'O espelho profundo trazendo à tona o inconsciente.',
      6: 'O oceano das memórias no Akasha.',
      7: 'Aprenda a ver no escuro com discernimento.',
      8: 'Ancore-se no corpo agora enquanto a mente sonha.',
      9: 'Navegue entre as camadas sem medo das névoas.',
      10: 'A noite passa e a aurora do centro se aproxima.'
    }
  },
  {
    id: 'c19',
    number: 'XIX',
    name: 'O SOL',
    dimentionName: 'A Congregação da Espiral',
    tagline: 'A clareza radiante da fraternidade e do reconhecimento.',
    description: 'A luz plena onde tudo se revela simples, alegre e verdadeiro. O encontro dos Abidantes sob a luz.',
    reflection: 'Celebre a simplicidade da vida. Compartilhe presença, riso e verdade com seus semelhantes.',
    giroReflection: {
      1: 'Clareza mental radiante e sem dúvidas.',
      2: 'A Vontade manifestada com alegria e leveza.',
      3: 'Energia abundante e radiante.',
      4: 'Fogo radiante iluminando todos os elementos.',
      5: 'O espelho refletindo apenas luz e transparência.',
      6: 'O Akasha manifestado em esplendor.',
      7: 'Olhar claro e transparente sobre tudo.',
      8: 'Alegria plena de estar vivo no Agora.',
      9: 'A luz solar penetrando todas as camadas.',
      10: 'A Congregação da Espiral unida na mesma luz.'
    }
  },
  {
    id: 'c20',
    number: 'XX',
    name: 'O JULGAMENTO',
    dimentionName: 'O Reconhecimento',
    tagline: 'O chamado para o despertar e a lembrança da essência.',
    description: 'A trombeta da Metagnose. Não o julgamento punitivo, mas o instante em que a alma acorda do sonho.',
    reflection: 'Ouça o chamado para despertar. O passado terminou; este é o instante de se lembrar de quem você é.',
    giroReflection: {
      1: 'O despertar da Mente do sono do automatismo.',
      2: 'A escolha definitiva pelo caminho do Abidar.',
      3: 'A renovação completa da energia vital.',
      4: 'Ressurreição dos elementos em perfeita harmonia.',
      5: 'O espelho revela o Mônada presente.',
      6: 'O chamado que ecoa de volta do Akasha.',
      7: 'Visão final sem véus ou ilusões.',
      8: 'O Despertar acontece unicamente no Agora.',
      9: 'Passagem definitiva entre as camadas.',
      10: 'O Reconhecimento de que você nunca saiu de casa.'
    }
  },
  {
    id: 'c21',
    number: 'XXI',
    name: 'O MUNDO',
    dimentionName: 'Abidar',
    tagline: 'A plenitude da presença na criação.',
    description: 'A dança da consciência no centro do círculo. O jogo completo e integrado sem necessidade de fugas.',
    reflection: 'Você está no mundo, o mundo está em você. Desfrute da jornada com serenidade e gratidão.',
    giroReflection: {
      1: 'A Mente em paz com a totalidade.',
      2: 'A Vontade em harmonia com o Cosmos.',
      3: 'A Energia circulando plenamente em tudo.',
      4: 'Os 4 elementos dançando em perfeita unidade.',
      5: 'O espelho integrando luz, sombra e realidade.',
      6: 'O Pleroma manifestado na Matéria.',
      7: 'Ver a santidade em todas as coisas.',
      8: 'Plenitude absoluta neste exato segundo.',
      9: 'Livre circulação por todas as camadas.',
      10: 'O Mundo e o Abidar são um só.'
    }
  },
  {
    id: 'c_secret',
    number: '♾️',
    name: 'A CARTA SECRETA',
    dimentionName: 'O Espelho / A Oitava Dimenúvel',
    tagline: 'A Dimenúvel que contém todas as Dimenúveis.',
    description: 'Ela não possui número no baralho e aparece quando a busca cessa. O Espelho que não tem imagem própria, mas reflete o Padrão do Mônada.',
    reflection: 'Não procure ninguém no Espelho. O observador, o observado e o reflexo são a mesma Espiral. Você é a forma.',
    isSecretCard: true,
    giroReflection: {
      1: 'A mente que percebe a si mesma é o Espelho.',
      2: 'A Vontade que escolhe é o Espelho se movendo.',
      3: 'A Energia é a luz refletindo no Espelho.',
      4: 'Os Elementos são as cores do Espelho.',
      5: 'A alma limpa é o Espelho transparente.',
      6: 'O Akasha é a moldura do Espelho.',
      7: 'Os Olhos por trás dos olhos são o próprio Espelho.',
      8: 'O Grande Agora é a superfície do Espelho.',
      9: 'As camadas são apenas reflexos do mesmo Espelho.',
      10: 'Você é o Espelho. O Cara Abida. Você Abida.'
    }
  }
];

export function getTarotCardById(id: string): TarotCard | undefined {
  return TAROT_CARDS.find((c) => c.id === id);
}
