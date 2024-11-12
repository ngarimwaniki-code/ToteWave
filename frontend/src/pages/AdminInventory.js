import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminInventory = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Stock Level</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Premium T-Shirt</TableCell>
            <TableCell>TSH-001</TableCell>
            <TableCell>125</TableCell>
            <TableCell><Badge variant="success">In Stock</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Designer Jeans</TableCell>
            <TableCell>DNJ-002</TableCell>
            <TableCell>8</TableCell>
            <TableCell><Badge variant="warning">Low Stock</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Summer Dress</TableCell>
            <TableCell>DRS-003</TableCell>
            <TableCell>0</TableCell>
            <TableCell><Badge variant="destructive">Out of Stock</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminInventory;
