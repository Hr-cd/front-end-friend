import { useState } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentCategory } from "@/lib/mock-data";

const categories: DocumentCategory[] = ["Policy", "Report", "Contract", "Invoice", "Memo", "Circular", "Technical", "HR"];

export function DocumentUploadDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Upload Document</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag and drop your file here, or <span className="text-primary font-medium">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX up to 25MB</p>
            <Input type="file" className="hidden" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Document Name</Label>
              <Input placeholder="Enter document name" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input placeholder="Add tags separated by commas" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Brief description of the document" rows={3} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
