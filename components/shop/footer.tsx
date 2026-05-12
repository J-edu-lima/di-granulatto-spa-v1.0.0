import Link from "next/link"
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

const footerNavigation = {
  shop: [
    { name: "Bolos", href: "/produtos?categoria=bolos" },
    { name: "Tortas", href: "/produtos?categoria=tortas" },
    { name: "Brigadeiros", href: "/produtos?categoria=brigadeiros" },
    { name: "Doces Finos", href: "/produtos?categoria=doces-finos" },
  ],
  company: [
    { name: "Sobre Nós", href: "/#sobre" },
    { name: "FAQ", href: "/faq" },
    { name: "Contato", href: "/contato" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-script text-3xl font-regular text-primary">Di&apos;Granulatto</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Confeitaria artesanal com ingredientes selecionados e muito amor em cada preparo.
            </p>
            <div className="flex gap-4">
              {CONTACT_INFO.socialMedia.instagram && (
                <a
                  href={CONTACT_INFO.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {CONTACT_INFO.socialMedia.facebook && (
                <a
                  href={CONTACT_INFO.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Produtos</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Institucional
            </h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Contato</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {CONTACT_INFO.address}
                  <br />
                  {CONTACT_INFO.city}, {CONTACT_INFO.state}
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  {CONTACT_INFO.businessHours.map((schedule) => (
                    <div key={schedule.day}>
                      {schedule.day}: {schedule.closed ? "Fechado" : `${schedule.open} - ${schedule.close}`}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Di&apos;Granulatto. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
