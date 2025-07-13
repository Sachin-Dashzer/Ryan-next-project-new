import React from 'react';

const PleoFeatures = () => {
  const features = [
    {
      title: "Instant onboarding",
      description: "Get going in minutes and keep the bank you already have",
      icon: "🚀"
    },
    {
      title: "Payment cards for all",
      description: "Generate virtual and plastic Pleo prepaid cards with only a few clicks",
      icon: "💳"
    },
    {
      title: "Detect fraudulent activities",
      description: "Detect and block suspicious purchases before they even happen",
      icon: "🛡️"
    },
    {
      title: "Account integrations",
      description: "Now no more double procedures, Pleo connects with your accounting software",
      icon: "🔗"
    },
    {
      title: "Spending limits and rights",
      description: "Define rights and limitations for each card and member of your team",
      icon: "🎚️"
    },
    {
      title: "24/7 customer support",
      description: "Get help whenever you need it with our around-the-clock support team",
      icon: "🛎️"
    },
    {
      title: "Receipt matching",
      description: "Categorisation and matching of receipts happen as you pay",
      icon: "🧾"
    },
    {
      title: "Real time dashboard",
      description: "Stay in touch with your own and your team purchases in real time",
      icon: "📊"
    },
    {
      title: "Automatic top-ups",
      description: "Automatic money transfers from your bank, set by your custom needs",
      icon: "🔄"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Pleo Features</h1>
        <h2 className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto">
          Build to benefit the whole company
        </h2>
        <div className="mt-4 w-24 h-1 bg-gray-200 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100"
          >
            <div className="absolute top-0 left-6 w-12 h-0.5 bg-blue-500 group-hover:w-16 transition-all duration-300"></div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl p-2 bg-blue-50 rounded-lg text-blue-600">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PleoFeatures;