import { CheckCircle2, XCircle, FileText, Calendar, User, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./StatusBadge";
import type { KMRLDocument } from "@/lib/mock-data";
import { useState } from "react";

interface Props {
  document: KMRLDocument | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentDetailDialog({ document: doc, open, onOpenChange }: Props) {
  const [comment, setComment] = useState("");

  if (!doc) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="font-display text-lg">{doc.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{doc.id}</p>
            </div>
            <StatusBadge status={doc.status} />
          </div>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" /> <span>Uploaded by <span className="text-foreground font-medium">{doc.uploadedBy}</span></span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> <span>{doc.uploadedAt}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" /> <span>{doc.fileSize} · {doc.category}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-4 w-4" />
              <div className="flex gap-1 flex-wrap">
                {doc.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm">{doc.description}</p>

          <Separator />

          {/* Comments Timeline */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Approval History</h4>
            {doc.comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No review comments yet.</p>
            ) : (
              <div className="space-y-3">
                {doc.comments.map((c) => (
                  <div key={c.id} className="flex gap-3 text-sm">
                    <div className="mt-0.5">
                      {c.action === "approved" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : c.action === "rejected" ? (
                        <XCircle className="h-4 w-4 text-destructive" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">{c.author}</span>{" "}
                        <span className="text-muted-foreground">· {c.createdAt}</span>
                      </p>
                      <p className="text-muted-foreground mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approval Actions */}
          {doc.status === "pending" && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Review Document</h4>
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-3">
                  <Button className="gap-2 bg-success hover:bg-success/90">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </Button>
                  <Button variant="destructive" className="gap-2">
                    <XCircle className="h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
