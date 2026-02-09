import ImageCard from "./ImageCard";
import { createClient } from "@supabase/supabase-js";

console.log("Connecting to:", process.env.SUPABASE_URL);
const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient( supabaseUrl, supabaseAnonKey,
  {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  }
);

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  const { data: images, error } = await supabase
    .from("images")
    .select(`
      id,
      url,
      captions (
        id,
        content
      )
    `)
    .eq("is_public", true)
    .order("created_datetime_utc", { ascending: false })
    .limit(25);

  if (error) return <pre>{error.message}</pre>;

  return (
    <main style={{ padding: 20 }}>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 16 }}>
        {images && images.length > 0 ? (
          images.map((image) => (
            <ImageCard key={image.id} image={image as any} />
          ))
        ) : (
          <p>No public images available.</p>
        )}
      </div>
    </main>
  );
}
