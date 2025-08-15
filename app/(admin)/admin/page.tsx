import { getDashboardStats, getChatsWithTokenUsagePaginated, getTokenUsageByModel } from '@/lib/db/queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatDataTable } from '@/components/admin/chat-data-table';
import { chatColumns, type ChatData } from '@/components/admin/chat-columns';
import { AdminNavbar } from '@/components/admin/admin-navbar';
import { StatsCards } from '@/components/admin/stats-cards';
import { TokenUsageByModelTable } from '@/components/admin/token-usage-by-model-table';

interface AdminPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
  }>;
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const queryparams = await searchParams;
  const page = Number(queryparams.page) || 1;
  const pageSize = Number(queryparams.pageSize) || 10;
  const sortBy = queryparams.sortBy || 'chatCreatedAt';
  const sortOrder = queryparams.sortOrder || 'desc';
  const searchTerm = queryparams.search;

  const [dashboardStats, paginatedChats, tokenUsageByModel] = await Promise.all([
    getDashboardStats(),
    getChatsWithTokenUsagePaginated({
      page,
      pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    }),
    getTokenUsageByModel()
  ]);

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, monitor chats, and track token usage across your platform.
          </p>
        </div>

      {/* Stats Cards */}
      <StatsCards stats={dashboardStats} />

      {/* Token Usage by Model */}
      <TokenUsageByModelTable data={tokenUsageByModel} />

      {/* Chats Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Chats</CardTitle>
          <CardDescription>
            Monitor chat activity and token usage across all conversations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatDataTable 
            columns={chatColumns} 
            data={paginatedChats.data as ChatData[]}
            pagination={paginatedChats.pagination}
          />
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default AdminPage;
