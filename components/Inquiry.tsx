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
  const query = `Hello Shared Morocco Trips, I would like to check availability for ${title}.\nPreferred date: ${date}\nTravelers: ${people}\n${message}\nTour: ${url}`;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setReady(true);
      }}
      className="[&_label]:mb-4 [&_label]:block [&_label]:text-xs [&_label]:font-semibold [&_input]:mt-2 [&_input]:min-h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-white [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_select]:mt-2 [&_select]:min-h-12 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-stone-200 [&_select]:bg-white [&_select]:px-3 [&_select]:py-3 [&_select]:text-sm [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-stone-200 [&_textarea]:bg-white [&_textarea]:p-4 [&_textarea]:text-sm [&_input:focus]:outline-2 [&_input:focus]:outline-[#ff6435] [&_select:focus]:outline-2 [&_select:focus]:outline-[#ff6435] [&_textarea:focus]:outline-2 [&_textarea:focus]:outline-[#ff6435] [&_textarea]:h-24 [&_button]:w-full [&>a]:w-full"
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
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#ff6435] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df4a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6435]"
          href={`https://wa.me/212600454881?text=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send your request on WhatsApp ↗
        </a>
      ) : (
        <button
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#ff6435] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df4a20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6435]"
          type="submit"
        >
          Continue to WhatsApp ↗
        </button>
      )}
      <p className="my-4 text-xs leading-6 text-stone-500">
        Your request opens WhatsApp for you to review and send. Our team will
        confirm availability, the final price and arrangements. This does not
        reserve a place.
      </p>
    </form>
  );
}
