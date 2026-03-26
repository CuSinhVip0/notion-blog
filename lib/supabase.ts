import { createClient } from "@supabase/supabase-js"

//setup key supabase
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const THUMBNAIL_BUCKET = "thumbnails"
