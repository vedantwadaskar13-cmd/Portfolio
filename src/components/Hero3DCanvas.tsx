import React, { useRef, useEffect } from 'react';

export const Hero3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 450);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    let angleX = 0;
    let angleY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetMouseX = (x / width) * 1.5;
      targetMouseY = (y / height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Icosahedron & Ring Vertices for Mechanical Neural Visualizer
    const radius = Math.min(width, height) * 0.28;
    const vertices: { x: number; y: number; z: number }[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;

    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    rawVertices.forEach(([x, y, z]) => {
      const length = Math.sqrt(x*x + y*y + z*z);
      vertices.push({
        x: (x / length) * radius,
        y: (y / length) * radius,
        z: (z / length) * radius
      });
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spring rotation
      angleX += (targetMouseY - angleX) * 0.05;
      angleY += (targetMouseX - angleY) * 0.05;

      const autoRotate = Date.now() * 0.0008;
      const rotX = angleX + autoRotate * 0.5;
      const rotY = angleY + autoRotate;

      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D vertices to 2D HUD display
      const projected = vertices.map(v => {
        // Rotate around Y
        let x1 = v.x * Math.cos(rotY) + v.z * Math.sin(rotY);
        let z1 = -v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
        let y1 = v.y;

        // Rotate around X
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
        let x2 = x1;

        const fov = 400;
        const scale = fov / (fov + z2);
        return {
          x: centerX + x2 * scale,
          y: centerY + y2 * scale,
          z: z2,
          scale
        };
      });

      // Draw Glowing Outer Orbital Rings
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Outer Cyan Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.5, radius * 0.5, rotY * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.stroke();

      // Inner Emerald Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.2, radius * 0.8, -rotY * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 157, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      ctx.restore();

      // Draw Wireframe Edges
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < radius * 1.9) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = Math.max(0.1, 0.65 - dist / (radius * 2));
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Nodes
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? '#00ff9d' : '#00f3ff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.z > 0 ? '#00ff9d' : '#00f3ff';
        ctx.fill();
      });

      // Central Energy Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00f3ff';
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[450px] flex items-center justify-center">
      {/* HUD Radar Corner Decorations */}
      <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl pointer-events-none glass-hud hud-corner-box overflow-hidden">
        <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>NEURAL_3D_CORE // ACTIVE</span>
        </div>
        <div className="absolute bottom-3 right-4 font-mono text-[10px] text-slate-400 tracking-widest">
          ROT_SYS: AUTO_ORBIT // FREQ: 60FPS
        </div>
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
