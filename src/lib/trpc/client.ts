"use client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@/server";

export const api = createTRPCReact<AppRouter>({});
