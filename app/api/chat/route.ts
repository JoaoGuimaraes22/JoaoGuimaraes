import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Edit this block to add extra context the bot should know about you
const EXTRA_CONTEXT = `
Availability: João is currently open to work and available for freelance or full-time opportunities. Encourage interested visitors to reach out via email or LinkedIn.
Hobbies: João is an avid volleyball coach and competitive gamer. He enjoys coffee (especially espresso) and often codes late at night.
`;

type Dictionary = {
  hero: { name: string; card_bio: string };
  about: { bio: string; fun_facts: { emoji: string; text: string }[] };
  work: {
    projects: {
      title: string;
      description: string;
      tags: string[];
      github: string | null;
      live: string | null;
    }[];
  };
  experience: {
    items: {
      role: string;
      company: string;
      period: string;
      description: string;
    }[];
  };
  techstack: { categories: { name: string; items: string[] }[] };
  contact: { email: string; github: string; linkedin: string };
};

function buildSystemPrompt(dict: Dictionary): string {
  const { hero, about, work, experience, techstack, contact } = dict;

  const projects = work.projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} | Tags: ${p.tags.join(", ")}${p.github ? ` | GitHub: ${p.github}` : ""}${p.live ? ` | Live: ${p.live}` : ""}`
    )
    .join("\n");

  const exp = experience.items
    .map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`)
    .join("\n");

  const tech = techstack.categories
    .map((c) => `${c.name}: ${c.items.join(", ")}`)
    .join("\n");

  const facts = about.fun_facts.map((f) => `${f.emoji} ${f.text}`).join(", ");

  return `You are an AI assistant on João Guimarães's portfolio website. Answer visitor questions about João in a friendly, concise, and professional tone. Stay on topic — only answer questions about João, his work, skills, and experience. If a question is unrelated, politely redirect.

## About João
Name: ${hero.name}
Bio: ${hero.card_bio}

${about.bio}

## Projects
${projects}

## Work Experience
${exp}

## Tech Stack
${tech}

## Fun Facts
${facts}

## Contact
Email: ${contact.email}
GitHub: ${contact.github}
LinkedIn: ${contact.linkedin}

## Extra Context
${EXTRA_CONTEXT.trim()}

Keep answers concise (2–4 sentences unless detail is needed). Use markdown sparingly. When relevant, encourage visitors to get in touch.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, locale } = await req.json();

    const dictPath = path.join(
      process.cwd(),
      "dictionaries",
      locale === "pt" ? "pt.json" : "en.json"
    );
    const dict: Dictionary = JSON.parse(fs.readFileSync(dictPath, "utf-8"));
    const system = buildSystemPrompt(dict);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: system,
    });

    // Convert messages to Gemini format (role: "user" | "model")
    // History = all messages except the last one, skipping leading assistant
    // messages (e.g. the welcome message) since Gemini history must start with "user"
    const rawHistory: { role: string; content: string }[] =
      messages.slice(0, -1);
    const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
    const history =
      firstUserIdx === -1
        ? []
        : rawHistory.slice(firstUserIdx).map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }));
    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.content);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
