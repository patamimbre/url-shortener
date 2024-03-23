'use client'

import { useCopyToClipboard } from 'usehooks-ts'
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { ShortenActionState } from "../lib/types";
import { shortenUrl } from "../lib/actions";
import QRCode from "react-qr-code";
import { useEffect, useState } from 'react';

export default function Shortener() {
  const initialState = {};
  const [state, dispatch] = useFormState<ShortenActionState, FormData>(shortenUrl, initialState);

  return (
    <>
      <form action={dispatch} className="w-full max-w-md space-y-4">
        <Label htmlFor="link">The original URL</Label>
        <Input id="link" name="link" type="text" placeholder="https://..." />
        <ShortenButton />
      </form>
      <ShortenResult state={state} />
    </>
  )
}

function ShortenButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white">
        Shorten It!
    </Button>
  );
}

function ShortenResult({
  state,
}: {
  state: ShortenActionState;
}) {
  const { pending } = useFormStatus();
  const [copiedText, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // set copiedText to false
    setCopied(false);
  }, [state.link]);

  const handleCopy = () => {
    // set copiedText to true
    setCopied(true);
    // copy the link
    copy(state.link!);
  }


  if (pending) return <p>Shortening...</p>;

  if (!pending && state?.error) {
    return <p className="text-red-500">{state.error}</p>;
  }

  if (!pending && state?.link) {
    return (
      <div className="w-full max-w-md space-y-4">
        <Label htmlFor="shortened">Shortened URL</Label>
        <div className="flex flex-row">
          <Input id="shortened" type="text" placeholder="https://short.nd/r/pink-pig-dance" value={state.link} />
          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <div className="flex justify-center py-6">
          {state?.original && <QRCode value={state.original} />}
        </div>
      </div>
    )
  }

  return null;
}