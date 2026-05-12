"use client";

import { useState } from "react";
import Image from "next/image";
import { Save, Plus, Trash2 } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MOCK_ABOUT } from "@/lib/constants";

import type { AboutContent } from "@/types";

export default function AdminAboutPage() {
  const { toast } = useToast();
  const [content, setContent] = useState<AboutContent>(MOCK_ABOUT);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Conteúdo salvo (mock)",
        description: "A seção Sobre Nós foi atualizada localmente.",
      });
    }, 500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Sobre Nós</h1>
            <p className="mt-1 text-muted-foreground">
              Edite o conteúdo da seção institucional (dados mockados)
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM */}
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
              <CardDescription>Textos da seção</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={content.image}
                  onChange={(e) => setContent({ ...content, image: e.target.value })}
                  placeholder="/placeholder.svg"
                />
              </div>

              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input
                  value={content.subtitle || ""}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  rows={6}
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                />
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <Label>Destaques</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() =>
                    setContent({
                      ...content,
                      highlights: [...(content.highlights || []), ""],
                    })
                  }
                >
                  <Plus className="h-3 w-3 mr-1" /> Adicionar destaque
                </Button>

                <div className="space-y-2 mt-2">
                  {content.highlights?.map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={h}
                        onChange={(e) => {
                          const arr = [...(content.highlights || [])];
                          arr[i] = e.target.value;
                          setContent({ ...content, highlights: arr });
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setContent({
                            ...content,
                            highlights: content.highlights?.filter((_, idx) => idx !== i),
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PREVIEW */}
          <Card>
            <CardHeader>
              <CardTitle>Prévia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="relative aspect-video overflow-hidden rounded bg-muted">
                  <Image 
                    src={content.image || "/placeholder.svg"} 
                    alt="" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <p className="text-primary text-sm">{content.subtitle}</p>
                <h3 className="font-bold text-lg">{content.title}</h3>
                {content.description.split("\n\n").map((p, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{p}</p>
                ))}
                {content.highlights && content.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {content.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
