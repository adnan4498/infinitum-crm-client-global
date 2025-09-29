import { DashboardLayout } from "@/components/dashboard-layout";
import { AttendanceSection } from "@/components/attendance-section";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AttendancePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold mb-6">My Attendance</h1>
            <div className="max-w-md">
              <AttendanceSection />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}