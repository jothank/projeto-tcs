import { logout } from "services/auth.service";
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

export function getAddReload(message: string) {
  Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: message,
    showConfirmButton: true,
    confirmButtonText: "OK",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
}


export function getErro(message: string) {
  Swal.fire({
    title: "Erro!",
    text: message,
    icon: "error",
  });
}

export function getLoginWarning(message: string) {
  Swal.fire({
    icon: "error",
    title: "Erro",
    text: message,
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
}

export function getSuccessWarning(message: string) {
  Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: message,
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
}

export function getLogout(message: string) {
  Swal.fire({
    icon: "warning",
    title: "Aviso!",
    text: message,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Sair",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
      window.location.href = "/login";
    }
  });
}

export function getRegister(message: string) {
  Swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: message,
    showConfirmButton: true,
    confirmButtonText: "Login",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/";
    }
  });
}

