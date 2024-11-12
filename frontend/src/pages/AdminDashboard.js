import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import AdminService from '@/services/AdminService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, Tag, Users } from 'lucide-react';
import AdminMenu from '@/components/AdminMenu';

const AdminDashboard = () => {
  const { data: dailyMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['dailyMetrics'],
    queryFn: () => AdminService.getDailyMetrics(),
  });

  const { data: productMetrics } = useQuery({
    queryKey: ['productMetrics'],
    queryFn: () => AdminService.getProductMetrics(),
  });

  const { data: topPerformers } = useQuery({
    queryKey: ['topPerformers'],
    queryFn: () => AdminService.getTopPerformers(),
  });

  const { data: activeSessions } = useQuery({
    queryKey: ['activeSessions'],
    queryFn: () => AdminService.getActiveSessions(),
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <AdminMenu />
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dailyMetrics?.total_sales || '0'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productMetrics?.active_products || '0'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {productMetrics?.active_promotions || '0'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSessions?.count || '0'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AnalyticsTab dailyMetrics={dailyMetrics} />
        </TabsContent>

        <TabsContent value="products">
          <ProductsTab topPerformers={topPerformers} />
        </TabsContent>

        <TabsContent value="promotions">
          <PromotionsTab />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AnalyticsTab = ({ dailyMetrics }) => {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Daily Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyMetrics?.data || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductsTab = ({ topPerformers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformers?.products?.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">Sales: {product.total_sales}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${product.revenue}</p>
                <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PromotionsTab = () => {
  const { data: promotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: () => AdminService.getPromotionUsageStats(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Promotions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {promotions?.map((promo) => (
            <div key={promo.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{promo.name}</p>
                <p className="text-sm text-muted-foreground">
                  Usage: {promo.usage_count} times
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{promo.discount_value}% OFF</p>
                <p className="text-sm text-muted-foreground">
                  Expires: {new Date(promo.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewsTab = () => {
  const { data: reviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => AdminService.getModerationQueue(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews?.map((review) => (
            <div key={review.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{review.product_name}</p>
                <p className="text-sm text-muted-foreground">
                  By: {review.author} - Rating: {review.rating}/5
                </p>
                <p className="text-sm mt-1">{review.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => AdminService.approveReview(review.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => AdminService.rejectReview(review.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
