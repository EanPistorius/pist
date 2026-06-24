"use client";

import { useEffect, useState } from "react";

interface RSVPModalProps {
  close: () => void;
}


export default function RSVPModal({
  close,
}: RSVPModalProps) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [consent, setConsent] = useState(false);
  const [attending, setAttending] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const resetForm = () => {
  setEmail("");
  setNickname("");
  setAttending("");
  setConsent(false);
  setError("");
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nickname,
          attending,
          consent,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Kon nie RSVP stoor nie."
        );
      }

      setSuccess(true);

      setTimeout(() => {
        close();
      }, 1500);
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError(
          "Die versoek het te lank geneem. Probeer asseblief weer."
        );
      } else {
        setError(
          err.message ||
            "Iets het verkeerd geloop."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card rsvp-modal">
      <div className="">
        <h2 className="mb-1">
          RSVP 💍
        </h2>

        <p className="text-muted mb-3">
          Laat weet ons asseblief of u die
          troue sal bywoon.
        </p>

        {success ? (
          <div className="text-center py-6">
            <h3>Dankie!</h3>

            <p className="text-muted mt-2">
              Jou RSVP is suksesvol ontvang.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            >
            <input
              type="email"
              placeholder="E-pos adres"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="input"
            />

            <input
              type="text"
              placeholder="Naam"
              value={nickname}
              onChange={(e) =>
                setNickname(e.target.value)
              }
              required
              className="input"
            />

            <select
              value={attending}
              onChange={(e) =>
                setAttending(e.target.value)
              }
              required
              className="input"
            >
              <option value="">
                Sal u bywoon?
              </option>

              <option value="yes">
                Ja, ek kom graag
              </option>

              <option value="no">
                Ongelukkig nie
              </option>
            </select>

            <label className="text-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) =>
                  setConsent(
                    e.target.checked
                  )
                }
                required
              />

              <span>
                Ek gee toestemming dat julle
                my mag kontak op hierdie epos adres.
              </span>
            </label>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                }}
                className="btn btn-outline"

              >
                Kanselleer
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading
                  ? "Stuur..."
                  : "Stuur RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}