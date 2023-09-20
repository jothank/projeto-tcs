import Swal from "sweetalert2";

export function getSuccess(message: string) {
  Swal.fire({
    title: "Sucesso!",
    text: message,
    icon: "success",
    customClass: {
      popup: "custom-sweetalert-popup",
    },
  });
}

export function getErro(message: string) {
  Swal.fire({
    title: "Erro!",
    text: message,
    icon: "error",
  });
}
