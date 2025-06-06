"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import createClient from "@/lib/supabase/client";
import sodium from "libsodium-wrappers";

export default function SetupChat() {
  const router = useRouter();
  const [status, setStatus] = useState("Initializing chat setup...");

  useEffect(() => {
    const setup = async () => {
      await sodium.ready;
      const supabase = createClient();

      setStatus("Getting current user...");
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStatus("No user found. Please login.");
        return;
      }

      // Avoid regenerating keys if they exist
      const { data: existingProfile } = await supabase
        .from("user_keys")
        .select("public_key, encrypted_private_key")
        .eq("id", user.id)
        .single();

      if (
        existingProfile?.public_key &&
        existingProfile?.encrypted_private_key
      ) {
        setStatus("Keys already exist. Redirecting...");
        return router.push("/");
      }

      setStatus("Generating key pair...");
      const keyPair = sodium.crypto_box_keypair();

      // Encrypt the private key using user ID or session token as salt/secret
      // Symmetric encryption setup
      const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

      const encryptionKey = sodium.crypto_generichash(32, user.id);

      // encrypting the private key to store on db
      const encryptedPrivateKey = sodium.crypto_secretbox_easy(
        keyPair.privateKey,
        nonce,
        encryptionKey
      );

      // Convert for storage
      const publicKey = sodium.to_base64(keyPair.publicKey);
      const encryptedKey = sodium.to_base64(encryptedPrivateKey);
      const encodedNonce = sodium.to_base64(nonce);

      setStatus("Saving keys to profile...");

      const { error } = await supabase
        .from("user_keys")
        .insert({
          id: user.id,
          public_key: publicKey,
          encrypted_private_key: encryptedKey,
          key_nonce: encodedNonce,
        })
        .eq("id", user.id);

      if (error) {
        console.error(error);
        setStatus("Failed to save keys. Please try again.");
        return;
      }

      setStatus("Chat setup complete! Redirecting...");
      router.push("/");
    };

    setup();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl font-medium text-center animate-pulse">
        {status}
      </div>
    </div>
  );
}
