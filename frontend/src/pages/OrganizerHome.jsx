export default function OrganizerHome() {
    const username = localStorage.getItem("id");
    return (
      <div className="container">
        <h1>Bienvenido, {username} (Organizer)</h1>
        <p>Este es el panel de organización.</p>
      </div>
    );
  }
