import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DocumentChart } from "@/components/dashboard/DocumentChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchDashboardStats, fetchActivity, fetchChartData, fetchStatusData } from "@/lib/api";
import type { DashboardStats } from "@/lib/mock-data";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([fetchDashboardStats(), fetchActivity(), fetchChartData(), fetchStatusData()]).then(
      ([s, a, b, p]) => { setStats(s); setActivity(a); setBarData(b); setPieData(p); }
    );
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of your document management system</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/documents" className="gap-2">
              <FileText className="h-4 w-4" /> View Pending
            </Link>
          </Button>
          <DocumentUploadDialog />
        </div>
      </div>

      <StatsCards stats={stats} />
      <DocumentChart barData={barData} pieData={pieData} />
      <RecentActivity items={activity} />
    </div>
  );
};

export default Dashboard;
