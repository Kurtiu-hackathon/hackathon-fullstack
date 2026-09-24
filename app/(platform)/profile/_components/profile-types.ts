export type PhotoId =
  | "aria-profile-girl"
  | "ben-profile-boy"
  | "kai-profile-girl"
  | "leo-profile-boy"
  | "mia-profile-girl"
  | "nibi-profile-neutral"
  | "pipin-profile-boy"
  | "sam--profile-boy"
  | "zoe-profile-girl"

export const PHOTO_IDS: PhotoId[] = [
  "aria-profile-girl",
  "ben-profile-boy",
  "kai-profile-girl",
  "leo-profile-boy",
  "mia-profile-girl",
  "nibi-profile-neutral",
  "pipin-profile-boy",
  "sam--profile-boy",
  "zoe-profile-girl",
]

export const PHOTO_LABELS: Record<PhotoId, string> = {
  "aria-profile-girl": "Aria",
  "ben-profile-boy": "Ben",
  "kai-profile-girl": "Kai",
  "leo-profile-boy": "Leo",
  "mia-profile-girl": "Mia",
  "nibi-profile-neutral": "Nibi",
  "pipin-profile-boy": "Pipin",
  "sam--profile-boy": "Sam",
  "zoe-profile-girl": "Zoe",
}

export type IdentityProvider = "google" | "discord" | "email"

export type IdentityItem = {
  identityId: string
  provider: IdentityProvider
  createdAt: string
}
