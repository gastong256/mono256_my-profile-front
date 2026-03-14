export type HealthResponse = {
  status: "ok";
};

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "SERVICE_UNAVAILABLE"
  | "UNKNOWN";

export type ApiClientOptions<TBody = unknown> = {
  method?: ApiMethod;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number | false;
  authToken?: string | null;
  signal?: AbortSignal;
};

export type ContactRequest = {
  name: string;
  subject: string;
  email: string;
  message: string;
  website: string;
  captchaToken?: string;
};

export type ContactResponse = {
  success: true;
  message: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  user: AuthUser;
};

export type MeResponse = {
  user: AuthUser;
};

export const reviewStatusOptions = ["NEW", "IN_REVIEW", "RESOLVED", "SPAM"] as const;
export type ReviewStatus = (typeof reviewStatusOptions)[number];

export const deliveryStatusOptions = ["PENDING", "SENT", "FAILED", "SKIPPED"] as const;
export type DeliveryStatus = (typeof deliveryStatusOptions)[number];

export type ContactSubmissionListItem = {
  id: string;
  name: string;
  subject: string;
  email: string;
  messagePreview: string;
  reviewStatus: ReviewStatus;
  deliveryStatus: DeliveryStatus;
  deliveryAttempts: number;
  createdAt: string;
  updatedAt: string;
  lastDeliveryAttemptAt: string | null;
  deliveredAt: string | null;
};

export type ContactSubmissionDetail = {
  id: string;
  name: string;
  subject: string;
  email: string;
  message: string;
  reviewStatus: ReviewStatus;
  deliveryStatus: DeliveryStatus;
  deliveryAttempts: number;
  lastDeliveryAttemptAt: string | null;
  deliveredAt: string | null;
  lastDeliveryError: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ContactSubmissionListQuery = {
  page?: number;
  pageSize?: number;
  reviewStatus?: ReviewStatus;
  deliveryStatus?: DeliveryStatus;
};

export type ContactSubmissionListResponse = {
  items: ContactSubmissionListItem[];
  pagination: PaginationMeta;
};

export type ContactSubmissionDetailResponse = {
  submission: ContactSubmissionDetail;
};

export type UpdateSubmissionReviewStatusRequest = {
  reviewStatus: ReviewStatus;
};

export type UpdateSubmissionReviewStatusResponse = {
  submission: Pick<ContactSubmissionDetail, "id" | "reviewStatus" | "updatedAt">;
};
