export default function ProgramPage() {
  const program = [
    {
      time: "14:00",
      title: "Gaste arriveer",
      description: "Welkom drinkies en registrasie by Cathedral Peak Hotel.",
    },
    {
      time: "15:00",
      title: "Seremonie",
      description: "Die troue seremonie begin in die kapel.",
    },
    {
      time: "16:00",
      title: "Fotosessie",
      description: "Paartjie fotos en familie foto's in die berge.",
    },
    {
      time: "18:00",
      title: "Koktail Uur",
      description: "Drankies en ligte verversings op die dek.",
    },
    {
      time: "19:30",
      title: "Aandete & Toesprake",
      description: "Offisiële aandete en speeches.",
    },
    {
      time: "22:00",
      title: "Dansvloer open",
      description: "Musiek, dans en feesviering begin.",
    },
  ];

  return (
    <main className="container">
      {/* Header */}
      <section className="section center">
        <h1>Program 💍</h1>

        <p className="text-muted">
          ’n Oorsig van die dag se verloop
        </p>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="timeline">
          {program.map((item, index) => (
            <div key={index} className="timeline-item">
              {/* Time */}
              <div className="timeline-time">
                {item.time}
              </div>

              {/* Dot */}
              <div className="timeline-dot" />

              {/* Content */}
              <div className="card timeline-card">
                <h3>{item.title}</h3>
                <p className="text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}