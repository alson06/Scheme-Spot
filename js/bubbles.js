// Ambient Background Controller (No flying bubbles)
class BubbleCanvasEngine {
  constructor(canvasId) {
    // Disabled moving bubbles for a clean, professional civic layout
    const canvas = document.getElementById(canvasId);
    if (canvas) canvas.style.display = 'none';
  }
}