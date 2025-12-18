import { emergencyImg, maternityImg, surgeryImg, pediatricsImg, cardiologyImg, orthopedicsImg, radiologyImg } from "./images";

export interface Slide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    img: string;
}

const sliderData: Slide[] = [
    {
        id: 1,
        title: "Emergency Care",
        subtitle: "24/7 Medical Attention",
        description: "Round-the-clock emergency services with state-of-the-art facilities and expert medical professionals ready to handle any critical situation.",
        img: emergencyImg
    },
    {
        id: 2,
        title: "Maternity Services",
        subtitle: "Comprehensive Maternal Care",
        description: "Expert care for expecting mothers with modern delivery rooms, neonatal intensive care, and compassionate support throughout your journey.",
        img: maternityImg
    },
    {
        id: 3,
        title: "Advanced Surgery",
        subtitle: "Cutting-Edge Surgical Excellence",
        description: "State-of-the-art surgical facilities with minimally invasive techniques and experienced surgeons ensuring the best outcomes.",
        img: surgeryImg
    },
    {
        id: 4,
        title: "Pediatric Care",
        subtitle: "Specialized Child Healthcare",
        description: "Dedicated pediatric department providing compassionate care for children and infants with child-friendly facilities.",
        img: pediatricsImg
    },
    {
        id: 5,
        title: "Cardiology",
        subtitle: "Heart Care Excellence",
        description: "Comprehensive cardiac care with advanced diagnostics, interventional procedures, and rehabilitation programs.",
        img: cardiologyImg
    },
    {
        id: 6,
        title: "Orthopedics",
        subtitle: "Bone & Joint Specialists",
        description: "Expert orthopedic care for bones, joints, and muscles with advanced treatment options and rehabilitation services.",
        img: orthopedicsImg
    },
    {
        id: 7,
        title: "Radiology",
        subtitle: "Advanced Diagnostic Imaging",
        description: "Cutting-edge imaging technology including MRI, CT scans, and X-rays for accurate and timely diagnoses.",
        img: radiologyImg
    }
];

export default sliderData;
