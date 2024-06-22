import {Player} from '@repo/db';
import {cn} from "@ui/lib/utils";
import {PencilIcon} from "lucide-react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@ui/components/ui/dialog";
import {useState} from "react";
import {Input} from "@ui/components/ui/input";
import {Button} from "@ui/components/ui/button";
import {Socket} from "socket.io-client";

const Leaderboard = ({players, socket}: { players: Player[] | undefined, socket: Socket }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>(players?.find(player => player.socketId === socket.id)?.name || "");

  const handleNameChange = () => {
    if (socket) {
      socket.emit("player-name-change", playerName);
    }
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <table className="table-fixed w-full text-left">
        <thead>
        <tr>
          <th className="w-3/4">Player</th>
          <th className="w-1/4 text-right">Score</th>
        </tr>
        </thead>
        <tbody>
        {players?.map((player) => (
          <tr key={player.id}>
            <td
              className={cn(player.socketId === socket.id && "italic", "w-3/4 flex items-center")}>{player.name} {player.socketId === socket.id &&
                <Button variant="link" size="icon" onClick={() => setDialogOpen(true)}><PencilIcon className="w-4 h-4"/></Button>}</td>
            <td className="w-1/4 text-right">{player.score}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your name</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Input type="text" className="border-2 border-gray-300 p-2" defaultValue={playerName}
                 onChange={(e) => setPlayerName(e.target.value)}/>
        </div>
        <DialogFooter>
          <Button className="mt-4" onClick={handleNameChange}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Leaderboard;