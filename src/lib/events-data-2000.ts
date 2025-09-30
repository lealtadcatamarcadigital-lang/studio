
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
      { date: '23', name: 'Royal Rumble', location: 'New York, NY', description: 'The Rock gana el Royal Rumble Match. Triple H retiene el título contra Cactus Jack en una brutal Street Fight.', matches: ['Street Fight for WWF Championship: Triple H vs. Cactus Jack', '30-Man Royal Rumble Match'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Royal_Rumble_2000.jpg' },
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
      { date: '27', name: 'No Way Out', location: 'Hartford, CT', description: 'Triple H derrota a Cactus Jack en un Hell in a Cell para retener el título y retirar a Mick Foley. The Big Show derrota a The Rock.', matches: ['Hell in a Cell for WWF Championship: Triple H vs. Cactus Jack', 'The Rock vs. The Big Show'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ed/No_Way_Out_2000_logo.jpg' },
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
      { date: '2', name: 'WrestleMania 2000', location: 'Anaheim, CA', description: 'Una lucha fatal de 4 esquinas por el título. Vince McMahon traiciona a The Rock, permitiendo que Triple H retenga.', matches: ['WWF Championship: Triple H vs. The Rock vs. The Big Show vs. Mick Foley', 'Triangle Ladder Match: Edge & Christian vs. The Hardy Boyz vs. The Dudley Boyz'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ab/WM2000Poster.jpeg' },
      { date: '30', name: 'Backlash', location: 'Washington, D.C.', description: '¡The Rock finalmente derrota a Triple H para ganar el Campeonato de la WWF, gracias a la ayuda de Stone Cold Steve Austin!', matches: ['WWF Championship: The Rock vs. Triple H (con Shane McMahon como árbitro)'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Backlash_2000_poster.jpg' },
    ],
  },
  {
    month: 'Mayo',
    monthId: 'may',
    raw: [
      { date: '1', location: 'Baltimore, MD', description: 'The Rock celebra su victoria. Se anuncia el primer Iron Man Match de 60 minutos en la historia de WWF.', matches: ['The Rock vs. Shane McMahon (Steel Cage)'] },
      { date: '8', location: 'Uniondale, NY', description: 'Chris Jericho y Chris Benoit intercambian victorias por el Título Intercontinental.', matches: ['Intercontinental Title: Chris Jericho vs. Chris Benoit'] },
      { date: '15', location: 'Cleveland, OH', description: 'La tensión entre The Rock y Triple H crece antes de Judgment Day.', matches: ['The Rock vs. Edge & Christian'] },
      { date: '22', location: 'Indianapolis, IN', description: 'La noche después de Judgment Day. The Undertaker regresa con su personaje de "American Badass".', matches: ['Triple H es el nuevo campeón'] },
      { date: '29', location: 'Vancouver, BC', description: 'The Undertaker y The Rock forman una alianza incómoda contra los McMahons.', matches: ['The Rock & The Undertaker vs. Triple H & Shane McMahon'] },
    ],
    smackdown: [
      { date: '4', location: 'Richmond, VA', description: 'Edge & Christian ganan los títulos en pareja.', matches: ['Tag Team Titles: Edge & Christian vs. The Hardy Boyz'] },
      { date: '11', location: 'New Haven, CT', description: 'Construcción para Judgment Day con varias luchas de retadores.', matches: ['The Rock vs. Chris Benoit'] },
      { date: '18', location: 'Detroit, MI', description: 'Última confrontación antes del Iron Man Match.', matches: ['Lumberjack Match: The Rock vs. Triple H'] },
      { date: '25', location: 'Evansville, IN', description: 'El caos reina con el regreso de The Undertaker.', matches: ['The Rock vs. X-Pac & Road Dogg'] },
    ],
    ppvs: [
      { date: '21', name: 'Judgment Day', location: 'Louisville, KY', description: 'Triple H derrota a The Rock en un Iron Man Match gracias a la intervención de un The Undertaker que regresa, para ganar el título.', matches: ['60-Minute Iron Man Match: The Rock vs. Triple H'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3d/2000JudgmentDay.jpg' },
    ],
  },
  {
    month: 'Junio',
    monthId: 'june',
    raw: [
      { date: '5', location: 'Rochester, NY', description: 'Se anuncia el torneo King of the Ring. Kane se vuelve en contra de The Undertaker.', matches: ['The Rock vs. The Undertaker vs. Kane'] },
      { date: '12', location: 'St. Louis, MO', description: 'Rondas clasificatorias de King of the Ring. The Rock es atacado misteriosamente.', matches: ['King of the Ring Qualifier: Kurt Angle vs. Bubba Ray Dudley'] },
      { date: '19', location: 'Buffalo, NY', description: 'La facción McMahon-Helmsley intenta descubrir al atacante de The Rock. Kurt Angle avanza.', matches: ['The Rock & Kane vs. Triple H & Shane McMahon'] },
      { date: '26', location: 'Boston, MA', description: 'La noche después de King of the Ring. Kurt Angle celebra su victoria. Rikishi es revelado como el atacante de The Rock.', matches: ['The Rock vs. Shane McMahon'] },
    ],
    smackdown: [
      { date: '1', location: 'Tacoma, WA', description: 'El comisionado Mick Foley hace su regreso.', matches: ['The Undertaker vs. Shane McMahon'] },
      { date: '8', location: 'Minneapolis, MN', description: 'Más luchas clasificatorias del torneo King of the Ring.', matches: ['King of the Ring Qualifier: Chris Jericho vs. Test'] },
      { date: '15', location: 'Chicago, IL', description: 'Se anuncia una lucha de equipos de 3 vs 3 para el evento principal de King of the Ring.', matches: ['The Rock vs. Chris Benoit'] },
      { date: '22', location: 'Memphis, TN', description: 'The Rock busca respuestas sobre su atacante.', matches: ['The Rock & The Brothers of Destruction vs. Triple H & Edge & Christian'] },
      { date: '29', location: 'Hartford, CT', description: 'The Rock confronta a Rikishi por sus acciones.', matches: ['The Rock vs. Triple H'] },
    ],
    ppvs: [
      { date: '25', name: 'King of the Ring', location: 'Boston, MA', description: 'Kurt Angle gana el torneo. The Rock recupera el Campeonato de la WWF de Triple H en una lucha de equipos de seis hombres.', matches: ['WWF Championship Tag Team Match: The Rock, The Undertaker & Kane vs. Triple H, Vince & Shane McMahon', 'King of the Ring Final: Kurt Angle vs. Rikishi'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e2/Kotr99-00.jpg' },
    ],
  },
  {
    month: 'Julio',
    monthId: 'july',
    raw: [
      { date: '3', location: 'Orlando, FL', description: 'The Rock celebra. Chris Benoit se posiciona como el nuevo retador.', matches: ['The Rock vs. Kurt Angle'] },
      { date: '10', location: 'New York, NY', description: 'Benoit y Shane McMahon atacan a The Rock.', matches: ['The Rock vs. Shane McMahon'] },
      { date: '17', location: 'Philadelphia, PA', description: 'Se oficializa The Rock vs. Chris Benoit para Fully Loaded.', matches: ['The Rock & Lita vs. Triple H & Trish Stratus'] },
      { date: '24', location: 'San Antonio, TX', description: 'La noche después de Fully Loaded. Kurt Angle se convierte en el retador #1.', matches: ['The Rock vs. Chris Benoit'] },
      { date: '31', location: 'Atlanta, GA', description: 'Triple H ataca a Kurt Angle por un beso accidental a Stephanie.', matches: ['The Rock & Lita vs. Kurt Angle & Stephanie McMahon'] },
    ],
    smackdown: [
      { date: '6', location: 'Miami, FL', description: 'Val Venis gana el título Intercontinental a Rikishi.', matches: ['Intercontinental Title: Val Venis vs. Rikishi'] },
      { date: '13', location: 'Louisville, KY', description: 'Triple H empieza a mostrar celos de la amistad entre Stephanie y Kurt Angle.', matches: ['The Rock vs. X-Pac'] },
      { date: '20', location: 'Long Island, NY', description: 'Firma de contrato para Fully Loaded. Caos entre The Rock y Benoit.', matches: ['The Rock vs. Christian'] },
      { date: '27', location: 'Worcester, MA', description: 'El triángulo amoroso entre Triple H, Stephanie y Kurt Angle se intensifica.', matches: ['The Rock vs. Kurt Angle'] },
    ],
    ppvs: [
      { date: '23', name: 'Fully Loaded', location: 'Dallas, TX', description: 'The Rock retiene el título contra Chris Benoit. Triple H derrota a Chris Jericho en una brutal Last Man Standing match.', matches: ['WWF Championship: The Rock vs. Chris Benoit', 'Last Man Standing: Triple H vs. Chris Jericho'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c0/WWFFullyLoaded.jpg' },
    ],
  },
  {
    month: 'Agosto',
    monthId: 'august',
    raw: [
      { date: '7', location: 'East Rutherford, NJ', description: 'Se anuncia el evento principal de SummerSlam: The Rock vs. Triple H vs. Kurt Angle.', matches: ['The Rock vs. Triple H'] },
      { date: '14', location: 'Providence, RI', description: 'Triple H y Kurt Angle luchan por la atención de Stephanie.', matches: ['The Rock & Lita vs. Kurt Angle & Stephanie McMahon & Triple H'] },
      { date: '21', location: 'Lafayette, LA', description: 'Último RAW antes de SummerSlam. Kurt Angle besa a Stephanie, enfureciendo a Triple H.', matches: ['The Rock vs. Shane McMahon'] },
      { date: '28', location: 'Greensboro, NC', description: 'The Rock celebra su victoria en SummerSlam. The Undertaker es el nuevo retador.', matches: ['The Rock vs. Kane'] },
    ],
    smackdown: [
      { date: '3', location: 'Columbus, OH', description: 'The Rock y Kane tienen una confrontación.', matches: ['The Rock & Kane vs. Chris Benoit & The Big Show'] },
      { date: '10', location: 'San Diego, CA', description: 'Edge & Christian, The Hardy Boyz y The Dudley Boyz revolucionan la división en parejas.', matches: ['TLC Match anunciado para SummerSlam'] },
      { date: '17', location: 'Ames, IA', description: 'Triple H ataca a Kurt Angle antes de su lucha.', matches: ['The Rock vs. Perry Saturn'] },
      { date: '24', location: 'Fayetteville, NC', description: 'Stephanie elige estar en la esquina de Kurt Angle en SummerSlam.', matches: ['The Rock vs. Triple H & Kurt Angle (Handicap Match)'] },
      { date: '31', location: 'Chicago, IL', description: 'Eddie Guerrero gana el título Intercontinental a Chyna.', matches: ['Intercontinental Title: Eddie Guerrero vs. Chyna'] },
    ],
    ppvs: [
      { date: '27', name: 'SummerSlam', location: 'Raleigh, NC', description: 'The Rock retiene el título después de que Triple H atacara a Kurt Angle. Edge & Christian ganan el primer TLC Match.', matches: ['WWF Championship: The Rock vs. Triple H vs. Kurt Angle', 'TLC Match: Edge & Christian vs. The Hardy Boyz vs. The Dudley Boyz'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/SummerSlam_2000.jpg' },
    ],
  },
  {
    month: 'Septiembre',
    monthId: 'september',
    raw: [
      { date: '4', location: 'Lexington, KY', description: 'Mick Foley investiga quién atropelló a Stone Cold en Survivor Series 99.', matches: ['The Rock & The Undertaker vs. Kurt Angle & Chris Benoit'] },
      { date: '11', location: 'Kansas City, MO', description: 'The Rock se enfrenta a una serie de oponentes elegidos por sus rivales.', matches: ['The Rock vs. Christian'] },
      { date: '18', location: 'Chicago, IL', description: 'Se anuncia una lucha fatal de 4 esquinas para Unforgiven. Stone Cold regresa.', matches: ['The Rock vs. The Undertaker vs. Chris Benoit vs. Kane'] },
      { date: '25', location: 'State College, PA', description: 'La noche después de Unforgiven. The Rock celebra. Stone Cold busca venganza.', matches: ['WWF Championship: The Rock vs. Chris Benoit'] },
    ],
    smackdown: [
      { date: '7', location: 'Houston, TX', description: 'The Rock es puesto en luchas difíciles por Mick Foley.', matches: ['The Rock & The Hardy Boyz vs. Chris Benoit, Edge & Christian'] },
      { date: '14', location: 'Detroit, MI', description: 'La rivalidad entre The Rock y The Undertaker se calienta.', matches: ['The Rock vs. Kane'] },
      { date: '21', location: 'Milwaukee, WI', description: 'Stone Cold Steve Austin interroga a sospechosos sobre su accidente.', matches: ['The Rock vs. Chris Benoit & Kane'] },
    ],
    ppvs: [
      { date: '24', name: 'Unforgiven', location: 'Philadelphia, PA', description: 'The Rock retiene el Campeonato de la WWF contra Chris Benoit, Kane y The Undertaker. Stone Cold regresa y confronta a sus posibles atacantes.', matches: ['WWF Championship: The Rock vs. Chris Benoit vs. Kane vs. The Undertaker', 'Steel Cage Match: Edge & Christian vs. The Hardy Boyz'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/0/09/Unforgiven_2000_poster.jpg' },
    ],
  },
  {
    month: 'Octubre',
    monthId: 'october',
    raw: [
      { date: '2', location: 'Boston, MA', description: 'Mick Foley continúa la investigación. Rikishi se revela como el conductor.', matches: ['The Rock vs. Chris Benoit'] },
      { date: '9', location: 'Washington, D.C.', description: 'Rikishi explica que lo hizo "por The Rock" y por la gente. Stone Cold lo ataca brutalmente.', matches: ['The Rock vs. Kurt Angle & Rikishi'] },
      { date: '16', location: 'Detroit, MI', description: 'Se pacta The Rock vs. Kurt Angle y Stone Cold vs. Rikishi para No Mercy.', matches: ['The Rock & The Hardy Boyz vs. Kurt Angle, Edge & Christian'] },
      { date: '23', location: 'Hartford, CT', description: 'La noche después de No Mercy. Kurt Angle es el nuevo campeón. Rikishi revela que Triple H estaba detrás de todo.', matches: ['Kurt Angle vs. Triple H'] },
      { date: '30', location: 'Worcester, MA', description: 'Stone Cold busca a Triple H. The Rock quiere su revancha contra Angle.', matches: ['The Rock & Stone Cold Steve Austin vs. Kurt Angle & Rikishi'] },
    ],
    smackdown: [
      { date: '5', location: 'New York, NY', description: 'Stone Cold regresa oficialmente a SmackDown! y causa estragos.', matches: ['The Rock vs. Rikishi'] },
      { date: '12', location: 'Los Angeles, CA', description: 'Stone Cold sigue su cacería. The Rock y Kurt Angle en guerra.', matches: ['#1 Contender Match: The Rock vs. Chris Jericho vs. Kane'] },
      { date: '19', location: 'Meadowlands, NJ', description: 'Último show antes de No Mercy. Rikishi es arrestado después de atacar a Stone Cold con un coche.', matches: ['The Rock vs. The Dudley Boyz'] },
    ],
    ppvs: [
      { date: '22', name: 'No Mercy', location: 'Albany, NY', description: 'Kurt Angle derrota a The Rock para ganar el Campeonato de la WWF. Stone Cold vs. Rikishi termina en No Contest.', matches: ['WWF Championship: Kurt Angle vs. The Rock', 'Stone Cold Steve Austin vs. Rikishi'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/No_Mercy_2000.jpg' },
    ],
  },
  {
    month: 'Noviembre',
    monthId: 'november',
    raw: [
      { date: '6', location: 'Houston, TX', description: 'Triple H admite haber orquestado el ataque a Stone Cold. Se pacta la lucha para Survivor Series.', matches: ['The Rock & Stone Cold Steve Austin vs. Triple H & Rikishi'] },
      { date: '13', location: 'Columbus, OH', description: 'Triple H intenta atropellar a Stone Cold, pero era una trampa.', matches: ['The Rock vs. Chris Benoit'] },
      { date: '20', location: 'Orlando, FL', description: 'La noche después de Survivor Series. Kurt Angle celebra. Stone Cold busca a Triple H.', matches: ['WWF Championship: Kurt Angle vs. The Rock'] },
      { date: '27', location: 'Ames, IA', description: 'Se anuncia una lucha Hell in a Cell de 6 hombres para Armageddon.', matches: ['Kurt Angle vs. Rikishi'] },
    ],
    smackdown: [
      { date: '2', location: 'Rochester, NY', description: 'The Rock y Stone Cold se unen contra el enemigo común.', matches: ['The Rock vs. Kurt Angle'] },
      { date: '9', location: 'Pittsburgh, PA', description: 'The Radicalz se reúnen y atacan a DX.', matches: ['The Rock & Chris Jericho vs. Kurt Angle & Kane'] },
      { date: '16', location: 'Sunrise, FL', description: 'Último show antes de Survivor Series. Caos total entre todas las facciones.', matches: ['The Rock, Stone Cold, The Undertaker & Chris Jericho vs. Kurt Angle, Triple H, Edge & Christian'] },
    ],
    ppvs: [
      { date: '19', name: 'Survivor Series', location: 'Tampa, FL', description: 'Stone Cold deja caer a Triple H desde una grúa dentro de un coche. Kurt Angle retiene el título contra The Undertaker.', matches: ['Stone Cold Steve Austin vs. Triple H (No DQ)', 'WWF Championship: Kurt Angle vs. The Undertaker'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/3/33/Survivor_Series_2000.jpg' },
    ],
  },
  {
    month: 'Diciembre',
    monthId: 'december',
    raw: [
      { date: '4', location: 'East Rutherford, NJ', description: 'Vince McMahon intenta cancelar el Hell in a Cell, pero Mick Foley se lo impide.', matches: ['Fatal 4-Way Tag Team Match for the titles'] },
      { date: '11', location: 'Little Rock, AR', description: 'La noche después de Armageddon. Kurt Angle sigue siendo campeón. Vince McMahon se divorcia de Linda en el ring.', matches: ['Kurt Angle vs. The Rock'] },
      { date: '18', location: 'Richmond, VA', description: 'Vince McMahon inicia un romance público con Trish Stratus.', matches: ['The Rock & The Dudley Boyz vs. Kurt Angle, Edge & Christian'] },
      { date: '25', location: 'Chattanooga, TN', description: 'Show de Navidad. The Rock se disfraza de Santa Claus para burlarse de Kurt Angle.', matches: ['WWF Championship: Kurt Angle vs. Stone Cold Steve Austin'] },
    ],
    smackdown: [
      { date: '7', location: 'New Orleans, LA', description: 'Los 6 participantes del Hell in a Cell luchan entre sí en diferentes combinaciones.', matches: ['The Rock vs. Rikishi'] },
      { date: '14', location: 'Birmingham, AL', description: 'Vince McMahon se convierte en una figura autoritaria tiránica.', matches: ['Kurt Angle & Edge & Christian vs. The Rock & The Dudley Boyz'] },
      { date: '21', location: 'Charlotte, NC', description: 'Construcción para Royal Rumble 2001. Se anuncian los primeros participantes.', matches: ['The Rock vs. The Undertaker'] },
    ],
    ppvs: [
      { date: '10', name: 'Armageddon', location: 'Birmingham, AL', description: 'Kurt Angle retiene el título en una caótica lucha Hell in a Cell de 6 hombres. The Radicalz se establecen como una facción dominante.', matches: ['6-Man Hell in a Cell for WWF Championship: Kurt Angle vs. The Rock vs. Stone Cold vs. Triple H vs. The Undertaker vs. Rikishi'], coverUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Armageddon_2000.jpg' },
    ],
  },
];
