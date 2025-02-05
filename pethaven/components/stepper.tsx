interface StepperProps {
    steps: { title: string; id: number }[]
    currentStep: number
  }
  
  export function Stepper({ steps, currentStep }: StepperProps) {
    return (
      <div className="relative">
        {/* Connecting lines container */}
        <div className="absolute top-4 left-0 right-0 h-[2px]">
          <div className="h-full bg-gray-200" />
          <div
            className="absolute top-0 left-0 h-full bg-violet-600 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
  
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index + 1 <= currentStep
                    ? "bg-violet-600 text-white"
                    : "bg-white border-2 border-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm text-gray-600">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  