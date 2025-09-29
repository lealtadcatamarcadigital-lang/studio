export interface Event {
  date: string;
  location: string;
  description?: string;
  matches?: string[];
}

export interface PPVEvent extends Event {
  name: string;
  coverUrl?: string;
}

export interface MonthData {
  month: string;
  monthId: string;
  raw: Event[];
  smackdown: Event[];
  ppvs: PPVEvent[];
}

export const WWF_2000_DATA: MonthData[] = [
  {
    month: 'Enero',
    monthId: 'january',
    raw: [
      {
        date: '3',
        location: 'Miami',
        description: 'La era McMahon-Helmsley continúa su dominio. Triple H defiende su Campeonato de la WWF contra The Big Show, mientras The Rock se enfrenta a una dura prueba.',
        matches: [
          'Test vs. The Big Boss Man',
          'Kurt Angle vs. Kane',
          'Dudley Boyz vs. The Acolytes',
          'WWF Championship: Triple H vs. The Big Show',
        ],
      },
      {
        date: '10',
        location: 'St. Louis',
        description: 'La rivalidad entre The Rock y la facción McMahon-Helmsley se intensifica. The Rock se enfrenta a Triple H y The Big Show en una lucha en desventaja.',
        matches: [
          'The New Age Outlaws vs. The Acolytes',
          'The Hardy Boyz vs. Edge & Christian',
          'Handicap Match: The Rock vs. Triple H & The Big Show',
          'Kane vs. Albert',
        ],
      },
      {
        date: '17',
        location: 'New Haven',
        description: 'Una noche de sorpresas con la llegada de un nuevo y peligroso competidor a la WWF. La tensión para Royal Rumble está en su punto más alto.',
        matches: [
          'Test vs. The Big Boss Man',
          'Kurt Angle vs. Steve Blackman',
          'The Hardy Boyz vs. The New Age Outlaws',
          'Kane vs. The Rock',
        ],
      },
      {
        date: '24',
        location: 'Philadelphia',
        description: 'La noche después del Royal Rumble. Cactus Jack solidifica su estatus como una amenaza real para Triple H. The Rock busca venganza.',
        matches: [
          'Edge & Christian vs. The Dudley Boyz',
          'Chris Jericho vs. Hardcore Holly',
          'Kane vs. X-Pac',
          'WWF Championship: Triple H vs. Mankind (Cactus Jack)',
        ],
      },
      {
        date: '31',
        location: 'Pittsburgh',
        description: 'Se empiezan a formar las historias para No Way Out. The Rock se gana una oportunidad por el título en el PPV.',
        matches: [
          'The Rock vs. The Big Show',
          'Chris Jericho vs. Perry Saturn',
          'D-Generation X (Triple H, X-Pac & The New Age Outlaws) vs. Cactus Jack, The Rock & The Acolytes',
        ],
      },
    ],
    smackdown: [
      {
        date: '6',
        location: 'Orlando',
        description: 'The Rock y la facción McMahon-Helmsley siguen en pie de guerra. Se anuncian más participantes para el Royal Rumble.',
        matches: [
          'Edge & Christian vs. The Hardy Boyz',
          'Chris Jericho vs. Hardcore Holly',
          'Mankind vs. Al Snow',
          'The Rock vs. Kurt Angle & Triple H',
        ],
      },
      {
        date: '13',
        location: 'Chicago',
        description: 'The Rock se une a The Acolytes para enfrentarse a la poderosa D-Generation X. La tensión entre los participantes del Royal Rumble es palpable.',
        matches: [
          'WWF Tag Team Championship: The New Age Outlaws vs. The Godfather & D\'Lo Brown',
          'WWF Intercontinental Championship: Chris Jericho vs. Chyna',
          'Kane vs. The Big Show',
          'The Rock & The Acolytes vs. D-Generation X (Triple H, X-Pac & Billy Gunn)',
        ],
      },
      {
        date: '20',
        location: 'Providence',
        description: 'El último show antes del Royal Rumble. Las superestrellas intentan ganar impulso antes del gran evento.',
        matches: [
          'Test vs. Gangrel',
          'WWF European Championship: Val Venis vs. Edge',
          'The Hardy Boyz vs. The Dudley Boyz',
          'The Rock vs. Rikishi',
        ],
      },
      {
        date: '27',
        location: 'Baltimore',
        description: 'Cactus Jack interrumpe el "funeral" de Mankind organizado por Triple H. Kane y The Rock se enfrentan en un combate sin descalificación.',
        matches: [
          'Kurt Angle vs. Test',
          'WWF Tag Team Championship: The New Age Outlaws vs. The Hollys',
          'Rikishi vs. The Big Show',
          'No Disqualification Match: The Rock vs. Kane',
        ],
      },
    ],
    ppvs: [
      {
        date: '23',
        name: 'Royal Rumble',
        location: 'New York, NY (Madison Square Garden)',
        description: '¡El camino a WrestleMania comienza aquí! 30 superestrellas compiten en el Royal Rumble Match por una oportunidad por el título en el evento principal. Además, Triple H defiende el Campeonato de la WWF contra Cactus Jack en una brutal Street Fight. ¡Esta noche marca el impactante debut de Tazz!',
        matches: [
          'Tazz vs. Kurt Angle',
          'Tag Team Tables Match: The Hardy Boyz vs. The Dudley Boyz',
          'WWF Intercontinental Championship: Chris Jericho vs. Chyna vs. Hardcore Holly',
          'WWF Championship Street Fight: Triple H vs. Cactus Jack',
          'The 30-Man Royal Rumble Match',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tTjKnnIVd0zfC5lXeev05qpV0Sb.jpg',
      },
    ],
  },
  {
    month: 'Febrero',
    monthId: 'february',
    raw: [
      {
        date: '7',
        location: 'Dallas',
        description: '¡Una noche que cambió la WWF para siempre! Cuatro superestrellas de la competencia invaden RAW, presentándose como The Radicalz. Este evento marca el debut de Chris Benoit, Eddie Guerrero, Dean Malenko y Perry Saturn.',
        matches: [
          'The Radicalz (Chris Benoit, Eddie Guerrero, Dean Malenko & Perry Saturn) vs. D-Generation X (Triple H, X-Pac, & The New Age Outlaws)',
          'Kurt Angle vs. The Rock',
          'The Hardy Boyz vs. The Dudley Boyz',
        ],
      },
      {
        date: '14',
        location: 'San José',
        description: 'The Rock y The Big Show luchan por la oportunidad de ir al evento principal de WrestleMania. Triple H continúa su reinado de terror.',
        matches: [
          'WrestleMania Title Shot: The Rock vs. The Big Show',
          'Kane vs. Chris Benoit',
          'The New Age Outlaws vs. Edge & Christian',
        ],
      },
      {
        date: '21',
        location: 'Atlanta',
        description: 'La tensión entre The Rock, The Big Show y Triple H llega a un punto crítico a solo días de No Way Out.',
        matches: [
          'WWF Tag Team Championship: The New Age Outlaws vs. The Hardy Boyz',
          'WWF Intercontinental Championship: Chris Jericho vs. Kurt Angle',
          'The Rock & Cactus Jack vs. Triple H & X-Pac',
        ],
      },
      {
        date: '28',
        location: 'Hartford',
        description: 'La noche después de No Way Out. The Rock es el contendiente número uno, pero The Big Show reclama que él también merece la oportunidad. Comienza la intriga de la familia McMahon.',
        matches: [
          'The Hardy Boyz vs. The Acolytes',
          'Rikishi vs. Chris Benoit',
          'The Rock vs. Triple H',
        ],
      },
    ],
    smackdown: [
      {
        date: '3',
        location: 'Detroit',
        description: 'Se pacta una lucha Hell in a Cell para No Way Out entre Triple H y Cactus Jack, con la carrera de Cactus en juego.',
        matches: [
          'WWF Intercontinental Championship: Chris Jericho vs. Perry Saturn',
          'The Rock vs. Kurt Angle',
          'The New Age Outlaws vs. Al Snow & Steve Blackman',
        ],
      },
      {
        date: '10',
        location: 'Austin',
        description: 'The Radicalz continúan causando impacto. The Rock se enfrenta a una dura prueba contra uno de los recién llegados.',
        matches: [
          'The Rock vs. Chris Benoit',
          'WWF Tag Team Championship: The New Age Outlaws vs. Edge & Christian',
          'Kane vs. Perry Saturn',
        ],
      },
      {
        date: '17',
        location: 'Fresno',
        description: 'Kane se vuelve contra X-Pac. La rivalidad entre Kurt Angle y Chris Jericho se calienta antes de su lucha por el Título Intercontinental.',
        matches: [
          'WWF European Championship: Kurt Angle vs. Chyna',
          'Rikishi vs. Dean Malenko',
          'The Rock & Cactus Jack vs. The New Age Outlaws',
        ],
      },
      {
        date: '24',
        location: 'Nashville',
        description: 'El último show antes de No Way Out. The Rock se une a Kane para enfrentarse a The Big Show y Triple H.',
        matches: [
          'The Hardy Boyz & Chris Jericho vs. The Radicalz (Benoit, Saturn, Guerrero)',
          'WWF Women\'s Championship: Jacqueline vs. Ivory',
          'The Rock & Kane vs. The Big Show & Triple H',
        ],
      },
    ],
    ppvs: [
      {
        date: '27',
        name: 'No Way Out',
        location: 'Hartford, CT',
        description: 'Triple H y Cactus Jack se enfrentan en un legendario Hell in a Cell por el Campeonato de la WWF, con la carrera de Cactus Jack en juego. Además, The Rock y The Big Show compiten por una oportunidad por el título en WrestleMania.',
        matches: [
          'WWF Intercontinental Championship: Kurt Angle vs. Chris Jericho',
          'WWF Tag Team Championship: The Dudley Boyz vs. The New Age Outlaws',
          'No Holds Barred Match: Kane vs. X-Pac',
          'WrestleMania Title Shot: The Rock vs. The Big Show',
          'WWF Championship vs. Career Hell in a Cell Match: Triple H vs. Cactus Jack',
        ],
        coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ed/No_Way_Out_2000_logo.jpg',
      },
    ],
  },
  {
    month: 'Marzo',
    monthId: 'march',
    raw: [
      {
        date: '6',
        location: 'Springfield',
        description: 'The Rock se enfrenta a Chris Benoit mientras la intriga de los McMahon por el evento principal de WrestleMania se complica.',
        matches: [
          'The Rock vs. Chris Benoit',
          'Kane vs. The Big Show',
          'WWF Tag Team Championship: The Dudley Boyz vs. The Hardy Boyz',
        ],
      },
      {
        date: '13',
        location: 'East Rutherford',
        description: 'Mick Foley regresa como comisionado y añade a The Big Show y a él mismo al evento principal de WrestleMania, convirtiéndolo en una Lucha Fatal de 4 Esquinas.',
        matches: [
          'The Rock & The Hardy Boyz vs. Triple H, The Big Show & Kurt Angle',
          'WWF Hardcore Championship: Crash Holly vs. Hardcore Holly',
        ],
      },
      {
        date: '20',
        location: 'Chicago',
        description: 'The Rock y Triple H se enfrentan en una lucha de leñadores. La tensión entre los cuatro competidores de WrestleMania está al máximo.',
        matches: [
          'Lumberjack Match: The Rock vs. Triple H',
          'Dean Malenko & Perry Saturn vs. The Hardy Boyz',
          'Kane vs. Rikishi',
        ],
      },
      {
        date: '27',
        location: 'Houston',
        description: 'El último RAW antes de WrestleMania. The Rock y Shane McMahon se enfrentan en una jaula de acero.',
        matches: [
          'Steel Cage Match: The Rock vs. Shane McMahon',
          'Chris Benoit vs. Eddie Guerrero',
          'WWF Tag Team Championship: The Dudley Boyz vs. Test & Albert',
        ],
      },
    ],
    smackdown: [
      {
        date: '2',
        location: 'Trenton',
        description: 'The Rock se enfrenta a Kurt Angle. Se anuncia que Linda McMahon estará en la esquina de The Rock en WrestleMania.',
        matches: [
          'The Rock vs. Kurt Angle',
          'WWF Tag Team Championship: The Dudley Boyz vs. Edge & Christian',
          'Kane vs. Chris Jericho',
        ],
      },
      {
        date: '9',
        location: 'Boston',
        description: 'The Rock se une a su "padre" para una noche. Vince McMahon se declara el McMahon en la esquina de The Big Show.',
        matches: [
          'The Rock & Rikishi vs. The Big Show & Triple H',
          'WWF European Championship: Kurt Angle vs. Chris Benoit',
          'The Hardy Boyz vs. T & A (Test & Albert)',
        ],
      },
      {
        date: '16',
        location: 'Uniondale',
        description: 'Los cuatro participantes del evento estelar de WrestleMania se enfrentan en una lucha por equipos.',
        matches: [
          'The Rock & Mick Foley vs. The Big Show & Triple H',
          'WWF Intercontinental Championship: Kurt Angle vs. Chris Jericho vs. Chris Benoit',
          'The Dudley Boyz vs. Edge & Christian',
        ],
      },
      {
        date: '23',
        location: 'Milwaukee',
        description: 'Se produce el esperado debut de Trish Stratus, quien se presenta como manager del equipo T & A (Test & Albert).',
        matches: [
          'The Rock vs. The Dudley Boyz (Handicap Tables Match)',
          'T & A (Test & Albert) vs. The Hardy Boyz',
          'Kurt Angle, Edge & Christian vs. Chris Jericho & Too Cool',
        ],
      },
      {
        date: '30',
        location: 'San Antonio',
        description: 'El último show antes de WrestleMania. Una enorme batalla campal entre todos los involucrados en la Lucha Fatal de 4 Esquinas.',
        matches: [
          'The Rock vs. Bubba Ray Dudley',
          'Kurt Angle vs. Eddie Guerrero',
          'Kane vs. Bull Buchanan',
          'Fatal 4-Way Over The Top Rope Challenge con los participantes del evento estelar.',
        ],
      },
    ],
    ppvs: [],
  },
  {
    month: 'Abril',
    monthId: 'april',
    raw: [
      {
        date: '3',
        location: 'Los Ángeles',
        description: 'La noche después de WrestleMania. Vince McMahon se vuelve contra The Rock. Triple H sigue siendo campeón, pero The Rock quiere otra oportunidad.',
        matches: [
          'The Rock vs. Shane McMahon',
          'WWF Intercontinental Championship: Chris Benoit vs. Tazz',
          'Eddie Guerrero vs. Chris Jericho',
        ],
      },
      {
        date: '10',
        location: 'Fort Lauderdale',
        description: 'Stone Cold Steve Austin regresa por una noche para ayudar a The Rock contra la facción McMahon-Helmsley.',
        matches: [
          'The Rock & The Acolytes vs. Triple H, The Big Show & Shane McMahon',
          'WWF Tag Team Championship: Edge & Christian vs. The Hardy Boyz',
        ],
      },
      {
        date: '17',
        location: 'State College',
        description: '¡The Rock es despedido de la WWF por la facción McMahon-Helmsley! Linda McMahon revierte la decisión y anuncia una lucha por el título en Backlash.',
        matches: [
          'WWF Championship: Triple H vs. Chris Jericho (El resultado fue revertido)',
          'The Dudley Boyz vs. T & A (Test & Albert)',
          'Kurt Angle vs. Rikishi',
        ],
      },
      {
        date: '24',
        location: 'Raleigh',
        description: 'The Rock busca venganza en la semana de Backlash. Shane McMahon es el árbitro especial en la lucha de The Rock.',
        matches: [
          'The Rock vs. The Big Show & Bull Buchanan (Special Referee: Shane McMahon)',
          'WWF Intercontinental Championship: Chris Benoit vs. Kurt Angle',
          'WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz',
        ],
      },
    ],
    smackdown: [
      {
        date: '6',
        location: 'San José',
        description: 'Se anuncia que The Rock tendrá su revancha por el título en Backlash, con Shane McMahon como árbitro especial.',
        matches: [
          'The Rock vs. The Big Show',
          'WWF Tag Team Championship: Edge & Christian vs. The Hardy Boyz',
          'Rikishi vs. Eddie Guerrero',
        ],
      },
      {
        date: '13',
        location: 'Tampa',
        description: 'The Rock se enfrenta a Triple H en una jaula de acero, pero los McMahon intervienen para costarle la victoria.',
        matches: [
          'Steel Cage Match: The Rock vs. Triple H',
          'WWF Intercontinental Championship: Chris Benoit vs. Chyna',
          'The Dudley Boyz vs. Al Snow & Steve Blackman',
        ],
      },
      {
        date: '20',
        location: 'Philadelphia',
        description: 'The Rock debe enfrentarse a Bull Buchanan y The Big Boss Man en una lucha en desventaja antes de su gran combate en Backlash.',
        matches: [
          'Handicap Match: The Rock vs. Bull Buchanan & The Big Boss Man',
          'WWF European Championship: Eddie Guerrero vs. Essa Rios',
          'Kurt Angle vs. Tazz',
        ],
      },
      {
        date: '27',
        location: 'Charlotte',
        description: 'El último show antes de Backlash. Linda McMahon anuncia que Stone Cold Steve Austin estará en la esquina de The Rock en el PPV.',
        matches: [
          'The Rock vs. Chris Benoit (Special Referee: Shane McMahon)',
          'WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz',
          'WWF Hardcore Championship: Crash Holly vs. Hardcore Holly',
        ],
      },
    ],
    ppvs: [
      {
        date: '2',
        name: 'WrestleMania 2000',
        location: 'Anaheim, CA',
        description: 'Un McMahon en cada esquina. El evento principal es una Lucha Fatal de 4 Esquinas por el Campeonato de la WWF entre Triple H, The Rock, The Big Show y Mick Foley. Además, Edge & Christian, The Dudley Boyz y The Hardy Boyz compiten en una lucha de escaleras triangular por los títulos de parejas que redefine la división.',
        matches: [
          'The Godfather & D\'Lo Brown vs. The Big Boss Man & Bull Buchanan',
          'WWF Hardcore Championship Battle Royal',
          'T & A (Test & Albert) vs. Al Snow & Steve Blackman',
          'Triangle Ladder Match for WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz vs. The Hardy Boyz',
          'Catfight: Terri Runnels vs. The Kat',
          'Too Cool & Chyna vs. The Radicalz (Eddie Guerrero, Perry Saturn & Dean Malenko)',
          'Two-Fall Triple Threat for IC & European Titles: Kurt Angle vs. Chris Jericho vs. Chris Benoit',
          'Kane & Rikishi vs. D-Generation X (X-Pac & Road Dogg)',
          'WWF Championship Fatal 4-Way Elimination Match: Triple H vs. The Rock vs. Mick Foley vs. The Big Show',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iJa715g4whgqJfaIeB0OosK2P4S.jpg',
      },
      {
        date: '30',
        name: 'Backlash',
        location: 'Washington, D.C.',
        description: '¡La revancha de WrestleMania! The Rock finalmente tiene su mano a mano contra Triple H por el Campeonato de la WWF, con Shane McMahon como árbitro y Stone Cold Steve Austin haciendo una aparición sorpresa para nivelar el campo de juego.',
        matches: [
          'WWF Tag Team Championship: Edge & Christian vs. D-Generation X (X-Pac & Road Dogg)',
          'WWF Light Heavyweight Championship: Dean Malenko vs. Scotty 2 Hotty',
          'The Big Boss Man & Bull Buchanan vs. The Acolytes',
          'WWF Hardcore Championship Six-Man Match: Crash Holly vs. Matt Hardy vs. Jeff Hardy vs. Hardcore Holly vs. Perry Saturn vs. Tazz',
          'The Big Show vs. Kurt Angle',
          'T & A (Test & Albert) vs. The Dudley Boyz',
          'WWF European Championship: Eddie Guerrero vs. Essa Rios',
          'WWF Intercontinental Championship: Chris Benoit vs. Chris Jericho',
          'WWF Championship: The Rock vs. Triple H (Special Referee: Shane McMahon)',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/342kIu3Qf4H6s5SKQZanWSoEtr8.jpg',
      },
    ],
  },
  {
    month: 'Mayo',
    monthId: 'may',
    raw: [
      {
        date: '1',
        location: 'Baltimore',
        description: '¡The Rock es el nuevo Campeón de la WWF! La era McMahon-Helmsley promete venganza. Shane McMahon se enfrenta a The Dudley Boyz.',
        matches: [
          'WWF Intercontinental Championship: Chris Benoit vs. Tazz',
          'WWF European Championship: Eddie Guerrero vs. Chris Jericho',
          'The Rock vs. Shane McMahon',
        ],
      },
      {
        date: '8',
        location: 'Uniondale',
        description: 'Chris Jericho se enfrenta a Kurt Angle en una jaula de acero. La rivalidad entre The Rock y Triple H continúa con una lucha Iron Man en el horizonte.',
        matches: [
          'Steel Cage Match: Chris Jericho vs. Kurt Angle',
          'The Rock vs. Chris Benoit',
          'WWF Tag Team Championship: Edge & Christian vs. The Acolytes',
        ],
      },
      {
        date: '15',
        location: 'Cleveland',
        description: 'Se lleva a cabo un torneo para determinar el contendiente número uno al Título Intercontinental. Shane McMahon se enfrenta a The Rock.',
        matches: [
          'King of the Ring Qualifier: Rikishi vs. Kurt Angle',
          'No Holds Barred Match: Shane McMahon vs. The Rock',
          'The Hardy Boyz vs. T & A',
        ],
      },
      {
        date: '22',
        location: 'Indianapolis',
        description: 'La noche después de Judgment Day. The Undertaker ha regresado con una nueva actitud "American Badass". Shane McMahon ahora tiene el control de The Rock.',
        matches: [
          'WWF European Championship: Eddie Guerrero vs. Matt Hardy',
          'The Undertaker vs. Shane McMahon',
          'The Rock vs. Triple H (Lumberjack Match)',
        ],
      },
      {
        date: '29',
        location: 'Vancouver',
        description: 'The Undertaker, Kane y The Rock unen fuerzas contra la facción McMahon-Helmsley. Se anuncian las primeras luchas para King of the Ring.',
        matches: [
          'King of the Ring Qualifier: Kurt Angle vs. Bradshaw',
          'The Rock, The Undertaker & Kane vs. Triple H, Shane McMahon & Vince McMahon',
          'WWF Intercontinental Championship: Chris Benoit vs. Hardcore Holly',
        ],
      },
    ],
    smackdown: [
      {
        date: '4',
        location: 'Richmond',
        description: 'The Rock debe defender su título contra Shane McMahon. Chris Benoit gana el Título Intercontinental de manos de Chris Jericho.',
        matches: [
          'WWF Championship: The Rock vs. Shane McMahon',
          'WWF Intercontinental Championship: Chris Jericho vs. Chris Benoit',
          'The Hardy Boyz vs. Edge & Christian',
        ],
      },
      {
        date: '11',
        location: 'New Haven',
        description: 'Triple H obtiene una revancha por el título en una lucha Iron Man de 60 minutos en Judgment Day. The Rock se enfrenta a Chris Benoit.',
        matches: [
          'The Rock vs. Chris Benoit',
          'WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz',
          'WWF European Championship: Eddie Guerrero vs. The Godfather',
        ],
      },
      {
        date: '18',
        location: 'Detroit',
        description: 'The Rock debe pasar por encima de The Dudley Boyz en una lucha de mesas en desventaja, a solo días de su épica batalla contra Triple H.',
        matches: [
          'Handicap Tables Match: The Rock vs. The Dudley Boyz',
          'Kurt Angle vs. Chris Jericho',
          'WWF Intercontinental Championship: Chris Benoit vs. Val Venis',
        ],
      },
      {
        date: '25',
        location: 'Evansville',
        description: 'Triple H, el nuevo campeón, celebra su victoria. The Undertaker y Kane acechan a la facción McMahon-Helmsley.',
        matches: [
          'The Undertaker vs. Shane McMahon',
          'WWF Intercontinental Championship: Chris Benoit vs. Kurt Angle',
          'The Hardy Boyz vs. T & A',
        ],
      },
    ],
    ppvs: [
      {
        date: '6',
        name: 'Insurrextion',
        location: 'Londres, Inglaterra',
        description: 'Un evento exclusivo para el Reino Unido. The Rock defiende el Campeonato de la WWF en una triple amenaza contra Triple H y Shane McMahon.',
        matches: [
          'The Big Show & Rikishi vs. The Dudley Boyz',
          'Kurt Angle vs. Chris Benoit',
          'WWF European Championship: Eddie Guerrero vs. Chris Jericho',
          'WWF Tag Team Championship: The Hardy Boyz vs. Edge & Christian',
          'WWF Championship Triple Threat: The Rock vs. Triple H vs. Shane McMahon',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Lp1RxAlAt2Cpy9SAIaY3T4a4z9.jpg',
      },
      {
        date: '21',
        name: 'Judgment Day',
        location: 'Louisville, KY',
        description: 'The Rock y Triple H se enfrentan en una épica lucha Iron Man de 60 minutos por el Campeonato de la WWF, con Shawn Michaels como árbitro. La lucha termina en controversia y marca el impactante regreso de ¡The Undertaker!',
        matches: [
          'Too Cool vs. Team ECK (Edge, Christian & Kurt Angle)',
          'WWF European Championship: Eddie Guerrero vs. Perry Saturn vs. Dean Malenko',
          'No Holds Barred Falls Count Anywhere Match: Shane McMahon vs. The Big Show',
          'Submission Match for WWF Intercontinental Title: Chris Benoit vs. Chris Jericho',
          'Tables Match: D-Generation X (Road Dogg & X-Pac) vs. The Dudley Boyz',
          '60-Minute Iron Man Match for WWF Championship: The Rock vs. Triple H (Special Referee: Shawn Michaels)',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/s4gUTdCjdiKz33edUJpTelc4aW1.jpg',
      },
    ],
  },
  {
    month: 'Junio',
    monthId: 'june',
    raw: [
      {
        date: '5',
        location: 'St. Louis',
        description: 'The Rock se enfrenta a The Undertaker y Kane en una lucha de triple amenaza por la oportunidad de retar a Triple H en King of the Ring.',
        matches: [
          '#1 Contender\'s Match: The Rock vs. The Undertaker vs. Kane',
          'King of the Ring Qualifier: Eddie Guerrero vs. Chyna',
          'The Hardy Boyz vs. T & A',
        ],
      },
      {
        date: '12',
        location: 'Chicago',
        description: 'El torneo King of the Ring continúa. The Rock, Kane y The Undertaker deben coexistir como equipo.',
        matches: [
          'King of the Ring Quarter-Final: Kurt Angle vs. Chris Jericho',
          'The Rock, Kane & The Undertaker vs. Triple H, Shane McMahon & Vince McMahon',
        ],
      },
      {
        date: '19',
        location: 'Nashville',
        description: 'Los cuatro finalistas de King of the Ring se revelan. La tensión entre los seis hombres que competirán por el título de la WWF está al rojo vivo.',
        matches: [
          'Kane vs. The Hardy Boyz',
          'King of the Ring Semi-Finals Preview: Kurt Angle & Edge & Christian vs. Chris Jericho & Too Cool',
          'The Rock vs. T & A (Test & Albert)',
        ],
      },
      {
        date: '26',
        location: 'Worcester',
        description: 'La noche después de King of the Ring. Kurt Angle, el nuevo rey, celebra su coronación. The Rock busca venganza contra el nuevo campeón, Triple H.',
        matches: [
          'WWF Championship: Triple H vs. Chris Jericho',
          'Kane vs. Kurt Angle',
          'The Hardy Boyz vs. Kaientai',
        ],
      },
    ],
    smackdown: [
      {
        date: '1',
        location: 'Tacoma',
        description: 'The Undertaker y The Rock deben unirse para enfrentar a sus enemigos de la facción McMahon-Helmsley.',
        matches: [
          'The Rock & The Undertaker vs. Triple H & Shane McMahon',
          'WWF Intercontinental Championship: Chris Benoit vs. Jeff Hardy',
          'King of the Ring Qualifier: Bull Buchanan vs. Perry Saturn',
        ],
      },
      {
        date: '8',
        location: 'Buffalo',
        description: 'Lucha por el contendiente número uno para el título de la WWF en King of the Ring: The Rock contra Kane y The Undertaker.',
        matches: [
          '#1 Contender\'s Match: The Rock vs. Kane vs. The Undertaker',
          'WWF European Championship: Eddie Guerrero vs. Dean Malenko',
          'King of the Ring Quarter-Final: Rikishi vs. Chris Benoit',
        ],
      },
      {
        date: '15',
        location: 'Chicago',
        description: 'El comisionado Mick Foley pacta una lucha por equipos de 6 hombres para King of the Ring por el Campeonato de la WWF.',
        matches: [
          'WWF Championship: Triple H vs. The Rock',
          'WWF Intercontinental Championship: Chris Benoit vs. Eddie Guerrero',
          'Kurt Angle vs. Bubba Ray Dudley',
        ],
      },
      {
        date: '22',
        location: 'Memphis',
        description: 'El último show antes de King of the Ring. The Rock, Kane y The Undertaker se enfrentan a Triple H, Shane McMahon y el Campeón de Parejas Edge.',
        matches: [
          'The Rock, Kane & The Undertaker vs. Triple H, Shane McMahon & Edge',
          'WWF European Championship: Eddie Guerrero vs. Matt Hardy',
          'Rikishi vs. Chris Benoit',
        ],
      },
      {
        date: '29',
        location: 'Hartford',
        description: 'The Rock gana una batalla real para convertirse en el contendiente número uno al Campeonato de la WWF en Fully Loaded.',
        matches: [
          '#1 Contender\'s Battle Royal',
          'WWF Tag Team Championship: Edge & Christian vs. The Hardy Boyz',
          'Kurt Angle vs. Hardcore Holly',
        ],
      },
    ],
    ppvs: [
      {
        date: '25',
        name: 'King of the Ring',
        location: 'East Rutherford, NJ',
        description: 'El torneo anual corona a un nuevo rey. Además, el Campeonato de la WWF está en juego en una innovadora lucha por equipos de seis hombres, donde quienquiera que logre el pinfall se convertirá en campeón.',
        matches: [
          'King of the Ring Quarter-Final: Rikishi vs. Chris Benoit',
          'King of the Ring Quarter-Final: Val Venis vs. Eddie Guerrero',
          'King of the Ring Quarter-Final: Crash Holly vs. Bull Buchanan',
          'King of the Ring Quarter-Final: Kurt Angle vs. Chris Jericho',
          'WWF Tag Team Championship: Too Cool vs. Edge & Christian vs. The Hardy Boyz vs. T & A',
          'King of the Ring Semi-Final: Rikishi vs. Val Venis',
          'King of the Ring Semi-Final: Kurt Angle vs. Crash Holly',
          'Tables & Dumpster Match: D-Generation X (Road Dogg, X-Pac & Tori) vs. The Dudley Boyz',
          'King of the Ring Final: Kurt Angle vs. Rikishi',
          'Six-Man Tag Team Match for WWF Championship: The Rock, Kane & The Undertaker vs. Triple H, Vince McMahon & Shane McMahon',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jJdGk4G5Dmh9mmK531n2A8GZS0W.jpg',
      },
    ],
  },
  {
    month: 'Julio',
    monthId: 'july',
    raw: [
      {
        date: '3',
        location: 'College Station',
        description: 'Chris Benoit se enfrenta a Eddie Guerrero. La rivalidad entre Kurt Angle y The Undertaker comienza a tomar forma.',
        matches: [
          'Chris Benoit vs. Eddie Guerrero',
          'The Undertaker & Kane vs. Triple H & Kurt Angle',
          'WWF Tag Team Championship: Edge & Christian vs. The Acolytes',
        ],
      },
      {
        date: '10',
        location: 'San Antonio',
        description: 'The Rock y Chris Benoit se enfrentan con el Campeonato de la WWF en juego. La lucha termina en controversia.',
        matches: [
          'WWF Championship: The Rock vs. Chris Benoit',
          'The Hardy Boyz vs. T & A',
          'Kurt Angle vs. The Brooklyn Brawler',
        ],
      },
      {
        date: '17',
        location: 'Albany',
        description: 'El comisionado Mick Foley ordena una revancha entre The Rock y Chris Benoit para Fully Loaded. Triple H se enfoca en Chris Jericho.',
        matches: [
          'The Rock & The Acolytes vs. Chris Benoit, Edge & Christian',
          'Triple H vs. The Godfather',
          'WWF Intercontinental Championship: Val Venis vs. Eddie Guerrero',
        ],
      },
      {
        date: '24',
        location: 'Austin',
        description: 'La noche después de Fully Loaded. Kurt Angle ataca a The Rock, posicionándose como un nuevo retador. Triple H y Stephanie McMahon celebran.',
        matches: [
          'WWF Championship: The Rock vs. Kurt Angle',
          'The Hardy Boyz vs. The Dudley Boyz',
          'WWF Intercontinental Championship: Val Venis vs. Chris Benoit',
        ],
      },
      {
        date: '31',
        location: 'Atlanta',
        description: 'Triple H, Kurt Angle y Chris Benoit se enfrentan en una triple amenaza para determinar al contendiente número uno en SummerSlam.',
        matches: [
          '#1 Contender\'s Triple Threat Match: Triple H vs. Kurt Angle vs. Chris Benoit',
          'The Undertaker & Kane vs. Edge & Christian',
          'Eddie Guerrero vs. Chris Jericho',
        ],
      },
    ],
    smackdown: [
      {
        date: '6',
        location: 'Orlando',
        description: 'Triple H ataca brutalmente a Chris Jericho. The Rock se une a The Dudley Boyz para enfrentar a la nueva facción de Kurt Angle.',
        matches: [
          'The Rock & The Dudley Boyz vs. Kurt Angle, Edge & Christian',
          'WWF Intercontinental Championship: Val Venis vs. Rikishi',
          'Kane vs. Chris Benoit',
        ],
      },
      {
        date: '13',
        location: 'Oakland',
        description: 'The Rock se une a Chris Jericho para luchar contra Chris Benoit y Triple H. The Undertaker se enfoca en Kurt Angle.',
        matches: [
          'The Rock & Chris Jericho vs. Chris Benoit & Triple H',
          'The Undertaker vs. Kurt Angle',
          'WWF European Championship: Eddie Guerrero vs. Perry Saturn',
        ],
      },
      {
        date: '20',
        location: 'Albany',
        description: 'El último show antes de Fully Loaded. The Rock y Kane se enfrentan a Chris Benoit y The Big Show.',
        matches: [
          'The Rock & Kane vs. Chris Benoit & The Big Show',
          'Last Man Standing Match Preview: Triple H vs. Billy Gunn',
          'WWF Tag Team Championship: The Acolytes vs. Edge & Christian',
        ],
      },
      {
        date: '27',
        location: 'Providence',
        description: 'Kurt Angle, Edge y Christian forman "Team ECK". The Undertaker busca venganza contra el nuevo grupo.',
        matches: [
          'The Undertaker vs. Kurt Angle',
          'The Hardy Boyz vs. Lo Down',
          'WWF Intercontinental Championship: Val Venis vs. Eddie Guerrero',
        ],
      },
    ],
    ppvs: [
      {
        date: '23',
        name: 'Fully Loaded',
        location: 'Dallas, TX',
        description: 'Triple H y Chris Jericho resuelven su intensa rivalidad en una lucha de Último Hombre en Pie. The Rock defiende el Campeonato de la WWF contra un impredecible Chris Benoit.',
        matches: [
          'The Hardy Boyz & Lita vs. T & A & Trish Stratus',
          'Tazz vs. Al Snow',
          'WWF European Championship: Perry Saturn vs. Eddie Guerrero',
          'WWF Tag Team Championship: The Acolytes vs. Edge & Christian',
          'Steel Cage Match for the WWF Intercontinental Title: Val Venis vs. Rikishi',
          'The Undertaker vs. Kurt Angle',
          'Last Man Standing Match: Triple H vs. Chris Jericho',
          'WWF Championship: The Rock vs. Chris Benoit',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8o2n69D43WMV348J61sC82q4d5R.jpg',
      },
    ],
  },
  {
    month: 'Agosto',
    monthId: 'august',
    raw: [
      {
        date: '7',
        location: 'New York',
        description: 'Se pacta una lucha de triple amenaza para SummerSlam por el título de la WWF: The Rock vs. Triple H vs. Kurt Angle.',
        matches: [
          'The Rock vs. Kane',
          'Chris Jericho & The Hardy Boyz vs. Chris Benoit, Edge & Christian',
          'The Undertaker vs. Triple H',
        ],
      },
      {
        date: '14',
        location: 'East Rutherford',
        description: 'El triángulo amoroso entre Triple H, Stephanie y Kurt Angle se intensifica. The Rock observa cómo sus dos retadores se destruyen mutuamente.',
        matches: [
          'The Rock & Lita vs. Triple H & Trish Stratus',
          'The Undertaker vs. Chris Benoit',
          'WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz',
        ],
      },
      {
        date: '21',
        location: 'Lafayette',
        description: 'Shane McMahon regresa y se alinea con Steve Blackman. El comisionado Foley pacta una lucha "TLC" para SummerSlam.',
        matches: [
          'The Rock vs. Perry Saturn',
          'The Hardy Boyz vs. The Dudley Boyz',
          'WWF Intercontinental Championship: Val Venis vs. Eddie Guerrero',
        ],
      },
      {
        date: '28',
        location: 'Greensboro',
        description: 'La noche después de SummerSlam. The Rock sigue siendo campeón. La enemistad entre Triple H y Kurt Angle está lejos de terminar.',
        matches: [
          'WWF Championship: The Rock vs. Kane',
          'Chris Jericho vs. Tazz',
          'WWF Tag Team Championship: Edge & Christian vs. The Hardy Boyz',
        ],
      },
    ],
    smackdown: [
      {
        date: '3',
        location: 'Birmingham',
        description: 'The Undertaker busca venganza contra su "hermano" Kane. Se anuncia una lucha de triple amenaza por el título en SummerSlam.',
        matches: [
          'The Undertaker vs. Kane',
          'The Rock vs. Triple H vs. Kurt Angle (No-Contest)',
          'WWF Intercontinental Championship: Val Venis vs. Chris Benoit',
        ],
      },
      {
        date: '10',
        location: 'Chicago',
        description: 'Stephanie McMahon es la árbitro especial en una lucha entre The Rock y Triple H. Kurt Angle interfiere.',
        matches: [
          'The Rock vs. Triple H (Special Referee: Stephanie McMahon)',
          'The Undertaker & The Dudley Boyz vs. Kurt Angle, Edge & Christian',
        ],
      },
      {
        date: '17',
        location: 'Sacramento',
        description: 'Kurt Angle besa a Stephanie McMahon, enfureciendo a Triple H. The Rock se une a The Undertaker para enfrentar a Triple H y The Big Show.',
        matches: [
          'The Rock & The Undertaker vs. Triple H & The Big Show',
          'WWF Tag Team Championship TLC Match Preview: Edge & Christian vs. The Hardy Boyz vs. The Dudley Boyz',
        ],
      },
      {
        date: '24',
        location: 'Fayetteville',
        description: 'El último show antes de SummerSlam. Los tres competidores por el título de la WWF se enfrentan en una batalla campal.',
        matches: [
          'The Rock vs. Kane',
          'The Undertaker vs. Chris Benoit',
          'Battle Royal: The Rock vs. Triple H vs. Kurt Angle',
        ],
      },
      {
        date: '31',
        location: 'Hartford',
        description: 'The Rock necesita encontrar compañeros para enfrentar a Kane, Chris Benoit y Kurt Angle.',
        matches: [
          'The Rock, The Undertaker & Chris Jericho vs. Kane, Chris Benoit & Kurt Angle',
          'WWF European Championship: Eddie Guerrero vs. Perry Saturn',
        ],
      },
    ],
    ppvs: [
      {
        date: '27',
        name: 'SummerSlam',
        location: 'Raleigh, NC',
        description: 'El evento más caliente del verano. The Rock defiende el Campeonato de la WWF contra Triple H y Kurt Angle, cuyo triángulo amoroso con Stephanie McMahon llega a un punto de ebullición. Además, Edge & Christian, The Dudley Boyz y The Hardy Boyz se enfrentan en la primera lucha de Mesas, Escaleras y Sillas (TLC).',
        matches: [
          'Right to Censor vs. Too Cool',
          'Road Dogg vs. X-Pac',
          'WWF Intercontinental Title Mixed Tag Match: Val Venis & Trish Stratus vs. Eddie Guerrero & Chyna',
          'Jerry "The King" Lawler vs. Tazz',
          'WWF Hardcore Championship: Steve Blackman vs. Shane McMahon',
          'Two out of Three Falls Match: Chris Benoit vs. Chris Jericho',
          'TLC Match for WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz vs. The Hardy Boyz',
          'Stinkface Match: The Kat vs. Terri',
          'No Disqualification Match: The Undertaker vs. Kane',
          'WWF Championship Triple Threat: The Rock vs. Triple H vs. Kurt Angle',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3L3M3j4S3422H2l2SJQPX8ihsBa.jpg',
      },
    ],
  },
  {
    month: 'Septiembre',
    monthId: 'september',
    raw: [
      {
        date: '4',
        location: 'Lexington',
        description: 'Stone Cold Steve Austin regresa para investigar quién lo atropelló en Survivor Series el año anterior. Kurt Angle se adjudica el crédito.',
        matches: [
          'The Rock & The Undertaker vs. The Dudley Boyz',
          'WWF Championship: The Rock vs. Christian',
          'Kane vs. Chris Benoit',
        ],
      },
      {
        date: '11',
        location: 'Phoenix',
        description: 'La investigación de Austin continúa. The Rock forma una alianza incómoda con Kane para enfrentarse a The Undertaker y Chris Benoit.',
        matches: [
          'The Rock & Kane vs. The Undertaker & Chris Benoit',
          'WWF Tag Team Championship: Edge & Christian vs. Too Cool',
        ],
      },
      {
        date: '18',
        location: 'Detroit',
        description: 'Shane McMahon revela que él estaba detrás del atropello de Austin, pero la historia da un giro inesperado.',
        matches: [
          'The Rock, The Undertaker & Triple H vs. Kurt Angle, Chris Benoit & Kane',
          'WWF Intercontinental Championship: Eddie Guerrero vs. Rikishi',
        ],
      },
      {
        date: '25',
        location: 'State College',
        description: 'La noche después de Unforgiven. Stone Cold busca venganza. The Rock tiene un nuevo campeón que enfrentar.',
        matches: [
          'The Rock vs. Chris Benoit',
          'WWF Tag Team Championship: The Hardy Boyz vs. Edge & Christian (Ladder Match)',
          'Triple H vs. Kurt Angle',
        ],
      },
    ],
    smackdown: [
      {
        date: '7',
        location: 'Louisville',
        description: 'The Rock & The Undertaker se unen de nuevo, esta vez contra The Dudley Boyz. La tensión entre Triple H y Kurt Angle sigue creciendo.',
        matches: [
          'The Rock & The Undertaker vs. The Dudley Boyz',
          'WWF Intercontinental Championship: Eddie Guerrero vs. Chris Jericho',
          'Kane vs. Chris Benoit',
        ],
      },
      {
        date: '14',
        location: 'Las Vegas',
        description: 'The Rock debe formar equipo con Triple H para enfrentarse a The Undertaker y Kurt Angle, con Stephanie como árbitro.',
        matches: [
          'The Rock & Triple H vs. The Undertaker & Kurt Angle (Special Referee: Stephanie McMahon)',
          'WWF Tag Team Championship: Edge & Christian vs. The Hardy Boyz',
        ],
      },
      {
        date: '21',
        location: 'Nashville',
        description: 'El comisionado Foley revela que Rikishi fue quien atropelló a Stone Cold. The Rock confronta a su primo.',
        matches: [
          'The Rock vs. The Undertaker vs. Chris Benoit vs. Kane (Fatal 4-Way for #1 Contender)',
          'Triple H vs. Kurt Angle',
        ],
      },
      {
        date: '28',
        location: 'Pittsburgh',
        description: 'Stone Cold Steve Austin regresa para vengarse de Rikishi. The Rock se prepara para su lucha por el título.',
        matches: [
          'The Rock vs. Chris Jericho',
          'WWF Tag Team Championship: The Hardy Boyz vs. T & A',
          'Triple H vs. Steven Richards',
        ],
      },
    ],
    ppvs: [
      {
        date: '24',
        name: 'Unforgiven',
        location: 'Philadelphia, PA',
        description: 'Stone Cold Steve Austin está en la caza de quien lo atropelló. The Rock defiende el Campeonato de la WWF en una lucha Fatal de 4 Esquinas contra The Undertaker, Kane y Chris Benoit.',
        matches: [
          'Right to Censor vs. The Dudley Boyz & The APA',
          'Tazz vs. Jerry "The King" Lawler (Strap Match)',
          'WWF Hardcore Title Battle Royal',
          'WWF European Championship: Al Snow vs. X-Pac',
          'Steel Cage Match for WWF Tag Team Titles: Edge & Christian vs. The Hardy Boyz',
          'WWF Intercontinental Championship: Eddie Guerrero vs. Rikishi',
          'No Disqualification Match: Triple H vs. Kurt Angle (Special Referee: Mick Foley)',
          'WWF Championship Fatal 4-Way Match: The Rock vs. Kane vs. The Undertaker vs. Chris Benoit',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lJ5zni6bgyWd7gE0IsELomN2n1V.jpg',
      },
    ],
  },
  {
    month: 'Octubre',
    monthId: 'october',
    raw: [
      {
        date: '2',
        location: 'Washington D.C.',
        description: 'Rikishi explica sus acciones. Stone Cold Steve Austin continúa su cacería. The Rock se enfoca en Kurt Angle.',
        matches: [
          'The Rock & Rikishi vs. Kurt Angle & Kane',
          'WWF Tag Team Championship: The Hardy Boyz vs. Lo Down',
          'Chris Jericho vs. X-Pac',
        ],
      },
      {
        date: '9',
        location: 'Anaheim',
        description: 'The Rock se enfrenta a Kurt Angle y Kane en una lucha de triple amenaza. La esposa de Triple H, Stephanie, es ahora la "manager" de Kurt Angle.',
        matches: [
          'Triple Threat Match: The Rock vs. Kurt Angle vs. Kane',
          'WWF Women\'s Championship: Lita vs. Jacqueline',
          'The Hardy Boyz vs. The Dudley Boyz',
        ],
      },
      {
        date: '16',
        location: 'Detroit',
        description: 'The Rock forma equipo con The Hardy Boyz para enfrentarse a Kurt Angle, Edge y Christian.',
        matches: [
          'The Rock & The Hardy Boyz vs. Kurt Angle, Edge & Christian',
          'WWF Intercontinental Championship: Eddie Guerrero vs. Chris Jericho',
          'Triple H vs. Kane',
        ],
      },
      {
        date: '23',
        location: 'Hartford',
        description: 'La noche después de No Mercy. Kurt Angle es el nuevo campeón de la WWF. Rikishi se revela como el cómplice de Triple H.',
        matches: [
          'WWF Championship: Kurt Angle vs. The Rock',
          'The Dudley Boyz vs. Right to Censor',
          'Triple H vs. Chris Jericho',
        ],
      },
      {
        date: '30',
        location: 'Boston',
        description: 'Stone Cold, The Rock, Triple H y Kurt Angle se enfrentan en una batalla campal por equipos.',
        matches: [
          'The Rock & Stone Cold Steve Austin vs. Kurt Angle & Rikishi',
          'The Hardy Boyz vs. The Radicalz (Saturn & Malenko)',
          'WWF European Championship: William Regal vs. Al Snow',
        ],
      },
    ],
    smackdown: [
      {
        date: '5',
        location: 'Baltimore',
        description: 'The Rock se enfrenta a Chris Benoit, mientras que Kane lucha contra Rikishi.',
        matches: [
          'The Rock vs. Chris Benoit',
          'Kane vs. Rikishi',
          'WWF Tag Team Championship: The Hardy Boyz vs. Edge & Christian',
        ],
      },
      {
        date: '12',
        location: 'Los Ángeles',
        description: 'Se pacta una lucha sin descalificación entre The Rock y Kurt Angle para No Mercy. La tensión entre Lita, Trish Stratus y Stephanie McMahon crece.',
        matches: [
          'The Rock, The Hardy Boyz & Lita vs. Kurt Angle, Edge, Christian & Trish Stratus',
          'WWF Intercontinental Championship: Eddie Guerrero vs. Chris Jericho',
        ],
      },
      {
        date: '19',
        location: 'Cleveland',
        description: 'The Rock, Triple H y Stone Cold se enfrentan en una triple amenaza. Kurt Angle interfiere, atacando a The Rock.',
        matches: [
          'Triple Threat Match: The Rock vs. Stone Cold Steve Austin vs. Triple H',
          'WWF Tag Team Championship: The Hardy Boyz vs. The Dudley Boyz',
        ],
      },
      {
        date: '26',
        location: 'Albany',
        description: 'The Rock busca una revancha contra el nuevo campeón, Kurt Angle. Stone Cold Steve Austin se enfrenta a Rikishi en una jaula de acero.',
        matches: [
          'Steel Cage Match: Stone Cold Steve Austin vs. Rikishi',
          'The Rock & Triple H vs. Kurt Angle & Chris Benoit',
        ],

      },
    ],
    ppvs: [
      {
        date: '22',
        name: 'No Mercy',
        location: 'Albany, NY',
        description: 'The Rock defiende su Campeonato de la WWF contra Kurt Angle en una lucha sin descalificación. Stone Cold Steve Austin finalmente tiene en sus manos a Rikishi.',
        matches: [
          'The Dudley Boyz Tag Team Tables Invitational',
          'The APA & Lita vs. T & A & Trish Stratus',
          'Steel Cage Match: Chris Jericho vs. X-Pac',
          'Right to Censor vs. Chyna & Mr. Ass',
          'No Holds Barred Match: Stone Cold Steve Austin vs. Rikishi',
          'WWF European Championship: William Regal vs. Mideon',
          'WWF Tag Team Championship: The Hardy Boyz vs. Los Conquistadores (Edge & Christian)',
          'Triple H vs. Chris Benoit',
          'No Disqualification Match for WWF Championship: The Rock vs. Kurt Angle',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1A0x4p00V5Iogc6x27a5AbpEeW9.jpg',
      },
    ],
  },
  {
    month: 'Noviembre',
    monthId: 'november',
    raw: [
      {
        date: '6',
        location: 'Houston',
        description: 'The Rock exige una revancha. Stone Cold se enfoca en Triple H, sospechando que él fue la mente maestra detrás de todo.',
        matches: [
          'The Rock vs. Chris Jericho',
          'Stone Cold Steve Austin vs. Kurt Angle',
          'The Hardy Boyz vs. Bull Buchanan & The Goodfather',
        ],
      },
      {
        date: '13',
        location: 'Columbus',
        description: '¡Se revela que Triple H fue quien pagó a Rikishi para atropellar a Stone Cold! Austin busca venganza inmediata.',
        matches: [
          'The Rock vs. Rikishi',
          'Stone Cold Steve Austin vs. Eddie Guerrero',
          'Kurt Angle vs. Crash Holly',
        ],
      },
      {
        date: '20',
        location: 'Orlando',
        description: 'La noche después de Survivor Series. Triple H celebra su victoria sobre Austin. Kurt Angle se enfrenta a su próximo retador.',
        matches: [
          'WWF Championship: Kurt Angle vs. Steve Blackman',
          'The Rock vs. Chris Benoit',
          'Stone Cold Steve Austin vs. Triple H (No Disqualification)',
        ],
      },
      {
        date: '27',
        location: 'Raleigh',
        description: 'Comienza el camino hacia Armageddon, con una Lucha Hell in a Cell de 6 hombres en el horizonte.',
        matches: [
          'The Rock & The Undertaker vs. Kurt Angle & Edge',
          'Stone Cold Steve Austin vs. Rikishi',
          'WWF Intercontinental Championship: Billy Gunn vs. Eddie Guerrero',
        ],
      },
    ],
    smackdown: [
      {
        date: '2',
        location: 'Rochester',
        description: 'The Rock, Stone Cold, Triple H y Kurt Angle compiten en una lucha fatal de 4 esquinas.',
        matches: [
          'Fatal 4-Way: The Rock vs. Stone Cold Steve Austin vs. Triple H vs. Kurt Angle',
          'The Hardy Boyz vs. Right to Censor',
          'WWF Women\'s Championship: Ivory vs. Lita',
        ],
      },
      {
        date: '9',
        location: 'Chicago',
        description: 'The Rock y Stone Cold se unen para enfrentarse a Kurt Angle y Rikishi.',
        matches: [
          'The Rock & Stone Cold Steve Austin vs. Kurt Angle & Rikishi',
          'WWF Tag Team Championship: Right to Censor vs. The Dudley Boyz',
          'Chris Jericho vs. Kane',
        ],
      },
      {
        date: '16',
        location: 'Indianapolis',
        description: 'El último show antes de Survivor Series. Stone Cold y Triple H tienen una confrontación explosiva.',
        matches: [
          'The Rock vs. Chris Benoit',
          'Survivor Series Preview: Team Rock (The Rock, Chris Jericho, The Hardy Boyz) vs. Team Radicalz (Benoit, Guerrero, Saturn, Malenko)',
        ],
      },
      {
        date: '23',
        location: 'Tampa',
        description: 'The Rock se enfrenta a Kurt Angle por el título de la WWF, pero Triple H interfiere.',
        matches: [
          'WWF Championship: Kurt Angle vs. The Rock',
          'Stone Cold Steve Austin vs. Chris Benoit',
          'WWF Tag Team Championship: Right to Censor vs. The Dudley Boyz',
        ],
      },
      {
        date: '30',
        location: 'Charlotte',
        description: 'Se anuncian los 6 participantes de la lucha Hell in a Cell de Armageddon: Kurt Angle, The Rock, Stone Cold, Triple H, The Undertaker y Rikishi.',
        matches: [
          'The Rock, Stone Cold Steve Austin & The Undertaker vs. Kurt Angle, Rikishi & Kane',
          'WWF European Championship: William Regal vs. Hardcore Holly',
        ],
      },
    ],
    ppvs: [
      {
        date: '19',
        name: 'Survivor Series',
        location: 'Tampa, FL',
        description: 'La venganza de Stone Cold llega a un punto crítico cuando se enfrenta a Triple H en una lucha sin descalificación. The Rock busca recuperar el Campeonato de la WWF de manos de Kurt Angle.',
        matches: [
          'Steve Blackman, Crash Holly & Molly Holly vs. T & A & Trish Stratus',
          'Survivor Series Elimination Match: The Radicalz vs. D-Generation X (Road Dogg, K-Kwik, Chyna & Billy Gunn)',
          'The Undertaker vs. Kane',
          'WWF Hardcore Championship: Steve Blackman vs. Al Snow',
          'WWF Women\'s Championship: Ivory vs. Lita',
          'WWF Championship: Kurt Angle vs. The Undertaker',
          'Survivor Series Elimination Match: The Dudley Boyz & The Hardy Boyz vs. Edge, Christian, Bull Buchanan & The Goodfather',
          'No Disqualification Match: Stone Cold Steve Austin vs. Triple H',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xKL2qGzA9JcAy6dMv8B2sCUKNB.jpg',
      },
    ],
  },
  {
    month: 'Diciembre',
    monthId: 'december',
    raw: [
      {
        date: '4',
        location: 'East Rutherford',
        description: 'Los seis competidores de Armageddon se enfrentan en una masiva lucha por equipos.',
        matches: [
          'The Rock, Stone Cold & The Undertaker vs. Kurt Angle, Triple H & Rikishi',
          'WWF Intercontinental Championship: Billy Gunn vs. Val Venis',
        ],
      },
      {
        date: '11',
        location: 'Memphis',
        description: 'La noche después de Armageddon. Kurt Angle sigue siendo campeón. La tensión entre Vince McMahon y el resto de los participantes es palpable.',
        matches: [
          'WWF Championship: Kurt Angle vs. The Rock',
          'The Hardy Boyz vs. Chris Benoit & Perry Saturn',
          'The Undertaker vs. Rikishi',
        ],
      },
      {
        date: '18',
        location: 'Greenville',
        description: 'Vince McMahon se enfrenta a Kurt Angle. The Rock y The Undertaker se convierten en los nuevos campeones de parejas.',
        matches: [
          'Vince McMahon vs. Kurt Angle',
          'WWF Tag Team Championship: The Rock & The Undertaker vs. Edge & Christian',
          'Chris Jericho vs. Triple H',
        ],
      },
      {
        date: '25',
        location: 'Chattanooga',
        description: 'Especial de Navidad. The Rock y The Undertaker defienden sus títulos recién ganados.',
        matches: [
          'WWF Tag Team Championship: The Rock & The Undertaker vs. The Dudley Boyz',
          'WWF Intercontinental Championship: Chris Benoit vs. Hardcore Holly',
          'Stone Cold Steve Austin vs. Kane',
        ],
      },
    ],
    smackdown: [
      {
        date: '7',
        location: 'San José',
        description: 'Los seis hombres del Hell in a Cell se enfrentan en tres luchas individuales.',
        matches: [
          'The Rock vs. Rikishi',
          'Stone Cold Steve Austin vs. Kurt Angle',
          'The Undertaker vs. Triple H',
        ],
      },
      {
        date: '14',
        location: 'Little Rock',
        description: 'La noche después de Armageddon. Los participantes reflexionan sobre la brutal lucha. Vince McMahon expresa su descontento.',
        matches: [
          'The Rock vs. Chris Benoit',
          'WWF Tag Team Championship: Edge & Christian vs. The Dudley Boyz',
          'Stone Cold Steve Austin vs. William Regal',
        ],
      },
      {
        date: '21',
        location: 'Durham',
        description: 'Edge & Christian recuperan los títulos de parejas. Stone Cold se enfrenta a Kurt Angle.',
        matches: [
          'WWF Tag Team Championship: Edge & Christian vs. The Rock & The Undertaker',
          'Stone Cold Steve Austin vs. Kurt Angle',
          'Chris Jericho & The Hardy Boyz vs. The Radicalz',
        ],
      },
      {
        date: '28',
        location: 'San Antonio',
        description: 'El último show del año. Se pactan grandes luchas para comenzar el 2001.',
        matches: [
          'The Rock vs. The Undertaker',
          'WWF Championship: Kurt Angle vs. Stone Cold Steve Austin',
          'WWF Hardcore Championship: Raven vs. Steve Blackman',
        ],
      },
    ],
    ppvs: [
      {
        date: '2',
        name: 'Rebellion',
        location: 'Sheffield, Inglaterra',
        description: 'Evento exclusivo del Reino Unido. Kurt Angle defiende el título de la WWF en una lucha fatal de 4 esquinas contra The Rock, Rikishi y Stone Cold Steve Austin.',
        matches: [
          'The Dudley Boyz vs. T & A',
          'WWF Women\'s Championship: Ivory vs. Lita',
          'WWF Hardcore Championship: Steve Blackman vs. Perry Saturn',
          'WWF Tag Team Championship: Right to Censor vs. The Hardy Boyz',
          'WWF Championship Fatal 4-Way: Kurt Angle vs. The Rock vs. Rikishi vs. Stone Cold Steve Austin',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Gs5kSjNufS1aABlO0gUh8WfAof.jpg',
      },
      {
        date: '10',
        name: 'Armageddon',
        location: 'Birmingham, AL',
        description: '¡Por primera vez en la historia, seis de las más grandes superestrellas de la WWF compiten dentro de la estructura más demoníaca, el Hell in a Cell, por el Campeonato de la WWF!',
        matches: [
          'The Radicalz vs. The Hardy Boyz & Lita',
          'WWF European Championship: William Regal vs. Hardcore Holly',
          'Last Man Standing Match: Chris Jericho vs. Kane',
          'WWF Tag Team Championship Fatal 4-Way: Right to Censor vs. The Dudley Boyz vs. Edge & Christian vs. Road Dogg & K-Kwik',
          'WWF Intercontinental Championship: Val Venis vs. Billy Gunn',
          'WWF Women\'s Championship Triple Threat: Ivory vs. Trish Stratus vs. Molly Holly',
          '6-Man Hell in a Cell Match for the WWF Championship: Kurt Angle vs. The Rock vs. Stone Cold Steve Austin vs. Triple H vs. The Undertaker vs. Rikishi',
        ],
        coverUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yD0s2hY8G82X6G242aYfQ1FqI4N.jpg',
      },
    ],
  },
];
