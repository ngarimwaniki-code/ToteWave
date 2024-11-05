import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Steps = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
        <motion.div
          className="absolute h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {index + 1}
            </motion.div>
            <div className="mt-2 text-xs font-medium text-center">
              <div className="text-foreground">{step.title}</div>
              <div className="text-muted-foreground max-w-[120px]">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};