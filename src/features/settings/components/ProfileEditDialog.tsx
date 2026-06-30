import { useState, useEffect, useRef } from "react"
import { Loader2, Camera, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/shared/stores/toastStore"
import type { Profile } from "@/features/settings/types"

interface ProfileEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial: Profile
  onSave: (data: Partial<Profile>) => Promise<void>
}

export function ProfileEditDialog({ open, onOpenChange, initial, onSave }: ProfileEditDialogProps) {
  const show = useToast((s) => s.show)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setName(initial.name)
      setEmail(initial.email)
      setTags([...initial.tags])
      setAvatarUrl(initial.avatarUrl)
      setTagInput("")
    }
  }, [open, initial])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 500 * 1024) {
      show("La imagen no debe superar 500KB", "error")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setAvatarUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) {
      setTags([...tags, t])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) return
    setSaving(true)
    try {
      await onSave({ name: name.trim(), email: email.trim(), tags, avatarUrl })
      show("Perfil actualizado", "success")
    } finally {
      setSaving(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-0 p-0">
        <DialogHeader className="border-b border-border/30 p-4">
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="size-16 border-2 border-border">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
                <AvatarFallback className="bg-muted text-lg font-bold text-primary">
                  {name.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
                aria-label="Cambiar avatar"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Foto de perfil</p>
              <p>JPG o PNG. Max 500KB.</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Nombre completo</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Apellidos, Nombre" />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Correo electronico</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@minedu.gob.pe" />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Etiquetas</label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
                placeholder="Escribir y presionar Enter"
              />
              <Button type="button" variant="outline" size="sm" onClick={addTag} disabled={!tagInput.trim()}>
                Agregar
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20" aria-label={`Quitar ${tag}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border/30 px-4 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!name.trim() || !email.trim() || saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
