
import type { MonthData } from './events-data';

export const WWF_2000_DATA: MonthData[] = [
  {
    month: 'Enero',
    monthId: 'january',
    raw: [
      { date: '3', location: 'Austin, TX', description: 'Triple H, ahora campeón, consolida su poder con Stephanie McMahon.', matches: ['WWF Championship: Triple H vs. The Big Show'] },
      { date: '10', location: 'New York, NY', description: 'The Rock regresa y gana una batalla real para ser retador en Royal Rumble.', matches: ['Royal Rumble #1 Contender Battle Royal'] },
      { date: '17', location: 'New Haven, CT', description: 'La facción McMahon-Helmsley domina, pactando luchas injustas.', matches: ['The Rock vs. New Age Outlaws'] },
      { date: '24', location: 'Washington, D.C.', description: 'La noche después del Rumble. Cactus Jack emerge como el nuevo retador de Triple H.', matches: ['Triple H vs. Kane'] },
      { date: '31', location: 'Pittsburgh, PA', description: 'The Radicalz (Benoit, Guerrero, Saturn, Malenko) debutan desde WCW.', matches: ['The Radicalz vs. DX'] },
    ],
    smackdown: [
      { date: '6', location: 'Miami, FL', description: 'The Rock y The Big Show continúan su rivalidad.', matches: ['The Rock vs. The Big Show'] },
      { date: '13', location: 'Chicago, IL', description: 'Más confrontaciones de cara al Royal Rumble.', matches: ['Kane vs. The Big Show'] },
      { date: '20', location: 'Philadelphia, PA', description: 'Último show antes del Rumble. The Rock y Triple H en una acalorada confrontación.', matches: ['The Rock & The Acolytes vs. Triple H & X-Pac & Road Dogg'] },
      { date: '27', location: 'Baltimore, MD', description: 'Cactus Jack ataca a Triple H, construyendo su lucha para No Way Out.', matches: ['The Rock vs. Kurt Angle'] },
    ],
    ppvs: [
      { date: '23', name: 'Royal Rumble', location: 'New York, NY', description: 'The Rock gana el Royal Rumble Match. Triple H retiene el título contra Cactus Jack en una brutal Street Fight.', matches: ['Street Fight for WWF Championship: Triple H vs. Cactus Jack', '30-Man Royal Rumble Match'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Wwfroyalrumble2000.jpg' },
    ],
  },
  {
    month: 'Febrero',
    monthId: 'february',
    raw: [
      { date: '7', location: 'Dallas, TX', description: 'The Radicalz se establecen como una fuerza a tener en cuenta.', matches: ['Chris Benoit vs. Triple H'] },
      { date: '14', location: 'San Jose, CA', description: 'Se pacta la lucha Hell in a Cell entre Triple H y Cactus Jack.', matches: ['The Rock & Cactus Jack vs. Triple H & X-Pac'] },
      { date: '21', location: 'Atlanta, GA', description: 'Última parada antes de No Way Out.', matches: ['The Rock vs. Chris Benoit'] },
      { date: '28', location: 'New York, NY', description: 'The Rock es el retador #1 para WrestleMania. The Big Show se reincorpora a la contienda.', matches: ['WWF Championship: Triple H vs. The Rock'] },
    ],
    smackdown: [
      { date: '3', location: 'Detroit, MI', description: 'Chris Jericho gana el título Intercontinental.', matches: ['WWF Intercontinental Championship: Chris Jericho vs. Chyna vs. Hardcore Holly'] },
      { date: '10', location: 'Austin, TX', description: 'Tensión entre The Rock y The Big Show por la oportunidad en WrestleMania.', matches: ['The Rock vs. Kurt Angle & The British Bulldog'] },
      { date: '17', location: 'Nashville, TN', description: 'Se intensifica la rivalidad para Hell in a Cell.', matches: ['Triple H & The Radicalz vs. The Rock & Cactus Jack & Too Cool'] },
      { date: '24', location: 'St. Louis, MO', description: 'The Big Show derrota a The Rock con ayuda de Shane McMahon.', matches: ['The Rock vs. The Big Show'] },
    ],
    ppvs: [
      { date: '27', name: 'No Way Out', location: 'Hartford, CT', description: 'Triple H derrota a Cactus Jack en un Hell in a Cell para retener el título y retirar a Mick Foley. The Big Show derrota a The Rock.', matches: ['Hell in a Cell for WWF Championship: Triple H vs. Cactus Jack', 'The Rock vs. The Big Show'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Royal_Rumble_2000.jpg' },
    ],
  },
  {
    month: 'Marzo',
    monthId: 'march',
    raw: [
      { date: '6', location: 'Boston, MA', description: 'The Rock recupera su oportunidad titular para WrestleMania.', matches: ['The Rock vs. The Big Show (Steel Cage)'] },
      { date: '13', location: 'East Rutherford, NJ', description: 'Linda McMahon anuncia el regreso de Mick Foley. Se conforma la lucha de 4 esquinas para WrestleMania.', matches: ['The Rock & The Hardy Boyz vs. Triple H & The Dudley Boyz'] },
      { date: '20', location: 'Uniondale, NY', description: 'Cada competidor de WrestleMania tiene un McMahon en su esquina.', matches: ['The Rock vs. Shane McMahon'] },
      { date: '27', location: 'Cleveland, OH', description: 'Último RAW antes de WrestleMania. Caos total entre los cuatro contendientes.', matches: ['The Rock & Mick Foley vs. Triple H & The Big Show'] },
    ],
    smackdown: [
      { date: '2', location: 'Indianapolis, IN', description: 'Shane McMahon ayuda a The Big Show a solidificar su puesto en WrestleMania.', matches: ['The Rock vs. Chris Benoit & Perry Saturn'] },
      { date: '9', location: 'Washington, D.C.', description: 'The Rock debe luchar contra todos los McMahons.', matches: ['The Rock vs. The McMahon-Helmsley Faction'] },
      { date: '16', location: 'San Diego, CA', description: 'Edge & Christian comienzan su camino a la grandeza.', matches: ['Edge & Christian vs. The Hardy Boyz'] },
      { date: '23', location: 'Chicago, IL', description: 'Se anuncia la lucha de escaleras triangular para WrestleMania.', matches: ['The Rock vs. Kurt Angle & Bob Backlund'] },
      { date: '30', location: 'Houston, TX', description: 'Todos los McMahons interfieren de cara al evento principal.', matches: ['The Rock vs. Triple H'] },
    ],
    ppvs: [],
  },
  {
    month: 'Abril',
    monthId: 'april',
    raw: [
      { date: '3', location: 'Los Angeles, CA', description: 'The Rock busca venganza contra Vince McMahon y Triple H.', matches: ['WWF Championship: Triple H vs. The Rock'] },
      { date: '10', location: 'Philadelphia, PA', description: 'Stone Cold Steve Austin regresa para ayudar a The Rock.', matches: ['The Rock & The Acolytes vs. Triple H, Chris Benoit, & Perry Saturn'] },
      { date: '17', location: 'State College, PA', description: 'Chris Jericho molesta a Triple H y Stephanie, ganándose una oportunidad titular.', matches: ['WWF Championship: Triple H vs. Chris Jericho (decisión revertida)'] },
      { date: '24', location: 'Charlotte, NC', description: 'Linda McMahon anuncia que The Rock tendrá ayuda en Backlash: Stone Cold Steve Austin.', matches: ['The Rock & Chris Jericho vs. Triple H & Chris Benoit'] },
    ],
    smackdown: [
      { date: '6', location: 'San Jose, CA', description: 'Vince McMahon se regodea de su victoria en WrestleMania.', matches: ['The Rock vs. The Big Show & Shane McMahon'] },
      { date: '13', location: 'Tampa, FL', description: 'The Rock continúa su guerra contra la facción McMahon-Helmsley.', matches: ['The Rock vs. Triple H (Steel Cage)'] },
      { date: '20', location: 'New York, NY', description: 'Se anuncia la lucha entre The Rock y Triple H para Backlash.', matches: ['The Rock vs. Edge & Christian'] },
      { date: '27', location: 'Raleigh, NC', description: 'Stone Cold Steve Austin destruye el autobús de DX, anunciando su regreso.', matches: ['The Rock & The Dudley Boyz vs. Triple H, X-Pac, & Road Dogg'] },
    ],
    ppvs: [
      { date: '2', name: 'WrestleMania 2000', location: 'Anaheim, CA', description: 'Una lucha fatal de 4 esquinas por el título. Vince McMahon traiciona a The Rock, permitiendo que Triple H retenga.', matches: ['WWF Championship: Triple H vs. The Rock vs. The Big Show vs. Mick Foley', 'Triangle Ladder Match: Edge & Christian vs. The Hardy Boyz vs. The Dudley Boyz'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Wrestlemania2000.jpg' },
      { date: '30', name: 'Backlash', location: 'Washington, D.C.', description: '¡The Rock finalmente derrota a Triple H para ganar el Campeonato de la WWF, gracias a la ayuda de Stone Cold Steve Austin!', matches: ['WWF Championship: The Rock vs. Triple H (con Shane McMahon como árbitro)'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Backlash_2000.jpg/800px-Backlash_2000.jpg' },
    ],
  },
  // Los demás meses seguirían un patrón similar, pero se omiten por brevedad en este ejemplo.
];
