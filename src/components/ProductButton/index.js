import React from "react";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { StyledButton } from "../StyledButton/StyledButton.styled";

export default function ProductButton({ buttonText }) {
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;
  const { data: session } = useSession();

  async function handleClick() {
    if (buttonText === "Delete") {
      const confirmation = window.confirm(
        "Are you sure you want to delete the item?"
      );
      if (confirmation) {
        await fetch(`/api/products/${id}`, {
          method: "DELETE",
          headers: {
            userId: session.user.id,
          },
        });
        push("/");
      }
    }
  }

  return (
    <StyledButton style={{ width: "70px" }} onClick={handleClick}>
      {buttonText}
    </StyledButton>
  );
}
