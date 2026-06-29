import { reportsData } from "@/features/reports/seeds"
import { ReportCard } from "@/features/reports/components/ReportCard"

export function ReportsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {reportsData.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  )
}
