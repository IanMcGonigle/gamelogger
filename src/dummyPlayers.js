const dummy = [
    {
        "firstName": "foo",
        "lastName": "bar",
        "jerseyNumber": "1",
        "teamId": 0,
        "goals": 0
    },
    {
        "firstName": "bar",
        "lastName": "baz",
        "jerseyNumber": "2",
        "teamId": 0,
        "goals": 0
    },
    {
        "firstName": "doo",
        "lastName": "foo",
        "jerseyNumber": "3",
        "teamId": 0,
        "goals": 0
    },
    {
        "firstName": "dii",
        "lastName": "sii",
        "jerseyNumber": "1",
        "teamId": 1,
        "goals": 0
    },
    {
        "firstName": "bee",
        "lastName": "boo",
        "jerseyNumber": "2",
        "teamId": 1,
        "goals": 0
    }
]

const teamlist = [
  { id: 1, name: 'Aston Villa' },
  { id: 3, name: 'Brentford' },
  { id: 4, name: 'Brighton & Hove Albion' },
  { id: 5, name: 'Burnley' },
  { id: 6, name: 'Chelsea' },
  { id: 7, name: 'Crystal Palace' },
  { id: 8, name: 'Everton' },
  { id: 9, name: 'Fulham' },
  { id: 10, name: 'Liverpool' },
  { id: 11, name: 'Luton Town' },
  { id: 12, name: 'Manchester City' },
  { id: 13, name: 'Manchester United' },
  { id: 14, name: 'Newcastle United' },
  { id: 15, name: 'Nottingham Forest' },
  { id: 16, name: 'Sheffield United' },
  { id: 17, name: 'Tottenham Hotspur' },
  { id: 18, name: 'West Ham United' },
  { id: 19, name: 'Wolverhampton Wanderers' },
];

const lfc = [
  'hbv4GFCKpS8X1cxEE7BU',
  '#7 Luis Diaz',
  '#7 Luis Diaz',
  '#11 Mohamed Salah',
  '#20 Diogo Jota',
  '#9 Darwin Núñez',
  '#9 Darwin Núñez',
  '#8 Dominik Szoboszlai',
  '#11 Mohamed Salah',
  '#18 Cody Gakpo',
  '#26 Andy Robertson',
  '#9 Darwin Núñez',
  '#20 Diogo Jota',
  '#18 Cody Gakpo',
  '#11 Mohamed Salah',
  '#11 Mohamed Salah',
  '#20 Diogo Jota',
  '#9 Darwin Núñez',
  '#11 Mohamed Salah',
  '#7 Luis Diaz',
  '#11 Mohamed Salah',
  '#11 Mohamed Salah',
  '#20 Diogo Jota',
  '#66 Trent Alexander-Arnold',
  '#10 Alexis MacAllister',
  '#3 Wataru Endō',
  '#66 Trent Alexander-Arnold',
  '#4 Virgil Van Dijk',
  '#8 Dominik Szoboszlai',
  '#11 Mohamed Salah',
  '#19 Harvey Elliot',
];

// const initializeTeams = async () => {
//     teamlist.forEach(async (t) => {
//     const docRef = doc(colletionTeams);
//     const teamName = t.name;
//     console.log('set ', teamName);
//     try {
//         await setDoc(docRef, { name: teamName });
//     } catch (error) {
//         console.error(error);
//     }
//     });
// };

// const initialzeLFC = async () => {
//     const lfcSet = new Set(lfc);
//     // console.log(lfcSet)
//     const ip = Array.from(lfcSet).map((item: string) => {
//     const segs = item.substring(1).split(' ');
//     console.log(segs);
//     return {
//         firstName: segs[1],
//         lastName: segs[2],
//         jerseyNumber: segs[0],
//         teamId: 'hbv4GFCKpS8X1cxEE7BU',
//         goals: 0,
//     };
//     });

//     const colletionPlayers = collection(db, 'players');
//     ip.forEach(async (p) => {
//     const docRef = doc(colletionPlayers);
//     console.log('set ', p);
//     try {
//         await setDoc(docRef, p);
//     } catch (error) {
//         console.error(error);
//     }
//     });
// };

export default dummy;