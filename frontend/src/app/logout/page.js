'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "react-toastify";

export default function LogoutPage() {
  const router = useRouter();


  return <p className="text-center mt-20">Logging out...</p>;
}
