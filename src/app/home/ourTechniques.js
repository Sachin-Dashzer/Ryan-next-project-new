import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const procedures = [
  {
    title: "Sapphire FUE Technique",
    image: "/sapphire-fue.jpg",
    features: [
      "Micro Sapphire Pen",
      "3 x PRP Session.",
      "1 Year Online Post-operative Follow Up",
      "Guarantee Certificate."
    ]
  },
  {
    title: "Turkey Experts DHI",
    image: "/turkey-experts.jpg",
    features: [
      "Turkish Choi Pen",
      "3 x PRP Session.",
      "1 Year Online Post-operative Follow Up",
      "Guarantee Certificate."
    ],
    highlight: true
  },
  {
    title: "DHI Technique",
    image: "/dhi-technique.jpg",
    features: [
      "Turkish Choi Pen",
      "3 x PRP Session.",
      "1 Year Online Post-operative Follow Up",
      "Guarantee Certificate."
    ]
  }
];

export default function OurTechnique() {
  return (
    <div className="py-12 px-4 md:px-10 bg-white flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {procedures.map((procedure, idx) => (
          <Card
            key={idx}
            className={`rounded-xl shadow-md transition-all duration-300 ${
              procedure.highlight ? "bg-[#45758b] text-white" : "bg-white"
            }`}
          >
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-36 h-36 mb-4">
                <Image
                  src={procedure.image}
                  alt={procedure.title}
                  width={200}
                  height={200}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold underline text-center mb-4 uppercase">
                {procedure.title}
              </h3>
              <ul className="space-y-2 w-full">
                {procedure.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm md:text-base"
                  >
                    <Check className="w-4 h-4 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6">Book Appointment</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
