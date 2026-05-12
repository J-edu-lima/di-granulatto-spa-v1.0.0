"use client";

import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO } from "@/lib/constants";

import type { ContactInfo } from "@/types";

export default function AdminContactPage() {
  const { toast } = useToast();
  const [contact, setContact] = useState<ContactInfo>(CONTACT_INFO);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Contato salvo (mock)",
        description: "As informações de contato foram atualizadas localmente.",
      });
    }, 500);
  };

  const handleBusinessHourChange = (index: number, field: string, value: string) => {
    const updatedHours = [...contact.businessHours];
    updatedHours[index] = {
      ...updatedHours[index],
      [field]: value,
    };
    setContact({ ...contact, businessHours: updatedHours });
  };

  const toggleBusinessHourClosed = (index: number) => {
    const updatedHours = [...contact.businessHours];
    updatedHours[index].closed = !updatedHours[index].closed;
    setContact({ ...contact, businessHours: updatedHours });
  };

  const addBusinessHour = () => {
    const newHour = {
      day: "Novo Dia",
      open: "09:00",
      close: "18:00",
      closed: false,
    };
    setContact({
      ...contact,
      businessHours: [...contact.businessHours, newHour],
    });
  };

  const removeBusinessHour = (index: number) => {
    const updatedHours = contact.businessHours.filter((_, i) => i !== index);
    setContact({ ...contact, businessHours: updatedHours });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Informações de Contato</h1>
            <p className="mt-1 text-muted-foreground">
              Edite as informações de contato exibidas na página de contato
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Telefone, email e localização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="(11) 3456-7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  placeholder="5511999999999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="contato@digranulatto.com.br"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  placeholder="Rua das Flores, 123"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={contact.city}
                    onChange={(e) => setContact({ ...contact, city: e.target.value })}
                    placeholder="São Paulo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={contact.state}
                    onChange={(e) => setContact({ ...contact, state: e.target.value })}
                    placeholder="SP"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  value={contact.zipCode}
                  onChange={(e) => setContact({ ...contact, zipCode: e.target.value })}
                  placeholder="01234-567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>Links para suas redes sociais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={contact.socialMedia.instagram || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      socialMedia: { ...contact.socialMedia, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/digranulatto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={contact.socialMedia.facebook || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      socialMedia: { ...contact.socialMedia, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/digranulatto"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Hours */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>Configure os dias e horários de atendimento</CardDescription>
            </div>
            <Button onClick={addBusinessHour} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Horário
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {contact.businessHours.map((schedule, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-end sm:gap-3"
              >
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`day-${index}`}>Dia</Label>
                  <Input
                    id={`day-${index}`}
                    value={schedule.day}
                    onChange={(e) => handleBusinessHourChange(index, "day", e.target.value)}
                    placeholder="Segunda a Sexta"
                    disabled={schedule.closed}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <Label htmlFor={`open-${index}`}>Abertura</Label>
                  <Input
                    id={`open-${index}`}
                    type="time"
                    value={schedule.open}
                    onChange={(e) => handleBusinessHourChange(index, "open", e.target.value)}
                    disabled={schedule.closed}
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <Label htmlFor={`close-${index}`}>Fechamento</Label>
                  <Input
                    id={`close-${index}`}
                    type="time"
                    value={schedule.close}
                    onChange={(e) => handleBusinessHourChange(index, "close", e.target.value)}
                    disabled={schedule.closed}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`closed-${index}`}
                    checked={schedule.closed}
                    onChange={() => toggleBusinessHourClosed(index)}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <Label htmlFor={`closed-${index}`} className="cursor-pointer text-sm">
                    Fechado
                  </Label>
                </div>

                <Button
                  onClick={() => removeBusinessHour(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
