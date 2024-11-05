import React from 'react';

const Table = ({ children, ...props }) => (
  <table {...props} className="min-w-full divide-y divide-gray-200">
    {children}
  </table>
);

const TableHeader = ({ children, ...props }) => (
  <thead {...props} className="bg-gray-50">
    {children}
  </thead>
);

const TableBody = ({ children, ...props }) => (
  <tbody {...props} className="bg-white divide-y divide-gray-200">
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }) => (
  <tr {...props}>{children}</tr>
);

const TableHead = ({ children, ...props }) => (
  <th
    {...props}
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const TableCell = ({ children, ...props }) => (
  <td {...props} className="px-6 py-4 whitespace-nowrap">
    {children}
  </td>
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };