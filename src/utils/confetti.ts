import confetti from 'canvas-confetti';

export function triggerConfetti(x: number, y: number) {
  const count = 200;
  const defaults = {
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: count / 2,
      scalar: 1.2,
      shapes: ['star']
    });

    confetti({
      ...defaults,
      particleCount: count / 2,
      scalar: 0.75,
      shapes: ['circle']
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}