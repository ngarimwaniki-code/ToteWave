import LoyaltyPoints from "@/components/Loyalty/LoyaltyPoints";
import RedeemRewards from "@/components/Loyalty/RedeemRewards";
import { Award } from "lucide-react";

const LoyaltyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <Award className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Loyalty Program</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <LoyaltyPoints />
        </div>
        <div>
          <RedeemRewards />
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;