"use client"

import { useState } from "react"
import { TorrentList } from "@/components/torrent-list"
import { TorrentSidebar } from "@/components/torrent-sidebar"
import { TorrentDetails } from "@/components/torrent-details"
import { AddTorrentDialog } from "@/components/add-torrent-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Sample data for demonstration
const sampleTorrents = [
  {
    id: "1",
    name: "Ubuntu 22.04 LTS",
    size: 3_800_000_000,
    progress: 0.85,
    status: "downloading",
    downloadSpeed: 2_500_000,
    uploadSpeed: 150_000,
    peers: 42,
    seeds: 120,
    eta: "00:45:30",
    dateAdded: new Date("2023-10-15T14:30:00"),
    files: [{ name: "ubuntu-22.04-desktop-amd64.iso", size: 3_800_000_000, progress: 0.85 }],
  },
  {
    id: "2",
    name: "Debian 12",
    size: 2_700_000_000,
    progress: 1,
    status: "seeding",
    downloadSpeed: 0,
    uploadSpeed: 350_000,
    peers: 15,
    seeds: 0,
    eta: "00:00:00",
    dateAdded: new Date("2023-10-10T09:15:00"),
    files: [{ name: "debian-12.0.0-amd64-netinst.iso", size: 2_700_000_000, progress: 1 }],
  },
  {
    id: "3",
    name: "Arch Linux 2023.10.01",
    size: 900_000_000,
    progress: 0.32,
    status: "downloading",
    downloadSpeed: 1_200_000,
    uploadSpeed: 50_000,
    peers: 28,
    seeds: 65,
    eta: "01:20:15",
    dateAdded: new Date("2023-10-16T18:45:00"),
    files: [{ name: "archlinux-2023.10.01-x86_64.iso", size: 900_000_000, progress: 0.32 }],
  },
  {
    id: "4",
    name: "Fedora Workstation 38",
    size: 2_100_000_000,
    progress: 0.05,
    status: "downloading",
    downloadSpeed: 800_000,
    uploadSpeed: 0,
    peers: 18,
    seeds: 42,
    eta: "03:10:45",
    dateAdded: new Date("2023-10-17T10:20:00"),
    files: [{ name: "Fedora-Workstation-Live-x86_64-38.iso", size: 2_100_000_000, progress: 0.05 }],
  },
  {
    id: "5",
    name: "Linux Mint 21.2",
    size: 2_500_000_000,
    progress: 0.98,
    status: "downloading",
    downloadSpeed: 1_800_000,
    uploadSpeed: 120_000,
    peers: 35,
    seeds: 90,
    eta: "00:05:10",
    dateAdded: new Date("2023-10-14T21:30:00"),
    files: [{ name: "linuxmint-21.2-cinnamon-64bit.iso", size: 2_500_000_000, progress: 0.98 }],
  },
]

export function TorrentDashboard() {
  const [selectedTorrentId, setSelectedTorrentId] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [torrents, setTorrents] = useState(sampleTorrents)

  const selectedTorrent = torrents.find((t) => t.id === selectedTorrentId)

  const handleAddTorrent = (magnetUrl: string, downloadPath: string) => {
    // In a real app, this would connect to a backend service
    console.log("Adding torrent:", magnetUrl, "to path:", downloadPath)
    setIsAddDialogOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <TorrentSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Torrents</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Torrent
          </Button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-full lg:w-2/3 overflow-auto">
            <TorrentList torrents={torrents} selectedId={selectedTorrentId} onSelect={setSelectedTorrentId} />
          </div>
          <div className="hidden lg:block lg:w-1/3 border-l overflow-auto">
            {selectedTorrent ? (
              <TorrentDetails torrent={selectedTorrent} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a torrent to view details
              </div>
            )}
          </div>
        </div>
      </div>
      <AddTorrentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddTorrent} />
    </div>
  )
}

