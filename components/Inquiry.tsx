"use client";
import { useState } from "react";
export default function Inquiry({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const query = `Hello Morocco Tour Marrakech, I would like to check availability for ${title}.\nPreferred date: ${date}\nTravelers: ${people}\n${message}\nTour: ${url}`;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setReady(true);
      }}
      className="inquiry-form"
    >
      <label>
        Preferred date
        <input
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          required
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setReady(false);
          }}
        />
      </label>
      <label>
        Travelers
        <input
          type="number"
          min="1"
          max="50"
          required
          value={people}
          onChange={(e) => {
            setPeople(e.target.value);
            setReady(false);
          }}
        />
      </label>
      <label>
        Your questions
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setReady(false);
          }}
          placeholder="Pickup, rooms, upgrades or anything else…"
          maxLength={1500}
        />
      </label>
      {ready ? (
        <a
          className="button"
          href={`https://wa.me/212600454881?text=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send your request on WhatsApp ↗
        </a>
      ) : (
        <button className="button" type="submit">
          Prepare availability request ↗
        </button>
      )}
      <p className="fineprint">
        Send your request through WhatsApp. Our team will confirm availability,
        the final price and arrangements. This does not reserve a place.
      </p>
    </form>
  );
}
