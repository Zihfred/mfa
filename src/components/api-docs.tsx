import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Bank Statement Viewer Component</h1>
        <p className="text-lg text-muted-foreground mb-4">
          A standalone component for parsing and displaying Bank of America statement data from CSV files.
        </p>
        <Link href="/widget/src/components/register">
          <Button>Upload New Statement</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Main capabilities of the component</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Upload Interface (<Link href="/widget/src/components/register" className="text-primary hover:underline">/register</Link>)</h3>
            <p>A dedicated page for uploading new Bank of America CSV statement files. Each upload creates a new instance of the viewer component.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Statement Viewer (/{"{id}"})</h3>
            <p>A detailed view of the parsed statement data, including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Account summary with beginning/ending balances</li>
                <li>Total credits and debits</li>
                <li>Detailed transaction list</li>
              </ul>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-mono">POST</span>
            <CardTitle>/api/uploads</CardTitle>
          </div>
          <CardDescription>
            Upload a new Bank of America CSV statement file to create a new viewer instance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Request</h3>
            <p className="mb-2">Content-Type: multipart/form-data</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>file</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Bank of America statement CSV file (max 5MB)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Response</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>UUID</TableCell>
                  <TableCell>Unique identifier for accessing the viewer instance</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Example Response</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              {JSON.stringify({
                id: "123e4567-e89b-12d3-a456-426614174000"
              }, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-mono">GET</span>
            <CardTitle>/{"{id}"}/api/data</CardTitle>
          </div>
          <CardDescription>
            Retrieve parsed statement data for a specific viewer instance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Parameters</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Required</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>UUID</TableCell>
                  <TableCell>The unique identifier of the viewer instance</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Response Format</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>summary</TableCell>
                  <TableCell>Object</TableCell>
                  <TableCell>Account summary information</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>summary.beginningBalance</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Starting balance for the statement period</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>summary.totalCredits</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Sum of all credits</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>summary.totalDebits</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Sum of all debits</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>summary.endingBalance</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Final balance for the statement period</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>transactions</TableCell>
                  <TableCell>Array</TableCell>
                  <TableCell>List of all transactions in the statement</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Transaction Object Format</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>date</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Transaction date (MM/DD/YYYY)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>description</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Transaction description</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>amount</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Transaction amount (negative for debits)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>runningBalance</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Account balance after this transaction</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Example Response</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              {JSON.stringify({
                summary: {
                  beginningBalance: "3443.67",
                  totalCredits: "1223614.04",
                  totalDebits: "-1198222.65",
                  endingBalance: "28835.06"
                },
                transactions: [
                  {
                    date: "01/01/2024",
                    description: "Beginning balance as of 01/01/2024",
                    amount: "",
                    runningBalance: "3443.67"
                  },
                  {
                    date: "01/02/2024",
                    description: "External transfer fee - Next Day - 12/29/2023 Confirmation: 471063312",
                    amount: "-5.00",
                    runningBalance: "3438.67"
                  }
                ]
              }, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status Code</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>400</TableCell>
                  <TableCell>Invalid UUID format</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>404</TableCell>
                  <TableCell>Viewer instance not found</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>500</TableCell>
                  <TableCell>Server error while parsing statement data</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-mono">GET</span>
            <CardTitle>/{"{id}"}/api/file</CardTitle>
          </div>
          <CardDescription>
            Download the original CSV file for a specific viewer instance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Parameters</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Required</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>UUID</TableCell>
                  <TableCell>The unique identifier of the viewer instance</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Response</h3>
            <p>Returns the original CSV file with Content-Type: text/csv</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status Code</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>400</TableCell>
                  <TableCell>Invalid UUID format</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>404</TableCell>
                  <TableCell>Viewer instance not found</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>500</TableCell>
                  <TableCell>Server error while retrieving file</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
