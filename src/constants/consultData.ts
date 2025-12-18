import { consultantImg1, consultantImg2, consultantImg3, consultantImg4 } from "./images";

interface Consultant {
  id: number;
  name: string;
  depart: string;
  desc?: string;
  img: string;
}

const consultData: Consultant[] = [
  { id: 1, name: "Dr. Ishwor Koirala", depart: "Plastic, Cosmetic & Hand Surgery", desc: "Chief Consultant", img: consultantImg1 },
  { id: 2, name: "Dr. Bhagwan Kafle", depart: "Cardiovascular Surgery", desc: "Chief Consultant",img: consultantImg2 },
  { id: 3, name: "Dr. Geeta Raut", depart: "Pathology", desc: "Chief Consultant & Head of Pathology", img: consultantImg3 },
  { id: 4, name: "Dr. Roshan Shrestha", depart: "Cardiology", desc: "Chief Consultant & Head of Department", img: consultantImg4 },
];

export default consultData;
