import { apiClient } from "@/lib/api/client";
import type { ContactRequest, ContactResponse } from "@/types/api";

export function submitContactRequest(payload: ContactRequest) {
  return apiClient<ContactResponse, ContactRequest>("/contact", {
    method: "POST",
    body: payload
  });
}
