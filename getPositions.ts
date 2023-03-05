import { positions } from "./positions";

export type Pages = "about" | "/" | "contact";

export const getPositions = (pathname: Pages) => {
  let res = [];

  const colors = [
    "#A2CCB6",
    "#FCEEB5",
    "#EE786E",
    "#e0feff",
    "lightpink",
    "lightblue",
  ];

  const random = () => Math.floor(Math.random() * 100) % colors.length;

  if (pathname === "/") {
    res = positions.home;
  } else {
    const cleanName = pathname.replace("/", "") as "about" | "contact";
    res = positions[cleanName];
  }
  const withColor = res.map((pos) => {
    return {
      ...pos,
      color: colors[random()],
    };
  });
  return shuffle(withColor);
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
