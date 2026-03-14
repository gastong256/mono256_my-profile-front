import { apiClient } from "@/lib/api/client";
import type {
  ContactSubmissionDetailResponse,
  ContactSubmissionListQuery,
  ContactSubmissionListResponse,
  UpdateSubmissionReviewStatusRequest,
  UpdateSubmissionReviewStatusResponse
} from "@/types/api";

function buildQueryString(query: ContactSubmissionListQuery): string {
  const searchParams = new URLSearchParams();

  if (query.page) {
    searchParams.set("page", String(query.page));
  }

  if (query.pageSize) {
    searchParams.set("pageSize", String(query.pageSize));
  }

  if (query.reviewStatus) {
    searchParams.set("reviewStatus", query.reviewStatus);
  }

  if (query.deliveryStatus) {
    searchParams.set("deliveryStatus", query.deliveryStatus);
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function listContactSubmissions(authToken: string, query: ContactSubmissionListQuery) {
  return apiClient<ContactSubmissionListResponse>(`/admin/contact-submissions${buildQueryString(query)}`, {
    method: "GET",
    cache: "no-store",
    authToken
  });
}

export function getContactSubmission(authToken: string, submissionId: string) {
  return apiClient<ContactSubmissionDetailResponse>(`/admin/contact-submissions/${submissionId}`, {
    method: "GET",
    cache: "no-store",
    authToken
  });
}

export function updateContactSubmissionReviewStatus(
  authToken: string,
  submissionId: string,
  payload: UpdateSubmissionReviewStatusRequest
) {
  return apiClient<UpdateSubmissionReviewStatusResponse, UpdateSubmissionReviewStatusRequest>(
    `/admin/contact-submissions/${submissionId}`,
    {
      method: "PATCH",
      body: payload,
      authToken
    }
  );
}
