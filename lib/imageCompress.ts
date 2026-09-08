/**
 * Compresses an image file in the browser before upload.
 * Resizes to a max dimension and re-encodes as JPEG at the given quality.
 * A typical 4-8MB phone photo becomes ~150-400KB with these defaults.
 */
export async function compressImage(
  file: File,
  options: { maxDimension?: number; quality?: number } = {}
): Promise<File> {
  const { maxDimension = 1600, quality = 0.8 } = options

  // Skip compression for already-small files (e.g. small PNGs, icons)
  if (file.size < 150 * 1024) return file

  const bitmap = await createImageBitmap(file)

  let { width, height } = bitmap
  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height / width) * maxDimension)
      width = maxDimension
    } else {
      width = Math.round((width / height) * maxDimension)
      height = maxDimension
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file // fallback: upload original if canvas unsupported

  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', quality)
  )
  if (!blob) return file

  // Give it a predictable name/type; original extension is dropped since we
  // always re-encode as jpeg (simplest + smallest for photos).
  const newName = file.name.replace(/\.[^/.]+$/, '') + '.jpg'
  return new File([blob], newName, { type: 'image/jpeg' })
}

/** Compress a batch of files in parallel, preserving order. */
export async function compressImages(
  files: File[],
  options?: { maxDimension?: number; quality?: number }
): Promise<File[]> {
  return Promise.all(files.map((f) => compressImage(f, options)))
}

/** Turns "Marina Rose" into "marina-rose" for slugs and storage filenames. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}