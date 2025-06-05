// import supabase from "@/lib/supabase/client";

// /**
//  * This saves profile avatar to supabase storage and returns publicUrl: string
//  * @param userId
//  * @param file
//  * @returns string
//  */
// export async function uploadAvatar(userId: string, file: File) {
//   const path = `${userId}/${file.name}`;

//   const { data, error } = await supabase.storage
//     .from("avatars")
//     .upload(path, file, { upsert: true }); // file is overwritten if it exist

//   if (error) throw error;

//   const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
//   return urlData?.publicUrl;
// }

// const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (!file || !user) return;

//   const avatarUrl = await uploadAvatar(user.id, file);
//   await supabase
//     .from("profiles")
//     .update({ avatar_url: avatarUrl })
//     .eq("id", user.id);
// };
