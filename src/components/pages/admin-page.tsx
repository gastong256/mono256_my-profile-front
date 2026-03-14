"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { DeliveryStatusBadge, ReviewStatusBadge } from "@/components/admin/admin-status-badge";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { listContactSubmissions } from "@/lib/api/admin";
import { ApiError, getApiErrorMessage } from "@/lib/api/client";
import { formatDateTime } from "@/lib/admin/format";
import type {
  ContactSubmissionListResponse,
  ContactSubmissionListQuery,
  DeliveryStatus,
  ReviewStatus
} from "@/types/api";
import { deliveryStatusOptions, reviewStatusOptions } from "@/types/api";

function readPageParam(value: string | null, fallback: number) {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue >= 1 ? parsedValue : fallback;
}

function readPageSizeParam(value: string | null, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue)) {
    return fallback;
  }

  return Math.min(Math.max(parsedValue, 1), 100);
}

function parseReviewStatus(value: string | null): ReviewStatus | undefined {
  if (!value) {
    return undefined;
  }

  return reviewStatusOptions.find((option) => option === value);
}

function parseDeliveryStatus(value: string | null): DeliveryStatus | undefined {
  if (!value) {
    return undefined;
  }

  return deliveryStatusOptions.find((option) => option === value);
}

function buildQueryString(query: ContactSubmissionListQuery) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(query.page ?? 1));
  searchParams.set("pageSize", String(query.pageSize ?? 20));

  if (query.reviewStatus) {
    searchParams.set("reviewStatus", query.reviewStatus);
  }

  if (query.deliveryStatus) {
    searchParams.set("deliveryStatus", query.deliveryStatus);
  }

  return searchParams.toString();
}

function filterErrorMessage(error: unknown) {
  if (error instanceof ApiError && error.status === 401) {
    return "Your admin session expired. Please sign in again.";
  }

  return getApiErrorMessage(error, "Submissions could not be loaded.");
}

export function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { accessToken, logout } = useAdminAuth();
  const [isNavigating, startNavigation] = useTransition();
  const [data, setData] = useState<ContactSubmissionListResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const page = readPageParam(searchParams.get("page"), 1);
  const pageSize = readPageSizeParam(searchParams.get("pageSize"), 20);
  const reviewStatus = parseReviewStatus(searchParams.get("reviewStatus"));
  const deliveryStatus = parseDeliveryStatus(searchParams.get("deliveryStatus"));

  const query: ContactSubmissionListQuery = {
    page,
    pageSize,
    reviewStatus,
    deliveryStatus
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const token = accessToken;
    const abortController = new AbortController();

    async function loadSubmissions() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await listContactSubmissions(token, {
          page,
          pageSize,
          reviewStatus,
          deliveryStatus
        });

        if (abortController.signal.aborted) {
          return;
        }

        setData(response);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        if (error instanceof ApiError && error.status === 401) {
          logout();
          return;
        }

        setErrorMessage(filterErrorMessage(error));
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadSubmissions();

    return () => {
      abortController.abort();
    };
  }, [accessToken, deliveryStatus, logout, page, pageSize, reviewStatus]);

  function updateQuery(nextQuery: ContactSubmissionListQuery) {
    const queryString = buildQueryString(nextQuery);
    startNavigation(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    });
  }

  const pagination = data?.pagination;

  return (
    <AdminPageShell
      title="Contact submissions"
      subtitle="Dashboard"
      description="Review incoming contact requests, inspect delivery state, and update the review lifecycle."
    >
      <section className="rounded-xl border border-border/80 bg-surface/95 p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-4">
          <div>
            <label htmlFor="reviewStatus" className="mb-2 block text-sm font-medium text-foreground/88">
              Review status
            </label>
            <Select
              id="reviewStatus"
              value={query.reviewStatus ?? ""}
              onChange={(event) =>
                updateQuery({
                  ...query,
                  page: 1,
                  reviewStatus: parseReviewStatus(event.target.value || null)
                })
              }
              disabled={isNavigating}
            >
              <option value="">All review states</option>
              {reviewStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace("_", " ")}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="deliveryStatus" className="mb-2 block text-sm font-medium text-foreground/88">
              Delivery status
            </label>
            <Select
              id="deliveryStatus"
              value={query.deliveryStatus ?? ""}
              onChange={(event) =>
                updateQuery({
                  ...query,
                  page: 1,
                  deliveryStatus: parseDeliveryStatus(event.target.value || null)
                })
              }
              disabled={isNavigating}
            >
              <option value="">All delivery states</option>
              {deliveryStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="pageSize" className="mb-2 block text-sm font-medium text-foreground/88">
              Page size
            </label>
            <Select
              id="pageSize"
              value={String(query.pageSize)}
              onChange={(event) =>
                updateQuery({
                  ...query,
                  page: 1,
                  pageSize: readPageSizeParam(event.target.value, 20)
                })
              }
              disabled={isNavigating}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() =>
                updateQuery({
                  page: 1,
                  pageSize: 20
                })
              }
              disabled={isNavigating}
            >
              Clear filters
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              {pagination ? `${pagination.total} total submissions` : isLoading ? "Loading submissions..." : "No data"}
            </p>
            <p className="text-xs text-foreground/65">Page {query.page} with backend-driven filtering and pagination.</p>
          </div>
          {pagination ? (
            <p className="text-xs font-mono uppercase tracking-wide text-foreground/55">
              {pagination.totalPages} pages · {pagination.pageSize} per page
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-xl border border-border/80 bg-surface/95 shadow-card">
        <div className="border-b border-border/70 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Inbox</p>
          <p className="text-xs text-foreground/65">Open a submission to view the full message and update review status.</p>
        </div>

        {errorMessage ? (
          <div className="px-4 py-6 text-sm font-medium text-[#f0c674]">{errorMessage}</div>
        ) : null}

        {!errorMessage && isLoading ? (
          <div className="px-4 py-10 text-sm text-foreground/70">Loading submissions...</div>
        ) : null}

        {!errorMessage && !isLoading && data && data.items.length === 0 ? (
          <div className="px-4 py-10 text-sm text-foreground/70">No submissions match the current filters.</div>
        ) : null}

        {!errorMessage && data && data.items.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-background/30 text-xs uppercase tracking-wide text-foreground/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Preview</th>
                    <th className="px-4 py-3 font-medium">Statuses</th>
                    <th className="px-4 py-3 font-medium">Attempts</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id} className="border-t border-border/70 align-top">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground/65">{item.email}</p>
                        <p className="mt-1 text-xs text-foreground/75">{item.subject}</p>
                      </td>
                      <td className="px-4 py-3 text-foreground/75">{item.messagePreview}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-2">
                          <ReviewStatusBadge value={item.reviewStatus} />
                          <DeliveryStatusBadge value={item.deliveryStatus} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground/75">
                        <p>{item.deliveryAttempts}</p>
                        <p className="mt-1 text-xs text-foreground/60">Updated {formatDateTime(item.updatedAt)}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground/70">
                        <p>{formatDateTime(item.createdAt)}</p>
                        <p className="mt-1">Last attempt {formatDateTime(item.lastDeliveryAttemptAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/submissions/${item.id}`} className={buttonVariants({ variant: "secondary", size: "sm" })}>
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {data.items.map((item) => (
                <article key={item.id} className="rounded-xl border border-border/70 bg-background/20 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-foreground/65">{item.email}</p>
                    </div>
                    <Link href={`/admin/submissions/${item.id}`} className={buttonVariants({ variant: "secondary", size: "sm" })}>
                      Open
                    </Link>
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">{item.subject}</p>
                  <p className="mt-2 text-sm text-foreground/70">{item.messagePreview}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <ReviewStatusBadge value={item.reviewStatus} />
                    <DeliveryStatusBadge value={item.deliveryStatus} />
                  </div>
                  <div className="mt-3 text-xs text-foreground/60">
                    <p>Attempts: {item.deliveryAttempts}</p>
                    <p>Created: {formatDateTime(item.createdAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 px-4 py-3">
          <p className="text-xs text-foreground/65">
            {pagination ? `Page ${pagination.page} of ${pagination.totalPages}` : "Pagination unavailable until results load."}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={!pagination || pagination.page <= 1 || isNavigating}
              onClick={() =>
                updateQuery({
                  ...query,
                  page: Math.max((query.page ?? 1) - 1, 1)
                })
              }
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!pagination || pagination.page >= pagination.totalPages || isNavigating}
              onClick={() =>
                updateQuery({
                  ...query,
                  page: Math.min((query.page ?? 1) + 1, pagination?.totalPages ?? query.page ?? 1)
                })
              }
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </AdminPageShell>
  );
}
