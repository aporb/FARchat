import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, Activity, Shield, Search } from 'lucide-react'
import { StatsCard } from '@/components/admin/StatsCard'
import { UserCard } from '@/components/admin/UserCard'
import { Input } from '@/components/ui/input'

export default async function AdminPage() {
    const supabase = await createSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-destructive" />
                    </div>
                    <h1 className="text-xl font-bold mb-2">Access Denied</h1>
                    <p className="text-muted-foreground mb-6">
                        You do not have permission to access this page.
                    </p>
                    <Link
                        href="/chat"
                        className="text-primary hover:underline inline-flex items-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Chat
                    </Link>
                </div>
            </div>
        )
    }

    const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

    const adminCount = users?.filter(u => u.role === 'admin').length || 0
    const totalUsers = users?.length || 0

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b md:hidden">
                <div className="flex items-center justify-between h-14 px-4">
                    <Link
                        href="/chat"
                        className="flex items-center gap-2 text-muted-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-federal-navy flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Admin</span>
                    </div>
                    <div className="w-[44px]" /> {/* Spacer for alignment */}
                </div>
            </header>

            {/* Desktop Header */}
            <header className="hidden md:block bg-card border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/chat"
                                className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Chat
                            </Link>
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        </div>
                        <span className="px-3 py-1 bg-federal-navy/10 text-federal-navy rounded-full text-sm font-medium">
                            Admin
                        </span>
                    </div>
                </div>
            </header>

            <main className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* Stats Grid - 2 columns mobile, 3 desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <StatsCard
                        title="Total Users"
                        value={totalUsers}
                        icon={Users}
                        trend={{ value: 12, isPositive: true }}
                    />
                    <StatsCard
                        title="Admins"
                        value={adminCount}
                        icon={Shield}
                    />
                    <StatsCard
                        title="System Status"
                        value="Online"
                        icon={Activity}
                        className="col-span-2 md:col-span-1"
                    />
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10 min-h-[44px]"
                    />
                </div>

                {/* User List */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">User Management</h2>

                    {/* Mobile: Card view */}
                    <div className="md:hidden space-y-3">
                        {users?.map((userRow) => (
                            <UserCard key={userRow.id} user={userRow} />
                        ))}
                        {(!users || users.length === 0) && (
                            <div className="text-center py-8 text-muted-foreground">
                                No users found.
                            </div>
                        )}
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden md:block bg-card rounded-xl shadow-sm border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tier
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-card divide-y divide-border">
                                    {users?.map((userRow) => (
                                        <tr key={userRow.id} className="hover:bg-muted/50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {userRow.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    userRow.role === 'admin'
                                                        ? 'bg-federal-navy/10 text-federal-navy'
                                                        : userRow.role === 'pro'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-muted text-muted-foreground'
                                                }`}>
                                                    {userRow.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                                {userRow.tier || 'free'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                                {new Date(userRow.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {(!users || users.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-sm text-muted-foreground">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                        Error loading users: {error.message}
                    </div>
                )}
            </main>
        </div>
    )
}