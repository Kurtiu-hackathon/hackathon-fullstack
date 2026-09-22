import { unauthorized } from "next/navigation";

export default function UnauthorizedPage() {
    return unauthorized();
}