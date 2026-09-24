"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { type IdentityItem } from "./profile-types"

const MAX_GOOGLE_ACCOUNTS = 2

type ProfileConnectedSectionProps = {
  identities: IdentityItem[]
  onDisconnect: (identityId: string) => Promise<void>
  onLinkGoogle: () => Promise<void>
  onLinkDiscord: () => Promise<void>
  isPending: boolean
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function ProfileConnectedSection({
  identities,
  onDisconnect,
  onLinkGoogle,
  onLinkDiscord,
  isPending,
}: ProfileConnectedSectionProps) {
  const googleIdentities = identities.filter((i) => i.provider === "google")
  const discordIdentities = identities.filter((i) => i.provider === "discord")

  return (
    <section aria-labelledby="connected-section-heading">
      <h2 id="connected-section-heading" className="mb-1 font-heading text-lg font-semibold">
        Contas conectadas
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Entre com Google ou Discord
      </p>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Google</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {googleIdentities.map((identity) => (
              <div
                key={identity.identityId}
                className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{identity.identityId}</p>
                  <p className="text-xs text-muted-foreground">
                    Conectado em {formatDate(identity.createdAt)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => onDisconnect(identity.identityId)}
                >
                  Desconectar
                </Button>
              </div>
            ))}
            {googleIdentities.length < MAX_GOOGLE_ACCOUNTS && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={onLinkGoogle}
                className="self-start"
              >
                Conectar Google
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Discord</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {discordIdentities.map((identity) => (
              <div
                key={identity.identityId}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{identity.identityId}</p>
                  <p className="text-xs text-muted-foreground">
                    Conectado em {formatDate(identity.createdAt)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => onDisconnect(identity.identityId)}
                >
                  Desconectar
                </Button>
              </div>
            ))}
            {discordIdentities.length === 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={onLinkDiscord}
                className="self-start"
              >
                Conectar Discord
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
