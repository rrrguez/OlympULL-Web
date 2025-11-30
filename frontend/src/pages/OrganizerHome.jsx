export default function OrganizerHome() {
    const username = localStorage.getItem("username");
    return (
      <div className="container mt-5">
        <h1>Bienvenido, {username} (Organizer)</h1>
        <p>Este es el panel de organización.</p>
      </div>
    );
  }
