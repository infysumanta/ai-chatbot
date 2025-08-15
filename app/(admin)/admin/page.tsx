import { getDashboardStats, getChatsWithTokenUsagePaginated } from '@/lib/db/queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Zap, Activity } from 'lucide-react';
import { ChatDataTable } from '@/components/admin/chat-data-table';
import { chatColumns, type ChatData } from '@/components/admin/chat-columns';
import { AdminNavbar } from '@/components/admin/admin-navbar';

interface AdminPageProps {
  searchParams: {
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
  };
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 10;
  const sortBy = searchParams.sortBy || 'chatCreatedAt';
  const sortOrder = searchParams.sortOrder || 'desc';
  const searchTerm = searchParams.search;

  const [dashboardStats, paginatedChats] = await Promise.all([
    getDashboardStats(),
    getChatsWithTokenUsagePaginated({
      page,
      pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    })
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalChats}</div>
            <p className="text-xs text-muted-foreground">
              Active conversations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number(dashboardStats.totalMessages).toLocaleString("en-US")}</div>
            <p className="text-xs text-muted-foreground">
              Messages exchanged
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Number(dashboardStats.totalTokens).toLocaleString("en-US")}</div>
            <p className="text-xs text-muted-foreground">
              Tokens consumed
            </p>
          </CardContent>
        </Card>
      </div>

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
