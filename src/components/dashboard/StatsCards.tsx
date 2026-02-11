import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/mock-data";

const statConfig = [
  { key: "totalDocuments" as const, label: "Total Documents", icon: FileText, color: "text-primary" },
  { key: "pending" as const, label: "Pending Review", icon: Clock, color: "text-warning" },
  { key: "approved" as const, label: "Approved", icon: CheckCircle2, color: "text-success" },
  { key: "rejected" as const, label: "Rejected", icon: XCircle, color: "text-destructive" },
];

export function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-3xl font-display font-bold mt-1">{stats[key].toLocaleString()}</p>
              </div>
              <div className={`h-11 w-11 rounded-xl bg-muted flex items-center justify-center ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
