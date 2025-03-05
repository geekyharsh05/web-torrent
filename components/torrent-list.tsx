import { formatBytes, formatSpeed, formatDate } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface TorrentFile {
  name: string
  size: number
  progress: number
}

interface Torrent {
  id: string
  name: string
  size: number
  progress: number
  status: "downloading" | "seeding" | "paused" | "checking" | "error"
  downloadSpeed: number
  uploadSpeed: number
  peers: number
  seeds: number
  eta: string
  dateAdded: Date
  files: TorrentFile[]
}

interface TorrentListProps {
  torrents: Torrent[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function TorrentList({ torrents, selectedId, onSelect }: TorrentListProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-2 p-3 text-xs font-medium text-muted-foreground border-b">
        <div className="col-span-5">Name</div>
        <div className="col-span-1 text-right">Size</div>
        <div className="col-span-2">Progress</div>
        <div className="col-span-1 text-right">Down</div>
        <div className="col-span-1 text-right">Up</div>
        <div className="col-span-1 text-right">ETA</div>
        <div className="col-span-1 text-right">Added</div>
      </div>
      {torrents.map((torrent) => (
        <div
          key={torrent.id}
          className={`grid grid-cols-12 gap-2 p-3 text-sm border-b hover:bg-muted/50 cursor-pointer ${
            selectedId === torrent.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelect(torrent.id)}
        >
          <div className="col-span-5 flex items-center gap-2 truncate">
            <StatusBadge status={torrent.status} />
            <span className="truncate">{torrent.name}</span>
          </div>
          <div className="col-span-1 text-right text-muted-foreground">{formatBytes(torrent.size)}</div>
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Progress value={torrent.progress * 100} className="h-2" />
              <span className="text-xs text-muted-foreground w-9">{Math.round(torrent.progress * 100)}%</span>
            </div>
          </div>
          <div className="col-span-1 text-right text-green-500">{formatSpeed(torrent.downloadSpeed)}</div>
          <div className="col-span-1 text-right text-blue-500">{formatSpeed(torrent.uploadSpeed)}</div>
          <div className="col-span-1 text-right text-muted-foreground">
            {torrent.status === "seeding" ? "—" : torrent.eta}
          </div>
          <div className="col-span-1 text-right text-muted-foreground">{formatDate(torrent.dateAdded)}</div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: Torrent["status"] }) {
  const variants = {
    downloading: "bg-green-500",
    seeding: "bg-blue-500",
    paused: "bg-yellow-500",
    checking: "bg-purple-500",
    error: "bg-red-500",
  }

  return (
    <div
      className={`w-3 h-3 rounded-full ${variants[status]}`}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  )
}

