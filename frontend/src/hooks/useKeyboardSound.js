const keyboardSounds = [
  new Audio("/Sound/keystroke1.mp3"),
  new Audio("/Sound/keystroke2.mp3"),
  new Audio("/Sound/keystroke3.mp3"),
  new Audio("/Sound/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandomKeyboardSound = () => {
    const randomSound =
      keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)];

    randomSound.currentTime = 0;

    randomSound
      .play()
      .catch((error) => console.log("Audio play failed: ", error));
  };

  return { playRandomKeyboardSound };
}

export default useKeyboardSound;
