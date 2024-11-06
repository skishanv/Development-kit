import React from 'react';
import { Brain, Heart, Users, Dumbbell } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to LifeBalance
        </h1>
        <p className="text-gray-600">
          Your journey to a more balanced and fulfilling life starts here
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FeatureCard
          icon={<Brain className="w-8 h-8" />}
          title="Mental Growth"
          description="Enhance focus, learning, and cognitive abilities"
          color="bg-blue-100"
          textColor="text-blue-600"
        />
        <FeatureCard
          icon={<Heart className="w-8 h-8" />}
          title="Emotional Balance"
          description="Develop emotional intelligence and resilience"
          color="bg-red-100"
          textColor="text-red-600"
        />
        <FeatureCard
          icon={<Users className="w-8 h-8" />}
          title="Social Connection"
          description="Build meaningful relationships and social skills"
          color="bg-green-100"
          textColor="text-green-600"
        />
        <FeatureCard
          icon={<Dumbbell className="w-8 h-8" />}
          title="Physical Health"
          description="Improve fitness, nutrition, and overall wellbeing"
          color="bg-yellow-100"
          textColor="text-yellow-600"
        />
      </div>

      <div className="text-center text-gray-600">
        <p>Let's personalize your experience in a few simple steps</p>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  textColor: string;
}

function FeatureCard({ icon, title, description, color, textColor }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className={`${color} ${textColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}