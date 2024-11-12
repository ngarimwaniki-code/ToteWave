import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Promotions = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Current Promotions</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Summer Sale
              <Badge>30% OFF</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get 30% off on all summer collection items.</p>
            <p className="text-sm text-muted-foreground mt-2">Valid until August 31st</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              New Customer
              <Badge variant="secondary">$10 OFF</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get $10 off on your first purchase.</p>
            <p className="text-sm text-muted-foreground mt-2">Use code: WELCOME10</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Promotions;
