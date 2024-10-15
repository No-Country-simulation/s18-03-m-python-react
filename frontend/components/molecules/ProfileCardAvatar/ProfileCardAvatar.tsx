import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms";
import React from "react";

interface Props {
  name: string;
  lastName: string;
  imgSrc: string;
}

export default function ProfileCardAvatar({ name, lastName, imgSrc }: Props) {
  return (
    <div className="relative flex flex-col p-4 w-60 h-60 items-center justify-center bg-base-secondary rounded-full drop-shadow-lg z-10 translate-y-5">
      <Avatar className="w-3/4 h-3/4 rounded-full">
        <AvatarImage src={imgSrc} alt="user-image" />
        <AvatarFallback className="text-white font-semibold">
          {name.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h2 className="absolute bottom-3 text-xl font-bold text-white">
        {name} {lastName}
      </h2>
    </div>
  );
}
