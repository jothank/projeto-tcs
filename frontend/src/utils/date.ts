export function formatDate(data: any) {
  const partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}
