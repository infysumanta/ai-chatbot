import { auth, signOut } from '@/app/(auth)/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export async function AdminNavbar() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const handleSignOut = async () => {
    'use server';
    await signOut({ redirectTo: '/login' });
  };

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const getUserDisplayName = () => {
    if (session.user.email) {
      const emailPart = session.user.email.split('@')[0];
      return emailPart
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }
    return 'User';
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
             <Link href="/" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Go to Chat</span>
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full text-left">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || undefined} />
                    <AvatarFallback>
                      {getInitials(session.user.email || 'U')}
                    </AvatarFallback>
                  </Avatar>
                   <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{getUserDisplayName()}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{getUserDisplayName()}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                    
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={handleSignOut} className="w-full">
                    <button type="submit" className="flex w-full items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}