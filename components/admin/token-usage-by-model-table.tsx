import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TokenUsageByModel {
  model: string | null;
  totalInputTokens: string | null;
  totalOutputTokens: string | null;
  totalTokens: string | null;
  messageCount: number;
}

interface TokenUsageByModelTableProps {
  data: TokenUsageByModel[];
}

export function TokenUsageByModelTable({ data }: TokenUsageByModelTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Usage by Model</CardTitle>
        <CardDescription>
          Track token consumption and costs across different AI models.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Messages</TableHead>
                <TableHead className="text-right">Input Tokens</TableHead>
                <TableHead className="text-right">Output Tokens</TableHead>
                <TableHead className="text-right">Total Tokens</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((model, index) => (
                <TableRow key={model.model || `unknown-${index}`}>
                  <TableCell className="font-medium">
                    {model.model || 'Unknown Model'}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(model.messageCount).toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(model.totalInputTokens || 0).toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(model.totalOutputTokens || 0).toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {Number(model.totalTokens || 0).toLocaleString("en-US")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No model usage data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}