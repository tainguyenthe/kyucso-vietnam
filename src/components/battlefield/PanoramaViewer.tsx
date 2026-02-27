import { useEffect, useRef } from 'react'
import type { BattlefieldMarker } from '@/types/database'

interface PanoramaViewerProps {
  panoramaUrl: string
  markers?: BattlefieldMarker[]
}

export function PanoramaViewer({ panoramaUrl, markers = [] }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<unknown>(null)

  useEffect(() => {
    let viewer: unknown = null

    const initViewer = async () => {
      try {
        const { Viewer } = await import('@photo-sphere-viewer/core')
        const { MarkersPlugin } = await import('@photo-sphere-viewer/markers-plugin')
        const { CompassPlugin } = await import('@photo-sphere-viewer/compass-plugin')

        if (!containerRef.current) return

        viewer = new Viewer({
          container: containerRef.current,
          panorama: panoramaUrl,
          plugins: [
            [MarkersPlugin, {
              markers: markers.map((m) => ({
                id: m.id,
                position: { yaw: `${m.longitude}deg`, pitch: `${m.latitude}deg` },
                html: `<div class="marker-tooltip">${m.tooltip}</div>`,
                anchor: 'bottom center',
                tooltip: m.description ?? m.tooltip,
              })),
            }],
            [CompassPlugin, { size: '120px' }],
          ],
          navbar: ['zoom', 'move', 'fullscreen'],
          defaultYaw: 0,
          defaultPitch: 0,
        })

        viewerRef.current = viewer
      } catch {
        // photo-sphere-viewer not installed or failed to load
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="height:100%;display:flex;align-items:center;justify-content:center;color:white;flex-direction:column;gap:16px">
              <img src="${panoramaUrl}" alt="Panorama" style="max-width:90%;max-height:80%;object-fit:contain;border-radius:12px" />
              <p style="opacity:0.6;font-size:14px">360° viewer đang được cài đặt. Hiển thị ảnh tĩnh.</p>
            </div>
          `
        }
      }
    }

    initViewer()

    return () => {
      if (viewer && typeof (viewer as { destroy: () => void }).destroy === 'function') {
        (viewer as { destroy: () => void }).destroy()
      }
    }
  }, [panoramaUrl, markers])

  return <div ref={containerRef} className="w-full h-full" />
}
