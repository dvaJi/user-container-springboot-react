import DashboardItem from "../components/DashboardItem";

function Dashboard() {
  return (
    <div className="App">
      <DashboardItem
        title="Lista de Usuarios Activos"
        to="/users"
        icon="user"
      />
    </div>
  );
}

export default Dashboard;
