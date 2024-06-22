"use client"

import {ClockIcon, PuzzleIcon, UserIcon} from "lucide-react";
import {differenceInMinutes} from "date-fns";
import {useEffect, useState} from "react";

const RoomStats = ({playerCount, maxPlayers, nbPieces, creationDate}: {
  playerCount: number,
  maxPlayers: number,
  nbPieces: number,
  creationDate: Date
}) => {
  const initialElapsedTime = differenceInMinutes(new Date(), creationDate);
  const [elapsedTime, setElapsedTime] = useState<number>(initialElapsedTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  });

  const statClassName = "flex items-center space-x-0.5";
  const iconClassName = "w-4 h-4";

  return (
    <div className="flex justify-center space-x-2 text-muted-foreground">
      <div className={statClassName}>
        <UserIcon className={iconClassName}/>
        <span>{playerCount}/{maxPlayers}</span>
      </div>
      <div className={statClassName}>
        <PuzzleIcon className={iconClassName}/>
        <span>{nbPieces}</span>
      </div>
      <div className={statClassName}>
        <ClockIcon className={iconClassName}/>
        <span>{elapsedTime}</span>
      </div>
    </div>
  )
}
export default RoomStats;