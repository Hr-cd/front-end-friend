import { useEffect, useState, useMemo } from "react";
import { Search, Filter, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/documents/StatusBadge";
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog";
import { DocumentDetailDialog } from "@/components/documents/DocumentDetailDialog";
import { fetchDocuments } from "@/lib/api";
import type { KMRLDocument, DocumentStatus, DocumentCategory } from "@/lib/mock-data";

const Documents = () => {
  const [documents, setDocuments] = useState<KMRLDocument[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailDoc, setDetailDoc] = useState<KMRLDocument | null>(null);

  useEffect(() => {
    fetchDocuments().then(setDocuments);
  }, []);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.uploadedBy.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || d.status === statusFilter;
      const matchCategory = categoryFilter === "all" || d.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [documents, search, statusFilter, categoryFilter]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((d) => d.id)));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} documents</p>
        </div>
        <DocumentUploadDialog />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or uploader..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <Filter className="h-3.5 w-3.5 mr-1.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {["Policy", "Report", "Contract", "Invoice", "Memo", "Circular", "Technical", "HR"].map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected.size > 0 && (
          <Button variant="destructive" size="sm" className="gap-1.5">
            <Trash2 className="h-3.5 w-3.5" /> Delete ({selected.size})
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((doc) => (
              <TableRow
                key={doc.id}
                className="cursor-pointer"
                onClick={() => setDetailDoc(doc)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selected.has(doc.id)}
                    onCheckedChange={() => toggleSelect(doc.id)}
                  />
                </TableCell>
                <TableCell className="font-medium max-w-[260px] truncate">{doc.name}</TableCell>
                <TableCell className="text-muted-foreground">{doc.category}</TableCell>
                <TableCell><StatusBadge status={doc.status} /></TableCell>
                <TableCell className="text-muted-foreground">{doc.uploadedBy}</TableCell>
                <TableCell className="text-muted-foreground">{doc.uploadedAt}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No documents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DocumentDetailDialog
        document={detailDoc}
        open={!!detailDoc}
        onOpenChange={(open) => !open && setDetailDoc(null)}
      />
    </div>
  );
};

export default Documents;
