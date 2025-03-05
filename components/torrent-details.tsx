import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatBytes, formatSpeed } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Pause, Play, X, RotateCcw, ArrowDown, ArrowUp } from "lucide-react"

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

interface TorrentDetailsProps {
  torrent: Torrent
}

export function TorrentDetails({ torrent }: TorrentDetailsProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold truncate" title={torrent.name}>
          {torrent.name}
        </h2>
        <div className="flex gap-1">
          {torrent.status === "downloading" ? (
            <Button size="icon" variant="ghost" title="Pause">
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="icon" variant="ghost" title="Resume">
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button size="icon" variant="ghost" title="Force Recheck">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" title="Remove">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="peers">Peers</TabsTrigger>
          <TabsTrigger value="trackers">Trackers</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Transfer</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="capitalize">{torrent.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Download Speed:</span>
                  <span className="text-green-500">{formatSpeed(torrent.downloadSpeed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Upload Speed:</span>
                  <span className="text-blue-500">{formatSpeed(torrent.uploadSpeed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETA:</span>
                  <span>{torrent.status === "seeding" ? "—" : torrent.eta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connections:</span>
                  <span>
                    {torrent.peers} peers, {torrent.seeds} seeds
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">General</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{formatBytes(torrent.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Downloaded:</span>
                  <span>{formatBytes(torrent.size * torrent.progress)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress:</span>
                  <span>{Math.round(torrent.progress * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Added:</span>
                  <span>{torrent.dateAdded.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Progress</h3>
            <Progress value={torrent.progress * 100} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{formatBytes(torrent.size * torrent.progress)}</span>
              <span>{formatBytes(torrent.size)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Transfer Rate</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-green-500" />
                <span>{formatSpeed(torrent.downloadSpeed)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-blue-500" />
                <span>{formatSpeed(torrent.uploadSpeed)}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="files" className="mt-4">
          <div className="space-y-2">
            {torrent.files.map((file, index) => (
              <div key={index} className="border rounded-md p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={file.progress * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-9">{Math.round(file.progress * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="peers" className="mt-4">
          <div className="text-center py-8 text-muted-foreground">
            {torrent.peers > 0 ? <p>Connected to {torrent.peers} peers</p> : <p>No peers connected</p>}
          </div>
        </TabsContent>
        <TabsContent value="trackers" className="mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <p>Tracker information would be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

