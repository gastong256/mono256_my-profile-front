"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { DeliveryStatusBadge, ReviewStatusBadge } from "@/components/admin/admin-status-badge";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { getContactSubmission, updateContactSubmissionReviewStatus } from "@/lib/api/admin";
import { ApiError, getApiErrorMessage } from "@/lib/api/client";
import { formatDateTime } from "@/lib/admin/format";
import type { ContactSubmissionDetail, ReviewStatus } from "@/types/api";
import { reviewStatusOptions } from "@/types/api";

function detailErrorMessage(error: unknown) {
  if (error instanceof ApiError && error.status === 404) {
    return "This submission no longer exists.";
  }

  return getApiErrorMessage(error, "The submission could not be loaded.");
}

export function AdminSubmissionPage({ submissionId }: { submissionId: string }) {
  const { accessToken, logout } = useAdminAuth();
  const [submission, setSubmission] = useState<ContactSubmissionDetail | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>("NEW");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const token = accessToken;
    let isMounted = true;

    async function loadSubmission() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getContactSubmission(token, submissionId);

        if (!isMounted) {
          return;
        }

        setSubmission(response.submission);
        setSelectedStatus(response.submission.reviewStatus);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof ApiError && error.status === 401) {
          logout();
          return;
        }

        setErrorMessage(detailErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadSubmission();

    return () => {
      isMounted = false;
    };
  }, [accessToken, logout, submissionId]);

  async function handleStatusSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessToken || !submission) {
      return;
    }

    setIsUpdating(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await updateContactSubmissionReviewStatus(accessToken, submission.id, {
        reviewStatus: selectedStatus
      });

      setSubmission((current) =>
        current
          ? {
              ...current,
              reviewStatus: response.submission.reviewStatus,
              updatedAt: response.submission.updatedAt
            }
          : current
      );
      setStatusMessage("Review status updated.");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }

      setErrorMessage(getApiErrorMessage(error, "The review status could not be updated."));
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <AdminPageShell
      title="Submission detail"
      subtitle="Inspection"
      description="Review the full message, delivery metadata, and update the review lifecycle."
    >
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin" className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Back to inbox
        </Link>
        {submission ? <p className="text-xs font-mono text-foreground/60">Submission ID: {submission.id}</p> : null}
      </div>

      {errorMessage ? <div className="rounded-xl border border-border/80 bg-surface/95 p-4 text-sm font-medium text-[#f0c674] shadow-card">{errorMessage}</div> : null}

      {isLoading ? (
        <div className="rounded-xl border border-border/80 bg-surface/95 p-6 text-sm text-foreground/70 shadow-card">Loading submission...</div>
      ) : null}

      {!isLoading && submission ? (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_360px]">
          <section className="rounded-xl border border-border/80 bg-surface/95 p-5 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">Incoming message</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">{submission.subject}</h2>
                <p className="mt-2 text-sm text-foreground/75">
                  From {submission.name} · <span className="font-medium text-foreground/90">{submission.email}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ReviewStatusBadge value={submission.reviewStatus} />
                <DeliveryStatusBadge value={submission.deliveryStatus} />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border/70 bg-background/20 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-foreground/86">{submission.message}</p>
            </div>
          </section>

          <aside className="space-y-3">
            <section className="rounded-xl border border-border/80 bg-surface/95 p-5 shadow-card">
              <p className="text-sm font-semibold text-foreground">Review status</p>
              <form className="mt-4 space-y-3" onSubmit={handleStatusSubmit}>
                <div>
                  <label htmlFor="reviewStatus" className="mb-2 block text-sm font-medium text-foreground/88">
                    Update review state
                  </label>
                  <Select
                    id="reviewStatus"
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value as ReviewStatus)}
                    disabled={isUpdating}
                  >
                    {reviewStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.replace("_", " ")}
                      </option>
                    ))}
                  </Select>
                </div>

                <div aria-live="polite" className="min-h-5 text-sm">
                  {statusMessage ? <p className="font-medium text-success">{statusMessage}</p> : null}
                </div>

                <Button type="submit" className="w-full" disabled={isUpdating || selectedStatus === submission.reviewStatus}>
                  {isUpdating ? "Saving..." : "Save review status"}
                </Button>
              </form>
            </section>

            <section className="rounded-xl border border-border/80 bg-surface/95 p-5 shadow-card">
              <p className="text-sm font-semibold text-foreground">Delivery metadata</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-foreground/60">Attempts</dt>
                  <dd className="mt-1 font-medium text-foreground">{submission.deliveryAttempts}</dd>
                </div>
                <div>
                  <dt className="text-foreground/60">Created</dt>
                  <dd className="mt-1 text-foreground">{formatDateTime(submission.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-foreground/60">Updated</dt>
                  <dd className="mt-1 text-foreground">{formatDateTime(submission.updatedAt)}</dd>
                </div>
                <div>
                  <dt className="text-foreground/60">Last delivery attempt</dt>
                  <dd className="mt-1 text-foreground">{formatDateTime(submission.lastDeliveryAttemptAt)}</dd>
                </div>
                <div>
                  <dt className="text-foreground/60">Delivered at</dt>
                  <dd className="mt-1 text-foreground">{formatDateTime(submission.deliveredAt)}</dd>
                </div>
                <div>
                  <dt className="text-foreground/60">Last delivery error</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-foreground">{submission.lastDeliveryError || "—"}</dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>
      ) : null}
    </AdminPageShell>
  );
}
