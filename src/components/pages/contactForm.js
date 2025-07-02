"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-new stickyItem">
      <div className="p-6 py-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Book Your Free consult Now !
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-flow-col gap-4">
            <Input
              placeholder="Your Name*"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <Input
            placeholder="Contact Number*"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
         
          {/* <Input
            placeholder="Your Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          /> */}
          <Select value={formData.serviceType} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="What do you want" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Free Consultation</SelectItem>
              <SelectItem value="hair-transplant">Hair Transplant</SelectItem>
              <SelectItem value="beard-transplant">Beard Transplant</SelectItem>
              <SelectItem value="pricing">Pricing Information</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="h-24"
          />
          <Button type="submit" className="w-full h-12 text-white bg-gray-800 hover:bg-gray-900">
            Get a Free Consult
          </Button>
        </form>

        {/* Floating action buttons */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-4">
          <Button
            size="icon"
            className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          >
            <Phone className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
