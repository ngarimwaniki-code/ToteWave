import { Gift, CreditCard, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const giftCardAmounts = [25, 50, 100, 200];

const GiftCards = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Gift className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Gift Cards</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Amount</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {giftCardAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                className="h-16 text-lg font-medium"
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Recipient's Email
              </label>
              <Input type="email" placeholder="Enter email address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Personal Message (Optional)
              </label>
              <Input
                as="textarea"
                placeholder="Add a personal message..."
                className="h-24"
              />
            </div>
            <Button className="w-full">Purchase Gift Card</Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Our Gift Cards?</CardTitle>
              <CardDescription>
                The perfect gift for any occasion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Easy to Redeem</h3>
                  <p className="text-sm text-gray-500">
                    Use the code at checkout, online or in-store
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Instant Delivery</h3>
                  <p className="text-sm text-gray-500">
                    Sent immediately to recipient's email
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Never Expires</h3>
                  <p className="text-sm text-gray-500">
                    No pressure to use it right away
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>Gift cards are non-refundable</li>
                <li>Can be used for multiple purchases</li>
                <li>Valid for all products on our website</li>
                <li>Cannot be exchanged for cash</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;