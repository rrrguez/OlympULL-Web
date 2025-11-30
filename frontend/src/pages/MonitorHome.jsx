export default function MonitorHome() {
    const username = localStorage.getItem("username");
    return (
      <div className="container mt-5">
        <h1>Bienvenido, {username} (Monitor)</h1>
        <p>Este es el panel de monitorización.</p>
      </div>
    );
  }
