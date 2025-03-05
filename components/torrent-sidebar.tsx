import { Home, Download, Upload, Settings, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TorrentSidebar() {
  return (
    <div className="w-16 md:w-64 h-screen bg-muted/40 border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold hidden md:block">TorrentWeb</h2>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Download className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Downloading</span>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Upload className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Seeding</span>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Completed</span>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Favorites</span>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-2 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Settings</span>
        </Button>
        <div className="mt-4 hidden md:block">
          <div className="text-xs text-muted-foreground">Storage</div>
          <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4"></div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground flex justify-between">
            <span>750 GB used</span>
            <span>1 TB total</span>
          </div>
        </div>
      </div>
    </div>
  )
}

