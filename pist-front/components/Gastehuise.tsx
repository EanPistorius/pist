const guesthouses = [
  {
    name: "Guesthouse 1",
    distance: "1.2 km",
    link: "#",
  },
  {
    name: "Guesthouse 2",
    distance: "2.5 km",
    link: "#",
  },
];

export default function Guesthouses() {
  return (
    <div className="p-4 border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        🏨 Gastehuise naby die Kerk
      </h2>

      <div className="space-y-3">
        {guesthouses.map((g, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <p className="font-medium">{g.name}</p>
            <p className="text-sm text-gray-500">{g.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}