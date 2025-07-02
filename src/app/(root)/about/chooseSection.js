import Image from "next/image";
import {
  Phone,
  CalendarDays,
  ClipboardCheck,
  Layers3,
  Scissors,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Contact Us",
    description:
      "Reach out to us via phone at (+919911111247) or email at (Clinicryanofficial@gmail.com) to schedule a consultation.",
    icon: Phone,
  },
  {
    id: 2,
    title: "Consultation",
    description:
      "Book an appointment for an initial consultation with our expert team. This is your opportunity to discuss your concerns, goals, and expectations.",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Evaluation",
    description:
      "During your consultation, our specialists will conduct a thorough evaluation of your skin or hair condition to recommend the best treatment plan.",
    icon: ClipboardCheck,
  },
  {
    id: 4,
    title: "Treatment Plan",
    description:
      "Based on the evaluation, we will customize a treatment plan tailored to your specific needs and desired outcomes.",
    icon: Layers3,
  },
  {
    id: 5,
    title: "Procedure",
    description:
      "Once you decide to proceed, our skilled medical team will perform the procedure with precision and care in our state‑of‑the‑art facility.",
    icon: Scissors,
  },
  {
    id: 6,
    title: "Follow‑Up",
    description:
      "Post‑procedure, we will provide detailed instructions for aftercare and schedule follow‑up appointments to monitor your progress.",
    icon: CheckCircle2,
  },
  {
    id: 7,
    title: "Feedback and Support",
    description:
      "We value your feedback and are here to support you throughout your journey to achieve optimal results.",
    icon: MessageCircle,
  },
];

export default function ChooseSection() {
  return (
    <section className="w-full bg-white">
      <div className="containerFull mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="stickyItem">
          <h2 className="small_heading font-bold underline mb-2 text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-700 font-semibold mb-6">
            Our Clinic is a leading clinic in India, specializing in hair
            transplants and skin treatments. Renowned for our world‑class care,
            consistent results, aesthetic precision, and natural outcomes, we
            are especially recognized for our expert Turkish specialists. Our
            reputation extends beyond India, attracting clients from around the
            globe.
          </p>
          <div className="w-full">
            <Image
              src="https://res.cloudinary.com/dq1tzl5ir/image/upload/v1751454194/uploads/m6b8awmxtvefmp3mbgjm.webp"
              alt="Clinic Procedure"
              width={800}
              height={500}
              className="rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="h-156 pt-4 overflow-scroll sidebarsection">
          <div className="lg:border-l border-gray-700 lg:pl-8 pt-4 flex flex-col gap-8">
            {steps.map(({ id, title, description, icon: Icon }) => (
              <div key={id} className="">
                <div className="flex items-baseline gap-2">
                  <div className="min-w-[42px] h-[42px] flex items-center justify-center rounded-full border-2 border-gray-400">
                    <Icon size={18} className="text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-500 mb-1">
                    {title}
                  </h3>
                </div>
                <div>
                  <p className="text-gray-700 mt-2 font-semibold ">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
