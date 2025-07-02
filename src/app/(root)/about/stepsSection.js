import {
  PhoneCall,
  CalendarCheck2,
  Scissors,
  Bandage,
  Droplet,
  Syringe,
} from "lucide-react";

const steps = [
  {
    id: 1,
    label: "Step 1",
    subtitle: "Online Free Consultation",
    description:
      "The patient sends the photos of the problematic area where hair loss occurs to Ryan Clinic consultants via WhatsApp and reaches the necessary information thanks to free consultancy.",
    icon: PhoneCall,
    dark: true,
  },
  {
    id: 2,
    label: "Step 2",
    subtitle: "Appointment",
    description:
      "Once the patient is ready for treatment, we conduct a blood test and perform GFC therapy to fertilize the scalp, creating the perfect condition for healthy hair growth.",
    icon: CalendarCheck2,
    dark: false,
  },
  {
    id: 3,
    label: "Step 3",
    subtitle: "Surgery Day",
    description:
      "The design of the hair to be created, the creation of the hairline suitable for the facial structure, and the examination of the donor area are carried out before the operation. The patient should not do any activity that the doctor does not approve before the operation.",
    icon: Scissors,
    dark: true,
  },
  {
    id: 4,
    label: "Step 4",
    subtitle: "Bandage Removal",
    description:
      "On the 3rd day, we gently remove the bandage and apply Betadine cream to the donor area and caring shield against infection and promoting smooth healing.",
    icon: Bandage,
    dark: false,
  },
  {
    id: 5,
    label: "Step 5",
    subtitle: "Head‑Wash",
    description:
      "On 10th day after the surgery the patient is brought back to the clinic and the first wash is performed. Special shampoos and lotions are used to gently massage the transplanted area. With special shampoos transplanted area is cleaned and protected from any infection risks.",
    icon: Droplet,
    dark: true,
  },
  {
    id: 6,
    label: "Step 6",
    subtitle: "PRP",
    description:
      "On the 21st day after the surgery, the patient undergoes a PRP treatment. We take 15–20 ml blood from patient’s own body. Separate Plasma Layer is then injected into the scalp to boost hair growth strengthening hair make hair thicker and improve density.",
    icon: Syringe,
    dark: false,
  },
];

const stepsSection = () => {
  return (
    <section>
      <div className="relative w-full py-20 newBackground">
        {/* <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-cover opacity-20" /> */}
        <div className="relative  mx-auto px-4 flex flex-wrap gap-12 justify-center">
          {steps.map(
            ({ id, label, subtitle, description, icon: Icon, dark }) => (
              <div
                key={id}
                className={`${
                  dark
                    ? "bg-foreground text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                } rounded-xl p-6 shadow-md w-104`}
              >
                <h3
                  className={`font-bold small_heading underline mb-2 text-center ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {label}
                </h3>
                <Icon
                  size={44}
                  className={`mx-auto mb-3 ${
                    dark ? "text-white" : "text-[#2e667e]"
                  }`}
                />
                <h4
                  className={`title font-semibold text-center mb-1  ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {subtitle}
                </h4>
                <p className="text whitespace-pre-line text-center">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default stepsSection;
