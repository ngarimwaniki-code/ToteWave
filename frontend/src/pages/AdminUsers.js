import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminUsers = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Wilson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsers;
