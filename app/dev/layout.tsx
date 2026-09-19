import { notFound } from "next/navigation";
import React from "react";

export default function DevOnlyLayout({ children }: { children: React.ReactNode }) {
    if (process.env.NODE_ENV != "development")
        return notFound()
    return <>{children}</>
}
