export default function VenuePage() {
  const rooms = [
    {
      name: "Standard Room",
      price: "± R2,200 per nag",
      desc: "Comfortable room met berg-uitsig of tuin-uitsig.",
    },
    {
      name: "Deluxe Room",
      price: "± R2,900 per nag",
      desc: "Groter kamer met beter uitsig en sit-area.",
    },
    {
      name: "Family Chalet",
      price: "± R4,500 per nag",
      desc: "Ideaal vir families of groepe. Self-catering opsie.",
    },
  ];

  return (
    <main className="container">
      {/* HERO */}
      <section className="section center">
        <h1>Cathedral Peak Hotel</h1>

        <p className="text-muted">
          Ons trou venue en verblyf vir die naweek
        </p>
      </section>

      {/* ABOUT VENUE */}
      <section className="section">
        <div className="card">
          <h2>Die Venue</h2>

          <p>
            Cathedral Peak Hotel is geleë in die hart van die Drakensberge.
            Dit bied ñ perfekte kombinasie van berg-uitsigte, gemaklike verblyf
            en ñ wêreldklas trou-ervaring.
          </p>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section">
        <h2>Verblyf & Pryse</h2>

        <div className="grid">
          {rooms.map((room, i) => (
            <div key={i} className="card">
              <h3>{room.name}</h3>

              <p className="text-muted">{room.desc}</p>

              <p className="price">{room.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT + BOOKING */}
      <section className="section">
        <div className="card">
          <h2>Bespreek Verblyf</h2>

          <p className="text-muted">
            Kontak die hotel direk of besoek hulle webwerf om jou kamer te bespreek.
          </p>

          <div className="actions">
            <a
              href="https://www.cathedralpeak.co.za"
              target="_blank"
              className="btn btn-primary"
            >
              Besoek Webwerf
            </a>

            <a
              href="tel:+27344671111"
              className="btn btn-outline"
            >
              Bel Hotel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}