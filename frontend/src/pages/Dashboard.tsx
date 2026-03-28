import { useAuth } from "../contexts/AuthContext";

import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Login User</h2>
        <p className="text-gray-600">{user?.name}</p>
      </div>
    </DashboardLayout>
  );
}
