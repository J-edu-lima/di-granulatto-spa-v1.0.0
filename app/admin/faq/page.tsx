"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search, GripVertical } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MOCK_FAQ } from "@/lib/constants"
import type { FAQItem } from "@/types"

interface FAQFormData {
  question: string
  answer: string
  category: string
  order: number
}

export default function AdminFAQPage() {
  const { toast } = useToast()
  const [faqItems, setFaqItems] = useState<FAQItem[]>(MOCK_FAQ)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [formData, setFormData] = useState<FAQFormData>({
    question: "",
    answer: "",
    category: "",
    order: 1,
  })

  const filteredItems = faqItems
    .filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => a.order - b.order)

  const openCreateDialog = () => {
    setEditingItem(null)
    setFormData({
      question: "",
      answer: "",
      category: "",
      order: faqItems.length + 1,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: FAQItem) => {
    setEditingItem(item)
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category || "",
      order: item.order,
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.question || !formData.answer) {
      toast({
        title: "Erro",
        description: "Preencha a pergunta e a resposta.",
        variant: "destructive",
      })
      return
    }

    if (editingItem) {
      setFaqItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData }
            : item
        )
      )
      toast({ title: "Pergunta atualizada (mock)" })
    } else {
      const newItem: FAQItem = {
        id: `new-${Date.now()}`,
        ...formData,
      }
      setFaqItems((prev) => [...prev, newItem])
      toast({ title: "Pergunta criada (mock)" })
    }

    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setFaqItems((prev) => prev.filter((item) => item.id !== id))
    setDeleteConfirm(null)
    toast({ title: "Pergunta excluída (mock)" })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Perguntas Frequentes</h1>
            <p className="mt-1 text-muted-foreground">Gerencie as perguntas e respostas do FAQ (dados mockados)</p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            Nova Pergunta
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar perguntas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border-border">
              <CardContent className="flex items-start gap-4 p-4">
                <GripVertical className="mt-1 h-5 w-5 cursor-grab text-muted-foreground" />

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground">{item.question}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.answer}</p>
                  {item.category && (
                    <div className="mt-2">
                      <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteConfirm(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nenhuma pergunta encontrada.</p>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto bg-background">
            <DialogHeader>
              <DialogTitle className="font-heading">{editingItem ? "Editar Pergunta" : "Nova Pergunta"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Atualize a pergunta e resposta." : "Adicione uma nova pergunta ao FAQ."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question">Pergunta *</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Ex: Qual a antecedência para fazer uma encomenda?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Resposta *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Digite a resposta completa..."
                  rows={5}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: encomendas, entregas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-transparent">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                {editingItem ? "Salvar Alterações" : "Criar Pergunta"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle className="font-heading">Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="bg-transparent">
                Cancelar
              </Button>
              <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
