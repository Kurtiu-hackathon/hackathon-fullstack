import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local não encontrado — usa variáveis de ambiente do sistema
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !serviceKey) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY no .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const USERS = [
  { email: "admin@admin.com",        password: "12345678", role: "ADMIN"       },
  { email: "super@admin.com",        password: "12345678", role: "SUPER_ADMIN" },
  { email: "user@moderator.com",     password: "12345678", role: "MODERATOR"   },
  { email: "user@user.com",          password: "12345678", role: "USER"        },
] as const;

async function seed() {
  let ok = 0;
  let skipped = 0;

  for (const u of USERS) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      app_metadata: { role: u.role },
    });

    if (error) {
      if (error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("already been registered") ||
          error.code === "email_exists") {
        console.log(`⚠  ${u.email} já existe — pulando`);
        skipped++;
      } else {
        console.error(`✗  ${u.email}: ${error.message}`);
      }
    } else {
      console.log(`✓  ${u.email} criado (id: ${data.user.id}, role: ${u.role})`);
      ok++;
    }
  }

  console.log(`\nSeed concluído: ${ok} criado(s), ${skipped} já existia(m).`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
