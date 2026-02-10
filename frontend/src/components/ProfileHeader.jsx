import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Volume2Icon, VolumeOff } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/Sound/mouse-click.mp3");
function ProfileHeader() {
  const { authUser, logout, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const fileInputRef = useRef();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    await updateProfile(formData);
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="avatar avatar-online">
            <button
              className="size-10 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={authUser.profilePicture || "/avatar.png"}
                alt=""
                className="size-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <h3 className="text-slate-200 text-base font-medium max-w-20 truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOut className="size-5" />
          </button>

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon /> : <VolumeOff />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
