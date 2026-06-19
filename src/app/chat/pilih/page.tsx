import { Suspense } from "react";
import ChatPilihClient from "./ChatPilihClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ChatPilihClient />
    </Suspense>
  );
}