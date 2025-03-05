"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { HardDrive } from "lucide-react"

interface AddTorrentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (magnetUrl: string, downloadPath: string) => void
}

export function AddTorrentDialog({ open, onOpenChange, onAdd }: AddTorrentDialogProps) {
  const [magnetUrl, setMagnetUrl] = useState("")
  const [torrentFile, setTorrentFile] = useState<File | null>(null)
  const [downloadPath, setDownloadPath] = useState("/downloads")
  const [activeTab, setActiveTab] = useState("magnet")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === "magnet" && magnetUrl) {
      onAdd(magnetUrl, downloadPath)
    } else if (activeTab === "file" && torrentFile) {
      // In a real app, you would upload the file to the server
      onAdd(`file://${torrentFile.name}`, downloadPath)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTorrentFile(e.target.files[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Torrent</DialogTitle>
          <DialogDescription>Add a new torrent using a magnet link or torrent file.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="magnet">Magnet URL</TabsTrigger>
              <TabsTrigger value="file">Torrent File</TabsTrigger>
            </TabsList>
            <TabsContent value="magnet" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="magnet-url">Magnet URL</Label>
                <Textarea
                  id="magnet-url"
                  placeholder="magnet:?xt=urn:btih:..."
                  value={magnetUrl}
                  onChange={(e) => setMagnetUrl(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>
            <TabsContent value="file" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="torrent-file">Torrent File</Label>
                <div className="flex items-center gap-2">
                  <Input id="torrent-file" type="file" accept=".torrent" onChange={handleFileChange} />
                </div>
                {torrentFile && <p className="text-sm text-muted-foreground">Selected file: {torrentFile.name}</p>}
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2 mt-4">
            <Label htmlFor="download-path">Download Path</Label>
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <Input id="download-path" value={downloadPath} onChange={(e) => setDownloadPath(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Torrent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

