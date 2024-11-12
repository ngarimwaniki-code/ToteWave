import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Loyalty = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Loyalty Points</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Points Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,250</p>
            <p className="text-sm text-muted-foreground">Points available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rewards Available</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>$5 off your next purchase (500 points)</li>
              <li>Free shipping (750 points)</li>
              <li>$10 gift card (1000 points)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Loyalty;
