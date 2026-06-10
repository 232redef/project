"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Author } from "@/types";
import { ErrorBox, PrimaryButton } from "@/components/Ui";

export default function AuthorForm({ author }: { author?: Author }) {
  const router = useRouter();
  
  const [name, setName] = useState(author?.name || "");
  const [email, setEmail] = useState(author?.email || "");
  const [age, setAge] = useState(author?.age || 18);
  const [isActive, setIsActive] = useState(author?.isActive ?? true);
  const [bio, setBio] = useState(author?.bio || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const payload = { name, email, age: Number(age), isActive, bio };
      
      if (author) {
        await api.updateAuthor(author.id, payload);
      } else {
        await api.createAuthor(payload);
      }
      
      router.push("/authors");
      router.refresh();
    } catch (e) {
      console.error("Submit error:", e);
      setError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      {error ? <ErrorBox message={error} /> : null}
      
      <label className="block text-sm font-medium">
        Имя *
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="block text-sm font-medium">
        Email *
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="block text-sm font-medium">
        Возраст *
        <input
          required
          type="number"
          min={1}
          max={120}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Активный автор
      </label>
      
      <label className="block text-sm font-medium">
        Биография
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      
      <PrimaryButton disabled={loading}>
        {loading ? "Сохранение..." : "Сохранить"}
      </PrimaryButton>
    </form>
  );
}